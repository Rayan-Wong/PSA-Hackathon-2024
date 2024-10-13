'use client'
import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
//   const regexp = new RegExp('^[1-9]\d{0,2}$');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (email.length == 0) {
        setMessage("Email is required.")
        return;
    // } else if (!regexp.test(email)) {
    //     console.log(regexp.test(email))
    //     setMessage("Invalid email format.")
    //     return
    } else if (password.length == 0) {
        setMessage("Password is required.");
        setLoading(false);
        return;
    } else if (password.length < 6) {
        setMessage("Password must be at least 6 characters");
        setLoading(false);
        return;
    } else if (department.length == 0) {
        setMessage("Please select a department.");
        setLoading(false);
        return
    } else if (level.length == 0) {
        setMessage("Please select a level of seniority.");
        setLoading(false);
        return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, department, level }),
    });

    const data = await response.json();
    setMessage(data.message);
    console.log(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid gap-5 m-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
            <input
              type="email"
              id="email"
              className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <input
                id="department-corporate"
                type="radio"
                value="Corporate"
                name="department"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="department-corporate" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Corporate</label>
            </div>
            <div className="flex items-center">
              <input
                id="department-logistics"
                type="radio"
                value="Logistics"
                name="department"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="department-logistics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Logistics</label>
            </div>
            <div className="flex items-center">
              <input
                id="department-operations"
                type="radio"
                value="Operations"
                name="department"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="department-operations" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Operations</label>
            </div>
            <div className="flex items-center">
              <input
                id="department-shipping"
                type="radio"
                value="Shipping"
                name="department"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="department-shipping" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Shipping</label>
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <input
                id="level-senior"
                type="radio"
                value="Senior"
                name="level"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="level-senior" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Senior</label>
            </div>
            <div className="flex items-center">
              <input
                id="level-junior"
                type="radio"
                value="Junior"
                name="level"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="level-junior" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Junior</label>
            </div>
          </div>

          {message && <p>{message}</p>}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-slate-500 dark:focus:ring-blue-800"
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </div>

    </form>
  );
};

export default RegisterForm;
