// app/page.tsx
'use client'
import React from 'react';
import RegisterForm from './RegisterForm';

const HomePage: React.FC = () => {
  return (
    <div className='space-y-2 h-screen flex flex-col justify-center items-center align-center'>
      <h1 className='text-2xl text-center m-5 font-bold'>Register a new employee</h1>
      <RegisterForm />
    </div>
  );
};

export default HomePage;
