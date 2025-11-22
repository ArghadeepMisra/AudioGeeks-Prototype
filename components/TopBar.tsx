
import React, { useState } from 'react';
import { IconSearch, IconBell, IconChevronDown } from './Icons';
import { ViewState } from '../types';
import { MOCK_USERS } from '../constants';

interface TopBarProps {
  onProfileClick: () => void;
  onNavigate: (view: ViewState) => void;
  onSearch: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onProfileClick, onNavigate, onSearch }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  const notifications = [
    { id: 1, text: 'TubeMaster replied to your thread', time: '2m ago', unread: true },
    { id: 2, text: 'New Marketplace listing matches your wishlist', time: '1h ago', unread: false },
    { id: 3, text: 'Your tour application was approved', time: '1d ago', unread: false },
  ];

  return (
    <header className="h-16 bg-fb-surface border-b border-fb-border sticky top-0 z-40 px-6 flex items-center justify-between transition-all duration-300 shadow-sm">
      <div className="flex-1 max-w-xl flex items-center gap-6">
        <div className="relative group w-full max-w-xs">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-fb-textSec w-5 h-5 group-focus-within:text-fb-accent transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Audio Geeks..."
            className="w-full bg-fb-bg border border-transparent group-hover:border-fb-border focus:border-fb-accent rounded-full py-2.5 pl-10 pr-4 text-fb-text placeholder-fb-textSec focus:outline-none transition-all"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => onNavigate('gears')} className="text-fb-textSec hover:text-fb-accent font-medium transition-colors text-sm">Gears</button>
          <button onClick={() => onNavigate('reviews')} className="text-fb-textSec hover:text-fb-accent font-medium transition-colors text-sm">Reviews</button>
          <button onClick={() => onNavigate('contact')} className="text-fb-textSec hover:text-fb-accent font-medium transition-colors text-sm">Contact Us</button>
        </nav>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 text-fb-textSec hover:bg-fb-hover transition-colors rounded-full ${showNotifications ? 'bg-fb-accent/10 text-fb-accent' : ''}`}
          >
            <IconBell className="w-6 h-6" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-fb-red rounded-full border-2 border-fb-surface"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-fb-surface rounded-xl shadow-2xl border border-fb-border overflow-hidden animate-fade-in z-50">
              <div className="p-3 border-b border-fb-border flex justify-between items-center">
                <h3 className="font-bold text-fb-text text-lg">Notifications</h3>
                <button className="text-xs text-fb-accent hover:underline">Mark all read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-3 hover:bg-fb-hover cursor-pointer flex gap-3 ${notif.unread ? 'bg-fb-accent/5' : ''}`}>
                    <div className={`w-2 h-2 mt-2 rounded-full ${notif.unread ? 'bg-fb-accent' : 'bg-transparent'}`}></div>
                    <div>
                       <p className="text-sm text-fb-text leading-tight">{notif.text}</p>
                       <p className="text-xs text-fb-textSec mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-fb-surface border border-fb-border flex items-center justify-center text-fb-textSec hover:bg-fb-hover hover:text-fb-text transition-all"
          >
            <IconChevronDown className="w-5 h-5" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-fb-surface rounded-xl shadow-2xl border border-fb-border overflow-hidden animate-fade-in z-50">
              <div className="py-1">
                <button onClick={() => setShowProfileMenu(false)} className="block w-full text-left px-4 py-2 text-sm text-fb-text hover:bg-fb-hover transition-colors">Settings</button>
                <button onClick={() => setShowProfileMenu(false)} className="block w-full text-left px-4 py-2 text-sm text-fb-text hover:bg-fb-hover transition-colors">Privacy</button>
                <div className="border-t border-fb-border my-1"></div>
                <button onClick={() => setShowProfileMenu(false)} className="block w-full text-left px-4 py-2 text-sm text-fb-red hover:bg-fb-hover transition-colors">Log Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
