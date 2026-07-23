import React from 'react';
import Card from '../ui/Card';

const SuggestionsTable = ({ suggestions = [] }) => {
  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-white">Recent Outing Suggestions</h3>
        <a href="#" className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors">View All</a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs font-semibold text-white/40 uppercase tracking-wider">
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Game 1</th>
              <th className="py-3 px-4">Game 2</th>
              <th className="py-3 px-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {suggestions.length === 0 ? (
               <tr>
                 <td colSpan="4" className="py-8 text-center text-white/30">No suggestions yet</td>
               </tr>
            ) : (
              suggestions.slice(0, 5).map((s, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mr-3 font-semibold text-xs border border-teal-500/20">
                        {s.departmentName?.substring(0, 2).toUpperCase() || 'NA'}
                      </div>
                      <span className="font-medium text-white">{s.departmentName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/60">{s.game1 || '-'}</td>
                  <td className="py-3 px-4 text-white/60">{s.game2 || '-'}</td>
                  <td className="py-3 px-4 text-white/50 text-sm text-right">
                    {new Date(s.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SuggestionsTable;
