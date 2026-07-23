import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const BusinessDirectory = ({ businesses = [], onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = businesses.filter(b => 
    b.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white">Business Directory</h2>
          <p className="text-sm text-white/50">Student businesses promoted in the form</p>
        </div>
        <Button variant="secondary" onClick={onExport} icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        }>
          Export CSV
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <Input
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            {businesses.length === 0 ? "No businesses have been submitted yet." : "No businesses match your search."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((b, idx) => (
              <div key={idx} className="border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.02] transition-colors bg-white/[0.04]">
                <div className="flex items-start space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 border border-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{b.name}</h4>
                    <p className="text-xs text-white/40">
                      Submitted {new Date(b.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-2 bg-white/[0.02] p-3 rounded-md border border-white/[0.04]">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default BusinessDirectory;
