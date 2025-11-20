
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import ForumView from './components/ForumView';
import MarketplaceView from './components/MarketplaceView';
import ChatView from './components/ChatView';
import ToursView from './components/ToursView';
import ProfileView from './components/ProfileView';
import ReviewView from './components/ReviewView';
import GearsView from './components/GearsView';
import ContactView from './components/ContactView';
import SearchResultsView from './components/SearchResultsView';
import { ViewState, User } from './types';
import { MOCK_USERS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfileUser, setSelectedProfileUser] = useState<User>(MOCK_USERS[0]);

  const handleViewChange = (view: ViewState, param?: string) => {
    if (view === 'profile') {
      // This is usually handled by direct profile click, but just in case
      setSelectedProfileUser(MOCK_USERS[0]);
      setShowProfile(true);
      return;
    }
    
    if (view !== 'search') {
      setSearchQuery(''); // Clear search on navigation unless staying in search
    }

    setIsLoading(true);
    setCurrentView(view);
    setViewParam(param);
    // Simulate loading delay for realism
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
    setViewParam(undefined);
  };

  const handleProfileClick = (user?: User) => {
    setSelectedProfileUser(user || MOCK_USERS[0]); // Default to Argha (me)
    setShowProfile(true);
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-8rem)] animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-fb-border border-t-fb-accent rounded-full animate-spin"></div>
            <p className="text-fb-textSec font-mono text-sm">LOADING...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard': return <Dashboard onChangeView={handleViewChange} />;
      case 'forum': return <ForumView initialThreadId={viewParam} onProfileClick={handleProfileClick} />;
      case 'marketplace': return <MarketplaceView initialProductId={viewParam} />;
      case 'chat': return <ChatView />;
      case 'tours': return <ToursView onChangeView={handleViewChange} />;
      case 'reviews': return <ReviewView initialReviewId={viewParam} onBack={() => handleViewChange('dashboard')} />;
      case 'gears': return <GearsView initialProductId={viewParam} searchQuery={searchQuery} />;
      case 'contact': return <ContactView />;
      case 'search': return <SearchResultsView query={searchQuery} onNavigate={handleViewChange} onProfileClick={handleProfileClick} />;
      default: return <Dashboard onChangeView={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-fb-bg text-fb-text font-sans selection:bg-fb-accent selection:text-white">
      <Sidebar currentView={currentView} onChangeView={handleViewChange} />
      
      <div className="ml-20 lg:ml-64 transition-all duration-300">
        <TopBar 
          onProfileClick={() => handleProfileClick(MOCK_USERS[0])} 
          onNavigate={handleViewChange}
          onSearch={handleSearch}
        />
        <main className="min-h-[calc(100vh-4rem)]">
          {renderView()}
        </main>
      </div>

      {showProfile && (
        <ProfileView user={selectedProfileUser} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default App;