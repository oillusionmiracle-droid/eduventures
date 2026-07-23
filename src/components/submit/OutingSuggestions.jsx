import React from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';

const OutingSuggestions = ({ suggestions, onChange }) => {
  return (
    <Card className="mb-6 border-l-2 border-l-teal-500/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-display font-bold text-white">Outing Suggestions</h2>
          <p className="text-sm text-white/40">Help us plan the perfect day</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Department Name"
          placeholder="e.g., Computer Science"
          value={suggestions.departmentName}
          onChange={(e) => onChange('departmentName', e.target.value)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Proposed Game 1"
            placeholder="Enter activity name"
            value={suggestions.game1}
            onChange={(e) => onChange('game1', e.target.value)}
          />
          <Input
            label="Proposed Game 2"
            placeholder="Enter activity name"
            value={suggestions.game2}
            onChange={(e) => onChange('game2', e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default OutingSuggestions;
