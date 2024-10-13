// app/Chat.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import './styles.css'; // Import the global styles

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

    const adjustHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Set to scroll height
    };

    return (
        <div className="text-sm sm:text-base md:text-lg lg:text-xl flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col">
                <div className="w-full flex items-start border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Super Senior</h2>
                </div>
    
                <div className="mt-6 flex-1 overflow-y-auto max-h-[60vh] pb-10"> {/* Adjusted container for messages */}
                    {messages.map((msg, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-start space-x-0 md:space-x-3">
                            {(msg.role === 'user') && (
                                <div className="chat-message flex flex-col items-center md:flex-row md:items-center md:space-x-2 self-end">
                                    <span className="inline-flex justify-center items-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500 text-white font-bold text-sm md:text-base mb-2 md:mb-0">Q</span>
                                    <p className="text-md font-semibold text-gray-800 break-words">{msg.content}</p>
                                </div>
                            )}
                            {(msg.role === 'assistant') && (
                                <div className="chat-message assistant flex flex-col items-center md:flex-row md:items-center md:space-x-2">
                                    <span className="inline-flex justify-center items-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 text-gray-800 font-bold text-sm md:text-base mb-2 md:mb-0">A</span>
                                    <p className="text-md text-gray-700 break-words" style={{whiteSpace: "pre-line"}}>{msg.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
    
                {loading && (
                    <div className="chat-message assistant">
                        <p className="text-gray-600">Thinking...</p>
                    </div>
                )}
    
                <div ref={messageEndRef} />
            </div>
    
            <div className="chat-input-container fixed bottom-0 left-0 w-full flex px-4 space-x-2 bg-white text-black shadow-lg z-10 md:rounded-lg md:bottom-2 md:m-2">
                <textarea
                    type="text"
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                        adjustHeight(e);
                    }}
                    onKeyPress={handleInputKeyPress}
                    style={{ minHeight: "20px", maxHeight: "120px" }}
                    placeholder="Type a message..."
                    className="text-sm flex-1 p-1.5 sm:text-base md:text-lg lg:text-xl md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 transition duration-200 ease-in-out"
                    disabled={loading}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="text-sm p-1.5 sm:text-base md:text-lg lg:text-xl md:p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ease-in-out disabled:bg-gray-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
