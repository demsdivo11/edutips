import React, { useState } from 'react';
import { User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  setIsAdmin: (isAdmin: boolean) => void;
  setAdminId: (adminId: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ setIsAdmin, setAdminId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: queryError } = await supabase
        .rpc('verify_admin_login', {
          p_username: username,
          p_password: password
        });

      if (queryError) throw queryError;

      if (data && data.length > 0) {
        setIsAdmin(true);
        setAdminId(data[0].id);
        localStorage.setItem('admin_id', data[0].id);
        localStorage.setItem('admin_username', username);
      } else {
        setError('Username atau password salah!');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto mt-8">
      <div className="text-center mb-6">
        <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Login Admin</h2>
        <p className="text-gray-600 mt-2">Masukkan kredensial Anda untuk melanjutkan</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 bg-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            placeholder="Masukkan username"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 bg-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            placeholder="Masukkan password"
            required
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;