
import React from 'react';
import { ViewState } from '../types';
import { IconHome, IconMessageSquare, IconShoppingBag, IconMap, IconUsers } from './Icons';
import { MOCK_USERS } from '../constants';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems: { id: ViewState; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome },
    { id: 'forum', label: 'Forum', icon: IconUsers },
    { id: 'marketplace', label: 'Marketplace', icon: IconShoppingBag },
    { id: 'chat', label: 'Chat Center', icon: IconMessageSquare },
    { id: 'tours', label: 'Tours', icon: IconMap },
  ];

  const user = MOCK_USERS[0];

  return (
    <aside className="w-20 lg:w-64 bg-fb-surface border-r border-fb-border flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 shadow-sm">
      <button 
        onClick={() => onChangeView('dashboard')}
        className="h-16 flex items-center justify-center w-full hover:bg-fb-hover/50 transition-colors"
      >
        <span className="font-sans font-bold text-fb-text text-xl tracking-tight">
          <span className="lg:hidden text-fb-accent">AG</span>
          <span className="hidden lg:block">
            Audio <span className="text-fb-accent">Geeks</span>
          </span>
        </span>
      </button>

      <nav className="flex-1 py-6 space-y-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`w-full flex items-center justify-center lg:justify-start lg:px-4 py-3 rounded-lg transition-all duration-200 group relative ${
              currentView === item.id || (currentView === 'reviews' && item.id === 'dashboard')
                ? 'bg-fb-hover/50 text-fb-accent'
                : 'text-fb-textSec hover:bg-fb-hover hover:text-fb-text'
            }`}
          >
            <item.icon className={`w-6 h-6 ${currentView === item.id ? 'text-fb-accent' : 'text-fb-textSec group-hover:text-fb-text'}`} />
            <span className={`ml-3 font-medium hidden lg:block ${currentView === item.id ? 'text-fb-accent' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-fb-border">
        <button onClick={() => onChangeView('profile')} className="flex items-center justify-center lg:justify-start w-full p-2 rounded-lg hover:bg-fb-hover transition-colors">
          <div className="relative">
             <img src={user.avatar} className="w-9 h-9 rounded-full border-2 border-fb-border" alt="Profile" />
          </div>
          <div className="ml-3 text-left hidden lg:block truncate max-w-[140px]">
            <p className="text-sm font-semibold text-fb-text truncate">{user.username}</p>
            <p className={`text-xs font-bold ${user.badge === 'Admin' ? 'text-fb-gold' : 'text-fb-accent'}`}>{user.badge || 'Member'}</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
