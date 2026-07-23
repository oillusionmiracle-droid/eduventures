import React from 'react';

const Header = ({ showNotification = false, showProfile = false }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/[0.03] backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <svg className="w-7 h-7 text-teal-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.3"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-display font-bold text-gradient">EduVentures</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {showNotification && (
            <button className="relative p-2 text-white/30 hover:text-teal-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full"></span>
            </button>
          )}
          
          {showProfile && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 flex items-center justify-center text-black font-bold text-xs cursor-pointer hover:shadow-lg hover:shadow-teal-500/20 transition-shadow">
              EV
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
