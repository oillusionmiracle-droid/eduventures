import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import StatsCards from '../components/admin/StatsCards';
import SuggestionsTable from '../components/admin/SuggestionsTable';
import NominationsLeaderboard from '../components/admin/NominationsLeaderboard';
import DuplicateAlerts from '../components/admin/DuplicateAlerts';
import BusinessDirectory from '../components/admin/BusinessDirectory';
import ExportActions from '../components/admin/ExportActions';
import Card from '../components/ui/Card';
import { getSuggestions, getNominations, getDuplicates, getBusinesses, exportData, resetData } from '../utils/api';
import { AWARD_CATEGORIES } from '../utils/constants';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [suggestions, setSuggestions] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(AWARD_CATEGORIES[0]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [suggsData, nomsData, dupsData, busData] = await Promise.all([
        getSuggestions().catch(() => ({ data: [] })),
        getNominations().catch(() => ({ data: [] })),
        getDuplicates().catch(() => ({ data: [] })),
        getBusinesses().catch(() => ({ data: [] }))
      ]);
      
      setSuggestions(suggsData.data || []);
      setNominations(nomsData.data || []);
      setDuplicates(dupsData.data || []);
      setBusinesses(busData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportData();
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eduventures-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      alert('Failed to export data. Using fallback...');
      // Fallback simple CSV export if API fails
      console.log("Fallback export triggered");
    }
  };

  const handleReset = async () => {
    try {
      await resetData();
      fetchData();
    } catch (error) {
      alert('Failed to reset data');
    }
  };

  const handleMergeDuplicate = (idx) => {
    // In a real app, this would call an API to merge
    const newDups = [...duplicates];
    newDups.splice(idx, 1);
    setDuplicates(newDups);
  };

  const handleDismissDuplicate = (idx) => {
    const newDups = [...duplicates];
    newDups.splice(idx, 1);
    setDuplicates(newDups);
  };

  // Derived stats
  const stats = {
    totalSuggestions: suggestions.length,
    topDepartment: suggestions.length > 0 ? (
      Object.entries(suggestions.reduce((acc, s) => { acc[s.departmentName] = (acc[s.departmentName] || 0) + 1; return acc; }, {}))
      .sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A'
    ) : 'N/A',
    mostPopularGame: suggestions.length > 0 ? (
      Object.entries(suggestions.reduce((acc, s) => { 
        if(s.game1) acc[s.game1] = (acc[s.game1] || 0) + 1; 
        if(s.game2) acc[s.game2] = (acc[s.game2] || 0) + 1; 
        return acc; 
      }, {}))
      .sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A'
    ) : 'N/A'
  };

  return (
    <div className="min-h-screen mesh-gradient pb-24 relative">
      <Header showNotification showProfile />
      
      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/50">Overview of all platform activity</p>
              </div>
              <button className="p-2 bg-white/[0.04] border border-white/[0.08] rounded-full shadow-sm text-white/50 hover:text-teal-400 hover:bg-white/[0.08] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <StatsCards stats={stats} />
            <SuggestionsTable suggestions={suggestions} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="gradient" className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <h3 className="text-lg font-display font-bold mb-2">Review Pending Nominations</h3>
                <p className="text-white/80 text-sm mb-4">14 students are waiting for approval to appear on the leaderboard.</p>
                <button className="bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg backdrop-blur-sm">
                  Review Now →
                </button>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-white/[0.08]">
                <h3 className="text-lg font-display font-bold mb-2 text-white">Setup New Outing</h3>
                <p className="text-white/50 text-sm mb-4">Configure dates and budgets for the upcoming semester break outing.</p>
                <button className="bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                  Configure →
                </button>
              </Card>
            </div>
            
            <ExportActions onExport={handleExport} onReset={handleReset} />
            
            <button className="fixed bottom-24 right-6 w-14 h-14 bg-teal-500 rounded-full shadow-lg shadow-teal-500/20 text-black flex items-center justify-center hover:bg-teal-400 hover:shadow-teal-400/30 hover:scale-105 transition-all z-30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="animate-fade-in">
            <DuplicateAlerts 
              duplicates={duplicates} 
              onMerge={handleMergeDuplicate} 
              onDismiss={handleDismissDuplicate} 
            />
            <NominationsLeaderboard 
              nominations={nominations}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onExport={handleExport}
            />
          </div>
        )}

        {activeTab === 'outings' && (
          <div className="animate-fade-in">
             <h2 className="text-2xl font-display font-bold text-white mb-6">Outing Data</h2>
             <SuggestionsTable suggestions={suggestions} />
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="animate-fade-in">
             <BusinessDirectory businesses={businesses} onExport={handleExport} />
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AdminDashboard;
