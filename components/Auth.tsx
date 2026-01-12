
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Simple validation for login
      if (!username) {
        setError('Please enter your username or email');
        return;
      }
    } else {
      // Validation for registration
      if (!username || !email || !password) {
        setError('All fields are required for registration');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
    }

    // Mocking the creation/authentication process
    const finalUsername = username.toLowerCase().replace(/\s/g, '_');
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: finalUsername,
      email: email || `${finalUsername}@hub.com`,
      displayName: displayName || username,
      avatar: `https://picsum.photos/seed/${finalUsername}/200`,
      bio: isLogin ? "Back in the hub 🚀" : "New Multi Signal Hub analyst 📈",
      followers: Math.floor(Math.random() * 100),
      following: Math.floor(Math.random() * 50),
      isPro: false
    };

    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[100px] rounded-full"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-block w-20 h-20 bg-emerald-500 rounded-3xl mb-6 items-center justify-center flex shadow-2xl shadow-emerald-500/40 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-slate-950 text-4xl font-black italic tracking-tighter">MSH</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Multi Signal Hub</h2>
          <p className="text-slate-400 mt-2 text-sm font-medium">Join the elite network of signals and insights.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800/50 p-1.5 rounded-2xl mb-8 relative z-10 border border-slate-700/50">
          <button 
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${isLogin ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${!isLogin ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-100 placeholder-slate-600"
              placeholder={isLogin ? "Username or Email" : "Create a username"}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-100 placeholder-slate-600"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Display Name (Optional)</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-100 placeholder-slate-600"
                  placeholder="Signal Master"
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-100 placeholder-slate-600"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 mt-6 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </form>

        <div className="mt-8 text-center relative z-10">
          <p className="text-slate-500 text-sm">
            By continuing, you agree to our 
            <a href="#" className="text-emerald-500/80 hover:text-emerald-400 ml-1 font-bold">Terms of Service</a>.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800/50 grid grid-cols-3 gap-4 text-center text-[10px] uppercase tracking-[0.2em] text-slate-600 font-black relative z-10">
          <div className="hover:text-emerald-500 transition-colors cursor-default">Crypto</div>
          <div className="hover:text-cyan-500 transition-colors cursor-default">Forex</div>
          <div className="hover:text-pink-500 transition-colors cursor-default">Bets</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
