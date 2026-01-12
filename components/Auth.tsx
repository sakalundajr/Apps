
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username.toLowerCase().replace(/\s/g, '_'),
      displayName: displayName || username,
      avatar: `https://picsum.photos/seed/${username}/200`,
      bio: "New TradePulse member 🚀",
      followers: 0,
      following: 0,
      isPro: false
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-emerald-500 rounded-2xl mb-4 items-center justify-center flex shadow-lg shadow-emerald-500/20">
            <span className="text-slate-900 text-3xl font-black italic">TP</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome to TradePulse</h2>
          <p className="text-slate-400">The social edge for financial elites.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Satoshi_2024"
              required
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Display Name</label>
              <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Full Name"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            {isLogin ? "New here? Join the trade floor" : "Already a pulse member? Sign in"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <div>Crypto</div>
          <div>Forex</div>
          <div>Betting</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
