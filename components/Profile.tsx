
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl mb-6">
        <div className="h-32 bg-gradient-to-r from-emerald-600/30 to-cyan-600/30"></div>
        <div className="px-8 pb-8 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="relative">
              <img src={user.avatar} className="w-24 h-24 rounded-3xl border-4 border-slate-900 shadow-lg" alt="profile" />
              {user.isPro && (
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-slate-900 uppercase">
                  Pro
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all text-sm">Edit Profile</button>
              <button onClick={onLogout} className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all text-sm border border-red-500/20">Logout</button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-slate-400">@{user.username}</p>
          </div>

          <p className="text-slate-300 mb-8 leading-relaxed max-w-lg">
            {user.bio}
          </p>

          <div className="flex gap-8 border-y border-slate-800/50 py-6">
            <div>
              <p className="text-2xl font-black">{user.followers.toLocaleString()}</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-black">{user.following.toLocaleString()}</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Following</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">74%</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Win Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-500 text-xs uppercase font-bold mb-1">Total Signals</p>
          <p className="text-3xl font-black">142</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
          <p className="text-slate-500 text-xs uppercase font-bold mb-1">Net PnL</p>
          <p className="text-3xl font-black text-emerald-400">+$12.4k</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-800 mb-6">
        <button className="px-4 py-3 border-b-2 border-emerald-500 text-emerald-400 font-bold">Posts</button>
        <button className="px-4 py-3 text-slate-500 hover:text-slate-200 transition-colors">Signals</button>
        <button className="px-4 py-3 text-slate-500 hover:text-slate-200 transition-colors">Trades</button>
      </div>
      
      <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
        <p className="text-slate-500">Your trading journey is just beginning. Post your first signal!</p>
      </div>
    </div>
  );
};

export default Profile;
