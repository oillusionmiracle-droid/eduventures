import React from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';

const BusinessPromotion = ({ business, onChange }) => {
  return (
    <Card className="mb-6 border-l-2 border-l-emerald-500/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-display font-bold text-white">Business Promotion</h2>
          <p className="text-sm text-white/40">Promote your student business</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Your Name / Business Name"
          placeholder="e.g., The Coffee Corner"
          value={business.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <Input
          textarea
          rows={3}
          label="Business Description"
          placeholder="Tell students about your services or products..."
          value={business.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
    </Card>
  );
};

export default BusinessPromotion;
