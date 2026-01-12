
import React from 'react';
import MarketChart from './MarketChart';

const ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', price: 68432.12, change: +2.4, color: '#f59e0b' },
  { symbol: 'ETH', name: 'Ethereum', price: 3452.88, change: -0.8, color: '#8b5cf6' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0854, change: +0.02, color: '#10b981' },
  { symbol: 'GBP/JPY', name: 'Pound / Yen', price: 191.24, change: +0.45, color: '#ec4899' },
  { symbol: 'SOL', name: 'Solana', price: 142.15, change: +8.12, color: '#2dd4bf' },
];

const Markets: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Market Watch</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ASSETS.map(asset => (
          <div key={asset.symbol} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-lg group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-lg" style={{ color: asset.color }}>
                  {asset.symbol[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{asset.name}</h3>
                  <p className="text-sm text-slate-500">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-mono font-bold">${asset.price.toLocaleString()}</p>
                <p className={`text-sm font-bold ${asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </p>
              </div>
            </div>
            
            <MarketChart 
              color={asset.color}
              data={[
                { time: '1h', value: asset.price * 0.98 },
                { time: '2h', value: asset.price * 1.01 },
                { time: '3h', value: asset.price * 0.99 },
                { time: '4h', value: asset.price * 1.02 },
                { time: '5h', value: asset.price * 1.05 },
                { time: '6h', value: asset.price },
              ]}
            />
          </div>
        ))}
      </div>

      {/* Betting Odds Placeholder */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Upcoming Matches & Betting Odds</h3>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 divide-y divide-slate-800">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 font-bold uppercase">UCL</span>
              <div>
                <p className="font-bold">Real Madrid vs Man City</p>
                <p className="text-xs text-slate-500">Tomorrow 20:00</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-mono text-emerald-400">2.45</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-mono text-slate-400">3.20</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-mono text-red-400">2.10</button>
            </div>
          </div>
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 font-bold uppercase">NBA</span>
              <div>
                <p className="font-bold">Lakers vs Warriors</p>
                <p className="text-xs text-slate-500">Tonight 03:00</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-mono text-emerald-400">1.85</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-mono text-red-400">2.05</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
