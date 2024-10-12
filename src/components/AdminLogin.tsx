import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AdminLoginProps {
  setIsAdmin: (isAdmin: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ setIsAdmin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate the password against a backend
    if (password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Password salah!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="mr-2" />
        Login Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;