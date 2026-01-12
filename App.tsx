
import React, { useState, useEffect } from 'react';
import { User, Post, AppTab } from './types';
import { ICONS, MOCK_USERS } from './constants';
import Feed from './components/Feed';
import Markets from './components/Markets';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.FEED);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('trade_pulse_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('trade_pulse_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('trade_pulse_user');
  };

  if (!isInitialized) return <div className="min-h-screen bg-slate-900 flex items-center justify-center">Loading...</div>;

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900">TP</div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            TradePulse
          </h1>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <NavItem active={activeTab === AppTab.FEED} onClick={() => setActiveTab(AppTab.FEED)} icon={<ICONS.Home />} label="Home Feed" />
          <NavItem active={activeTab === AppTab.MARKETS} onClick={() => setActiveTab(AppTab.MARKETS)} icon={<ICONS.Trending />} label="Market Data" />
          <NavItem active={activeTab === AppTab.CHAT} onClick={() => setActiveTab(AppTab.CHAT)} icon={<ICONS.Message />} label="AI Analyst" />
          <NavItem active={activeTab === AppTab.PROFILE} onClick={() => setActiveTab(AppTab.PROFILE)} icon={<ICONS.User />} label="My Profile" />
        </nav>

        <div className="mt-auto p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="flex items-center gap-3">
            <img src={currentUser.avatar} alt={currentUser.displayName} className="w-10 h-10 rounded-full border border-slate-600" />
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">{currentUser.displayName}</p>
              <p className="text-xs text-slate-400">@{currentUser.username}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full mt-4 text-xs text-slate-400 hover:text-red-400 transition-colors">Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen max-w-4xl mx-auto w-full pb-20 md:pb-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900">TP</div>
            <span className="font-bold">TradePulse</span>
          </div>
          <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
        </header>

        <div className="flex-1 p-4">
          {activeTab === AppTab.FEED && <Feed currentUser={currentUser} />}
          {activeTab === AppTab.MARKETS && <Markets />}
          {activeTab === AppTab.CHAT && <Chat />}
          {activeTab === AppTab.PROFILE && <Profile user={currentUser} onLogout={handleLogout} />}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 flex justify-around p-3 z-50">
        <MobileNavItem active={activeTab === AppTab.FEED} onClick={() => setActiveTab(AppTab.FEED)} icon={<ICONS.Home />} />
        <MobileNavItem active={activeTab === AppTab.MARKETS} onClick={() => setActiveTab(AppTab.MARKETS)} icon={<ICONS.Trending />} />
        <MobileNavItem active={activeTab === AppTab.CHAT} onClick={() => setActiveTab(AppTab.CHAT)} icon={<ICONS.Message />} />
        <MobileNavItem active={activeTab === AppTab.PROFILE} onClick={() => setActiveTab(AppTab.PROFILE)} icon={<ICONS.User />} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const MobileNavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg ${active ? 'text-emerald-400' : 'text-slate-500'}`}
  >
    {icon}
  </button>
);

export default App;
