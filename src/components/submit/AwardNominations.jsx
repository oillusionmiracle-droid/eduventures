import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AWARD_CATEGORIES } from '../../utils/constants';

const AwardNominations = ({ nominations, onAdd, onRemove }) => {
  const [selectedCategory, setSelectedCategory] = useState(AWARD_CATEGORIES[0]);
  const [nomineeName, setNomineeName] = useState('');
  
  const handleAdd = () => {
    if (!nomineeName.trim()) return;
    
    const count = nominations.filter(n => n.category === selectedCategory).length;
    if (count >= 4) {
      alert(`You can only nominate up to 4 people for ${selectedCategory}`);
      return;
    }
    
    onAdd({ category: selectedCategory, name: nomineeName });
    setNomineeName('');
  };

  const isInfluentialNeeded = !nominations.some(n => n.category === 'Most Influential');

  return (
    <Card className="mb-6 border-l-2 border-l-amber-500/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/[0.03] rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex items-center space-x-3 mb-6 relative">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-display font-bold text-white">Award Nominations</h2>
          <p className="text-sm text-white/40">Recognize outstanding peers</p>
        </div>
      </div>
      
      {isInfluentialNeeded && (
        <div className="bg-amber-500/[0.08] border border-amber-500/20 rounded-xl p-3 mb-5 flex items-start space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-amber-300/80">
            <strong className="text-amber-300">Required:</strong> Please nominate someone for <span className="font-semibold text-amber-200">Most Influential</span>.
          </p>
        </div>
      )}

      <div className="space-y-4 mb-6 relative">
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1.5">Award Category</label>
          <select 
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-2.5 outline-none transition-all duration-200 focus:bg-white/[0.06] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {AWARD_CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-[#1a1a2e] text-white">{cat}</option>
            ))}
          </select>
        </div>
        
        <Input
          label="Nominee Name"
          placeholder="Full name of person"
          value={nomineeName}
          onChange={(e) => setNomineeName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        
        <Button 
          variant="secondary" 
          fullWidth 
          onClick={handleAdd}
          disabled={!nomineeName.trim()}
          className="mt-2"
        >
          + Add nomination
        </Button>
      </div>

      {nominations.length > 0 && (
        <div className="mt-6 border-t border-white/[0.06] pt-4">
          <h3 className="text-sm font-semibold text-white/50 mb-3">Your Nominations ({nominations.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {nominations.map((nom, idx) => (
              <div key={idx} className="flex items-center justify-between glass rounded-xl p-3 animate-fade-in">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-teal-500/15 text-teal-300 text-xs font-semibold rounded-full mb-1">
                    {nom.category}
                  </span>
                  <p className="text-sm font-medium text-white">{nom.name}</p>
                </div>
                <button 
                  onClick={() => onRemove(idx)}
                  className="p-1.5 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AwardNominations;
