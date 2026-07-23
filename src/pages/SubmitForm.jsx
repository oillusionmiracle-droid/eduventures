import React, { useState } from 'react';
import Header from '../components/layout/Header';
import OutingSuggestions from '../components/submit/OutingSuggestions';
import AwardNominations from '../components/submit/AwardNominations';
import BusinessPromotion from '../components/submit/BusinessPromotion';
import Button from '../components/ui/Button';
import { submitForm } from '../utils/api';

const SubmitForm = () => {
  const [suggestions, setSuggestions] = useState({ departmentName: '', game1: '', game2: '' });
  const [nominations, setNominations] = useState([]);
  const [business, setBusiness] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSuggestionChange = (field, value) => {
    setSuggestions(prev => ({ ...prev, [field]: value }));
  };

  const handleAddNomination = (nom) => {
    setNominations(prev => [...prev, nom]);
  };

  const handleRemoveNomination = (idx) => {
    setNominations(prev => prev.filter((_, i) => i !== idx));
  };

  const handleBusinessChange = (field, value) => {
    setBusiness(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!suggestions.departmentName.trim()) {
      alert("Please enter your department name for the outing suggestions.");
      return;
    }
    
    const hasInfluential = nominations.some(n => n.category === 'Most Influential');
    if (!hasInfluential) {
      alert("You must nominate at least one person for 'Most Influential' before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitForm({
        suggestions: suggestions,
        nominations: nominations.map(n => ({
          category: n.category,
          nominatedPerson: n.name
        })),
        business: (business.name || business.description) ? {
          studentName: business.name,
          businessDescription: business.description
        } : null
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      alert(error.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col mesh-gradient">
        <Header />
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
          {/* Animated success */}
          <div className="relative w-20 h-20 mb-8 animate-scale-in">
            <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-pulse-glow"></div>
            <div className="relative w-20 h-20 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>Successfully Submitted!</h1>
          <p className="text-white/50 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Thank you for your input. Your outing suggestions, award nominations, and business details have been recorded.
          </p>
          <Button onClick={() => window.location.reload()} variant="primary" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Submit Another Response
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col mesh-gradient pb-24">
      <Header showProfile />
      
      {/* Decorative orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-teal-500/[0.04] rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="fixed bottom-40 right-5 w-60 h-60 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '-3s' }}></div>
      
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-extrabold text-white mb-2">Student Submissions</h1>
          <p className="text-white/40">Share your ideas for the upcoming school outing and nominate your peers.</p>
        </div>

        <OutingSuggestions suggestions={suggestions} onChange={handleSuggestionChange} />
        
        <AwardNominations 
          nominations={nominations} 
          onAdd={handleAddNomination} 
          onRemove={handleRemoveNomination} 
        />
        
        <BusinessPromotion business={business} onChange={handleBusinessChange} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/[0.04] backdrop-blur-xl border-t border-white/[0.06] p-4 z-40">
        <div className="max-w-xl mx-auto">
          <Button 
            variant="gradient" 
            fullWidth 
            size="lg" 
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            SUBMIT ALL RESPONSES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
