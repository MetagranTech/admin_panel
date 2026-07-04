import React, { useState } from 'react';
import { login } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await login({ email, password });
      localStorage.setItem('adminToken', response.data.token);
      onLogin();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <form onSubmit={submit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md space-y-5">
      <h1 className="text-3xl font-bold">Home Step In Admin</h1>
      <input className="w-full border rounded-xl p-3" type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded-xl p-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-red-600">{error}</p>}
      <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </main>;
}
