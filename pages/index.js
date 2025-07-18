import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email,
        password
      });

      setMessage({ type: 'success', text: 'Login successful. Redirecting...' });

      // TODO: Redirect to dashboard or next page
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Login failed. Please check your credentials.'
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-6">
        <div className="text-blue-700 font-bold text-4xl mb-2">
          NBK CAPITAL
        </div>
        <p className="text-sm text-gray-600">Terminal ID: <strong>NBK-CAP-TERM-01</strong></p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>

        {message && (
          <div className={`text-sm p-3 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
          <a href="/change-password" className="hover:underline">Change Password</a>
        </div>
      </div>
    </div>
  );
}
