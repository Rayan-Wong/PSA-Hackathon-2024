'use client'
import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
//   const regexp = new RegExp('^[1-9]\d{0,2}$');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length == 0) {
        setMessage("Email is required.")
        return
    // } else if (!regexp.test(email)) {
    //     console.log(regexp.test(email))
    //     setMessage("Invalid email format.")
    //     return
    } else if (password.length == 0) {
        setMessage("Password is required.")
        return
    } else if (password.length < 6) {
        setMessage("Password must be at least 6 characters")
        return
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setMessage(data.message);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid gap-6 m-5">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
                <input 
                    type="email"
                    id="email"
                    className="text-black bg-gray-50 border border-gray-30 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="john.doe@company.com   " 
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="•••••••••"
                    required />
            </div> 
            {message && <p>{message}</p>}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </form>
  );
};

export default RegisterForm;
