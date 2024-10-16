'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

interface ErrorType {
    email: {
        message: string;
    } | undefined,
    password: {
        message: string;
    } | undefined,
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorType>({email: undefined, password: undefined})
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitted form");
    setLoading(true);
    e.preventDefault();

    if (email.length == 0) {
        setErrors({email: {message: "Email is required."}, password: undefined})
        setLoading(false);
        return
    } else if (password.length == 0) {
        setErrors({password: {message: "Password is required."}, email: undefined})
        setLoading(false);
        return
    } else if (password.length < 6) {
        setErrors({password: {message: "Password must be at least 6 characters."}, email: undefined})
        setLoading(false);
        return
    }
    setErrors({ email: undefined, password: undefined });

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("sent POST");
      const data = await response.json();
      console.log("got data");
      console.log(data);
      if (data.message === 'Logged In' ) {
        setMessage(data.message);
        router.push('/chat');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row md:space-x-7 items-center h-dvh justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className='hidden md:block ml-14 mr-8 space-y-10 pb-10  md:pb-0 sm:max-w-md'>
          {/* Logo and Heading */}
          {/* <a href="#" className="flex space-y-1 md:space-x-3 md:space-y-0 flex-col md:flex-row items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="71" height="55" fill="none" viewBox="0 0 71 55"><path fill="#113441" d="M62.883 50.1c.988 0 1.523.734 1.523 1.642v1.723h-.662v-1.616c0-.594-.293-1.115-.908-1.115-.594 0-.894.5-.894 1.102v1.629h-.661v-1.63c0-.6-.3-1.101-.909-1.101-.614 0-.888.52-.888 1.115v1.616h-.66v-1.716c0-.915.52-1.65 1.502-1.65.654 0 1.128.334 1.295.842.18-.508.641-.841 1.262-.841ZM56.498 52.904c.607 0 .941-.528.941-1.135v-1.576h.661v1.656c0 .948-.574 1.696-1.602 1.696-1.015 0-1.59-.755-1.59-1.703v-1.649h.661v1.583c0 .6.328 1.128.929 1.128ZM53.044 53.538c-.608 0-1.075-.24-1.33-.727l.508-.28c.167.326.434.447.795.447.374 0 .661-.154.661-.441 0-.688-1.876-.167-1.876-1.416 0-.574.507-.995 1.222-.995.607 0 1.021.28 1.228.661l-.507.288c-.14-.288-.407-.388-.708-.388-.307 0-.574.16-.574.42 0 .669 1.876.181 1.876 1.416 0 .621-.6 1.015-1.295 1.015ZM48.505 54.967h-.662v-3.145c0-.975.755-1.71 1.743-1.71a1.71 1.71 0 0 1 1.736 1.71c0 .989-.714 1.723-1.71 1.723-.44 0-.84-.194-1.108-.487v1.91Zm1.081-2.043c.608 0 1.075-.5 1.075-1.095 0-.601-.467-1.088-1.075-1.088-.614 0-1.081.487-1.081 1.088 0 .594.467 1.095 1.081 1.095ZM46.306 50.193h.66v3.272h-.66v-3.272ZM55.223 47.207c-5.051 0-8.904-3.885-8.904-8.613 0-4.694 3.853-8.58 8.904-8.58 5.05 0 8.904 3.886 8.904 8.58 0 4.728-3.853 8.613-8.904 8.613Zm0-5.472c1.845 0 3.076-1.425 3.076-3.108 0-1.716-1.23-3.141-3.076-3.141s-3.076 1.425-3.076 3.14c0 1.684 1.23 3.11 3.076 3.11ZM35.314 54.654c-4.015 0-6.93-1.78-8.419-4.954l4.825-2.59c.518 1.1 1.49 2.234 3.497 2.234 2.104 0 3.497-1.328 3.659-3.659-.778.68-2.008 1.198-3.853 1.198-4.501 0-8.128-3.464-8.128-8.321 0-4.695 3.854-8.515 8.905-8.515 5.18 0 8.904 3.594 8.904 8.547v6.411c0 5.828-4.048 9.649-9.39 9.649Zm.388-13.243c1.749 0 3.076-1.198 3.076-2.979 0-1.748-1.327-2.914-3.076-2.914-1.716 0-3.075 1.166-3.075 2.914 0 1.781 1.36 2.98 3.075 2.98ZM17.009 47.207c-5.051 0-8.904-3.885-8.904-8.613 0-4.694 3.853-8.58 8.904-8.58 5.05 0 8.904 3.886 8.904 8.58 0 4.728-3.853 8.613-8.904 8.613Zm0-5.472c1.845 0 3.076-1.425 3.076-3.108 0-1.716-1.23-3.141-3.076-3.141s-3.076 1.425-3.076 3.14c0 1.684 1.23 3.11 3.076 3.11ZM0 23.085h5.828v23.636H0V23.085ZM70.734 32a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path><path fill="#FFD43E" fill-rule="evenodd" d="M54.79 9.665a33 33 0 0 1 9.616 21.525 11.867 11.867 0 0 0-6.561-3.9 27 27 0 0 0-50.1-7.205H1.086A33 33 0 0 1 54.79 9.665ZM8.828 30.15Zm7.587-3.122a12.704 12.704 0 0 0 0 0Zm9.986 4.415Zm8.685-4.377a12.784 12.784 0 0 0 0 0Zm10.481 4.719Zm8.911-4.75a12.653 12.653 0 0 0 0 0Z" clip-rule="evenodd"></path><path fill="#EE8E1D" fill-rule="evenodd" d="M50.547 13.908a27.001 27.001 0 0 1 7.298 13.382c-.842-.18-1.72-.276-2.622-.276-1.22 0-2.394.174-3.497.499a20.999 20.999 0 0 0-40.81 1.108 11.8 11.8 0 0 0-2.088 1.529V20.085H7.744a27 27 0 0 1 42.803-6.177ZM26.401 31.443c-1.761-2.194-4.323-3.746-7.284-4.252 2.96.506 5.523 2.058 7.284 4.252Z" clip-rule="evenodd"></path><path fill="#971C1C" d="M46.306 30.888a15 15 0 0 0-28.613-3.856c3.56.192 6.67 1.873 8.708 4.411 2.172-2.69 5.563-4.396 9.399-4.396 4.11 0 7.642 1.802 9.767 4.738.231-.311.478-.61.739-.897Z"></path><path fill="#D62727" fill-rule="evenodd" d="M51.725 27.513a11.85 11.85 0 0 0-5.42 3.375 15 15 0 0 0-28.612-3.856 12.716 12.716 0 0 0-.684-.018c-2.237 0-4.317.586-6.093 1.607a21 21 0 0 1 40.81-1.108Z" clip-rule="evenodd"></path></svg>
            <p>Super Senior</p>
          </a> */}
          <Image
              src="/banner.png"
              width={250}
              height={20}
              alt="Picture of the author"
            />
          <h1 className='dark:text-white text-5xl lg:text-7xl'>Need help?</h1>
          <h1 className='dark:text-white text-3xl lg:text-5xl text-wrap'>The best senior you have is one click away.</h1>
        </div>
        <div className='flex-col'>
          <a href="#" className="md:hidden flex space-y-1 md:space-x-3 md:space-y-0 flex-col md:flex-row items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="71" height="55" fill="none" viewBox="0 0 71 55"><path fill="#113441" d="M62.883 50.1c.988 0 1.523.734 1.523 1.642v1.723h-.662v-1.616c0-.594-.293-1.115-.908-1.115-.594 0-.894.5-.894 1.102v1.629h-.661v-1.63c0-.6-.3-1.101-.909-1.101-.614 0-.888.52-.888 1.115v1.616h-.66v-1.716c0-.915.52-1.65 1.502-1.65.654 0 1.128.334 1.295.842.18-.508.641-.841 1.262-.841ZM56.498 52.904c.607 0 .941-.528.941-1.135v-1.576h.661v1.656c0 .948-.574 1.696-1.602 1.696-1.015 0-1.59-.755-1.59-1.703v-1.649h.661v1.583c0 .6.328 1.128.929 1.128ZM53.044 53.538c-.608 0-1.075-.24-1.33-.727l.508-.28c.167.326.434.447.795.447.374 0 .661-.154.661-.441 0-.688-1.876-.167-1.876-1.416 0-.574.507-.995 1.222-.995.607 0 1.021.28 1.228.661l-.507.288c-.14-.288-.407-.388-.708-.388-.307 0-.574.16-.574.42 0 .669 1.876.181 1.876 1.416 0 .621-.6 1.015-1.295 1.015ZM48.505 54.967h-.662v-3.145c0-.975.755-1.71 1.743-1.71a1.71 1.71 0 0 1 1.736 1.71c0 .989-.714 1.723-1.71 1.723-.44 0-.84-.194-1.108-.487v1.91Zm1.081-2.043c.608 0 1.075-.5 1.075-1.095 0-.601-.467-1.088-1.075-1.088-.614 0-1.081.487-1.081 1.088 0 .594.467 1.095 1.081 1.095ZM46.306 50.193h.66v3.272h-.66v-3.272ZM55.223 47.207c-5.051 0-8.904-3.885-8.904-8.613 0-4.694 3.853-8.58 8.904-8.58 5.05 0 8.904 3.886 8.904 8.58 0 4.728-3.853 8.613-8.904 8.613Zm0-5.472c1.845 0 3.076-1.425 3.076-3.108 0-1.716-1.23-3.141-3.076-3.141s-3.076 1.425-3.076 3.14c0 1.684 1.23 3.11 3.076 3.11ZM35.314 54.654c-4.015 0-6.93-1.78-8.419-4.954l4.825-2.59c.518 1.1 1.49 2.234 3.497 2.234 2.104 0 3.497-1.328 3.659-3.659-.778.68-2.008 1.198-3.853 1.198-4.501 0-8.128-3.464-8.128-8.321 0-4.695 3.854-8.515 8.905-8.515 5.18 0 8.904 3.594 8.904 8.547v6.411c0 5.828-4.048 9.649-9.39 9.649Zm.388-13.243c1.749 0 3.076-1.198 3.076-2.979 0-1.748-1.327-2.914-3.076-2.914-1.716 0-3.075 1.166-3.075 2.914 0 1.781 1.36 2.98 3.075 2.98ZM17.009 47.207c-5.051 0-8.904-3.885-8.904-8.613 0-4.694 3.853-8.58 8.904-8.58 5.05 0 8.904 3.886 8.904 8.58 0 4.728-3.853 8.613-8.904 8.613Zm0-5.472c1.845 0 3.076-1.425 3.076-3.108 0-1.716-1.23-3.141-3.076-3.141s-3.076 1.425-3.076 3.14c0 1.684 1.23 3.11 3.076 3.11ZM0 23.085h5.828v23.636H0V23.085ZM70.734 32a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path><path fill="#FFD43E" fill-rule="evenodd" d="M54.79 9.665a33 33 0 0 1 9.616 21.525 11.867 11.867 0 0 0-6.561-3.9 27 27 0 0 0-50.1-7.205H1.086A33 33 0 0 1 54.79 9.665ZM8.828 30.15Zm7.587-3.122a12.704 12.704 0 0 0 0 0Zm9.986 4.415Zm8.685-4.377a12.784 12.784 0 0 0 0 0Zm10.481 4.719Zm8.911-4.75a12.653 12.653 0 0 0 0 0Z" clip-rule="evenodd"></path><path fill="#EE8E1D" fill-rule="evenodd" d="M50.547 13.908a27.001 27.001 0 0 1 7.298 13.382c-.842-.18-1.72-.276-2.622-.276-1.22 0-2.394.174-3.497.499a20.999 20.999 0 0 0-40.81 1.108 11.8 11.8 0 0 0-2.088 1.529V20.085H7.744a27 27 0 0 1 42.803-6.177ZM26.401 31.443c-1.761-2.194-4.323-3.746-7.284-4.252 2.96.506 5.523 2.058 7.284 4.252Z" clip-rule="evenodd"></path><path fill="#971C1C" d="M46.306 30.888a15 15 0 0 0-28.613-3.856c3.56.192 6.67 1.873 8.708 4.411 2.172-2.69 5.563-4.396 9.399-4.396 4.11 0 7.642 1.802 9.767 4.738.231-.311.478-.61.739-.897Z"></path><path fill="#D62727" fill-rule="evenodd" d="M51.725 27.513a11.85 11.85 0 0 0-5.42 3.375 15 15 0 0 0-28.612-3.856 12.716 12.716 0 0 0-.684-.018c-2.237 0-4.317.586-6.093 1.607a21 21 0 0 1 40.81-1.108Z" clip-rule="evenodd"></path></svg>
            <p>Super Senior</p> */}
            <Image
              src="/banner.png"
              width={400}
              height={20}
              alt="Picture of the author"
            />
          </a>
          <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg space-y-6 shadow-md p-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`text-black mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                id="password"
                type="password"
                placeholder="•••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className={`text-black mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-2 px-4 bg-blue-600 disabled:bg-slate-500 text-white rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Log in'}
            </button>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
