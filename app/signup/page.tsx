// app/page.tsx
import React from 'react';
import RegisterForm from './RegisterForm';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default HomePage;
