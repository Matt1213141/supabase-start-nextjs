'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  title?: string;
  fields: { 
    label: string; 
    name: string; 
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   }[];
  onSubmit: () => void;
  submitButtonLabel?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, fields, onSubmit, submitButtonLabel = title?.toLowerCase() === 'login' ? 'Login' : 'Register' }) => {

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  function goToRegister() {
    router.push('/register');
  }

  function goToLogin() {
    router.push('/login');
  }

  return (
    <div
      className="w-full bg-gray-100 dark:bg-zinc-800 flex flex-col items-center justify-center min-h-screen" 
    >
      <form onSubmit={handleSubmit} className="w-1/2 p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        {fields.map(field => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block mb-1">{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type || 'text'}
              value={field.value ?? ''}
              onChange={field.onChange}
              className="w-full p-2 border rounded"
              required
            />    
          </div>
        ))}
        <button type="submit" 
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition-colors"
          >
          {submitButtonLabel ?? (title?.toLowerCase() === 'login' ? 'Login' : 'Register')}
        </button>
      </form>
      {title?.toLowerCase() === "login" && 
        <p>Don't have an account? <a onClick={goToRegister} className="text-blue-600 hover:underline cursor-pointer">
          Click here </a>to create one!</p>
      }
      {title?.toLowerCase() === "register" &&
        <p>Already have an account? <a onClick={goToLogin} className="text-blue-600 hover:underline cursor-pointer">
          Click here </a> to login!</p>
      }
    </div>
  );
}

export default AuthLayout;
