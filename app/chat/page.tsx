'use client';

import { useState, useEffect, useRef } from 'react';
import './globals.css'; // Import the global styles

const Chat = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [aiMessage, setAiMessage] = useState<string>(''); // State to hold the partial AI message
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, aiMessage]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { role: 'user', content: input.trim() };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setLoading(true);
        setAiMessage('');

        const res = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [...messages, newMessage],
            }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullAiMessage = '';

        if (reader) {
            let done = false;
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunk = decoder.decode(value, { stream: !done });
                // Clear "thinking..." text when response starts generating
                if (fullAiMessage === '') {
                    setAiMessage(chunk);
                } else {
                    setAiMessage((prev) => prev + chunk);
                }
                fullAiMessage += chunk;
            }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: fullAiMessage }]);
        setLoading(false);
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <h1 className="chat-header">OpenAI Chat</h1>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.role}`}>
                        <div className={`chat-message-content ${msg.role}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && aiMessage === '' && (
                    <div className="chat-message assistant">
                        <div className="chat-message-content assistant">
                            <span>thinking...</span>
                        </div>
                    </div>
                )}
                {loading && aiMessage !== '' && (
                    <div className="chat-message assistant">
                        <div className="chat-message-content assistant">
                            {aiMessage}
                        </div>
                    </div>
                )}
                <div ref={messageEndRef} />
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    placeholder="Type a message..."
                    className="chat-input"
                    disabled={loading}
                />
                <button onClick={handleSendMessage} disabled={loading} className="chat-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
