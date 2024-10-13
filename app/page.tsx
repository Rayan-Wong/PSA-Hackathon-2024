// app/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <div className='p-20 flex-col space-y-6 items-center text-center'>
            <h1 className='text-6xl'>Temporary Page Navigator</h1>
            <p className='text-2xl'>Go to the <Link className='text-blue-700 underline' href="/login">Login Page</Link></p>
            <p className='text-2xl'>Go to the <Link className='text-blue-600 underline' href="/chat">Chat Page</Link></p>
        </div>
    );
}
