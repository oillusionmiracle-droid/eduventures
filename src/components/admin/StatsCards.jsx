import React from 'react';
import Card from '../ui/Card';

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="border-l-2 border-l-teal-500/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Total Suggestions</p>
            <h3 className="text-3xl font-display font-bold text-white">{stats?.totalSuggestions || 0}</h3>
          </div>
          <div className="p-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-teal-400 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            +12%
          </span>
          <span className="text-white/25 ml-2">from last week</span>
        </div>
      </Card>

      <Card className="border-l-2 border-l-amber-500/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Top Department</p>
            <h3 className="text-xl font-display font-bold text-white truncate pr-2" title={stats?.topDepartment}>{stats?.topDepartment || 'N/A'}</h3>
          </div>
          <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex -space-x-1.5">
          {[1,2,3].map(i => (
             <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0f] bg-white/[0.08]"></div>
          ))}
          <div className="w-6 h-6 rounded-full border-2 border-[#0a0a0f] bg-white/[0.05] flex items-center justify-center text-[9px] font-bold text-white/40">+{stats?.totalSuggestions > 3 ? stats.totalSuggestions - 3 : 0}</div>
        </div>
      </Card>

      <Card className="border-l-2 border-l-emerald-500/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Most Popular Game</p>
            <h3 className="text-xl font-display font-bold text-white truncate pr-2" title={stats?.mostPopularGame}>{stats?.mostPopularGame || 'N/A'}</h3>
          </div>
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
           <div className="w-full bg-white/[0.06] rounded-full h-1.5 mb-1">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full" style={{width: '75%'}}></div>
           </div>
           <p className="text-xs text-white/30">75% approval rating</p>
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
