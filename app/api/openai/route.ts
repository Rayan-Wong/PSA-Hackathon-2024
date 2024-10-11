import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { messages, thread_id, assistant_id } = await req.json();
        console.log('Received Messages: ', messages);

        const assistant = await getOrCreateAssistant(assistant_id);
        const thread = await getOrCreateThread(thread_id);

        await addMessagesToThread(messages, thread.id);

        return streamAssistantResponse(thread.id, assistant.id);
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

async function getOrCreateAssistant(assistant_id: string) {
    if (!assistant_id) {
        const assistant = await openai.beta.assistants.create({
            name: "Super Senior",
            instructions: "You are a helpful senior employee who helps junior employees with their standard operating procedures.  You can only refer to files you are given, and if you cannot find solutions from all the files given you must tell the user to ask their superior for help.",
            tools: [{ type: "file_search" }],
            tool_resources: {"file_search": {"vector_store_ids": ["vs_K0pIbdfdFuPKlRwNjXMJZSUU"]}},
            model: "gpt-3.5-turbo",
        });
        return assistant;
    } else {
        return { id: assistant_id };
    }
}

async function getOrCreateThread(thread_id: string) {
    if (thread_id) {
        return await openai.beta.threads.retrieve(thread_id);
    } else {
        return await openai.beta.threads.create();
    }
}

async function addMessagesToThread(messages: { role: "assistant" | "user"; content: string }[], thread_id: string) {
    for (const message of messages) {
        await openai.beta.threads.messages.create(thread_id, { role: message.role, content: message.content });
    }
}

function streamAssistantResponse(thread_id: string, assistant_id: string) {
    const run = openai.beta.threads.runs.stream(thread_id, { assistant_id });

    return new Response(
        new ReadableStream({
            async start(controller) {
                run.on('textDelta', (textDelta) => {
                    controller.enqueue(new TextEncoder().encode(textDelta.value || ''));
                });
                run.on('end', () => {
                    controller.close();
                });
            },
        }),
        {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        }
    );
}
