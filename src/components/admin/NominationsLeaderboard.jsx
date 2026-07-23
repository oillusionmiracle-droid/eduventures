import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { AWARD_CATEGORIES } from '../../utils/constants';

// Helper to generate consistent colors based on name
const getColor = (name) => {
  const colors = ['bg-teal-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500', 'bg-pink-500'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const NominationsLeaderboard = ({ nominations = [], selectedCategory, onCategoryChange, onExport }) => {
  // Aggregate and sort nominations for the selected category
  const filtered = nominations.filter(n => n.category === selectedCategory);
  const counts = filtered.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + 1;
    return acc;
  }, {});
  
  const leaderboard = Object.keys(counts)
    .map(name => ({ name, votes: counts[name] }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white">Nominations Overview</h2>
          <p className="text-sm text-white/50">Manage and audit student award submissions</p>
        </div>
        <div className="w-full md:w-64">
          <select 
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-lg px-4 py-2 outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 shadow-sm"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {AWARD_CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-[#0a0a0f] text-white">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-none bg-teal-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <p className="text-sm font-medium text-teal-400 mb-1">Total Votes</p>
          <div className="flex items-end space-x-2 relative z-10">
            <h3 className="text-3xl font-display font-bold text-white">{filtered.length}</h3>
          </div>
        </Card>
        <Card className="border-none shadow-none bg-blue-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <p className="text-sm font-medium text-blue-400 mb-1">Unique Candidates</p>
          <div className="flex items-end space-x-2 relative z-10">
            <h3 className="text-3xl font-display font-bold text-white">{leaderboard.length}</h3>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold text-white">Leaderboard</h3>
          <div className="flex space-x-2">
             <Button variant="ghost" size="sm" onClick={() => {}} icon={
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             }>
               Refresh
             </Button>
             <Button variant="secondary" size="sm" onClick={onExport} icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
             }>
               Export CSV
             </Button>
          </div>
        </div>

        <div className="space-y-0">
          {leaderboard.length === 0 ? (
            <div className="text-center py-8 text-white/40">No nominations yet for this category.</div>
          ) : (
            leaderboard.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-white/[0.04] rounded-lg transition-colors border-b border-white/[0.04] last:border-0 group">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/[0.06] text-white/50'}`}>
                    #{idx + 1}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-black font-bold ${getColor(item.name)} shadow-lg`}>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-teal-400 transition-colors">{item.name}</p>
                    {idx === 0 && <p className="text-xs text-amber-400 font-medium flex items-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 14.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L2.82 8.124a.75.75 0 01.415-1.28l4.21-.611L9.327 2.418A.75.75 0 0110 2z" clipRule="evenodd" />
                      </svg>
                      Front Runner
                    </p>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-white/[0.06] border border-white/[0.04] rounded-full">
                    <span className="font-bold text-white">{item.votes}</span>
                    <span className="text-xs text-white/50 ml-1">votes</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default NominationsLeaderboard;
