// app/page.tsx
'use client'
import React from 'react';
import RegisterForm from './RegisterForm';
import { useRouter } from 'next/navigation';  // Import Next.js router

const HomePage: React.FC = () => {
  const router = useRouter();  
  return (
    <div className='relative space-y-2 h-screen flex flex-col justify-center items-center md:align-center'>
      <button
        onClick={() => router.back()}  // Navigate to the previous page
        className=" md:block absolute top-5 left-5 w-10 h-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>

      </button>

      <h1 className='text-2xl text-center mt-10 font-bold'>Register New Employee</h1>
      <RegisterForm />
    </div>
  );
};

export default HomePage;
