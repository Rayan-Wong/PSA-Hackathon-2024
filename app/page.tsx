// app/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to My Next.js App</h1>
            <p>
                Go to the <Link href="/chat">Chat Page</Link>
            </p>
        </div>
    );
}
