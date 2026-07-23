import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DuplicateAlerts = ({ duplicates = [], onMerge, onDismiss }) => {
  if (!duplicates || duplicates.length === 0) return null;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-white flex items-center">
          Potential Duplicates
          <span className="ml-3 bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20">
            {duplicates.length} Matches Found
          </span>
        </h3>
      </div>
      
      <div className="space-y-4">
        {duplicates.map((dup, idx) => (
          <Card key={idx} className="border-l-2 border-l-amber-500/50 bg-amber-500/[0.02]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider">{dup.category}</p>
                    <span className="text-xs bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded text-white/60">{dup.confidence || 85}% match</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-bold text-white bg-white/[0.06] px-2 py-1 rounded border border-white/[0.08] shadow-sm">{dup.originalName}</span>
                    <span className="text-white/30">vs</span>
                    <span className="font-bold text-white bg-white/[0.06] px-2 py-1 rounded border border-white/[0.08] shadow-sm">{dup.matchName}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pl-12 md:pl-0">
                <Button variant="ghost" size="sm" onClick={() => onDismiss(idx)}>
                  Dismiss
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => onMerge(idx)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Merge Votes
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DuplicateAlerts;
