import React from 'react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onClose: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-fb-surface w-full max-w-2xl rounded-xl border border-fb-border shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Banner & Header */}
        <div className="h-32 bg-gradient-to-r from-fb-accent to-purple-600 relative">
           <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        <div className="px-8 pb-8">
           <div className="relative -mt-12 mb-4 flex justify-between items-end">
             <div className="relative">
               <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-fb-surface" alt={user.username} />
               {user.badge && (
                 <span className="absolute bottom-0 right-0 bg-fb-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-fb-surface">
                   {user.badge}
                 </span>
               )}
             </div>
             <div className="flex gap-2 mb-2">
                <button className="bg-fb-accent hover:bg-fb-accentHover text-white px-4 py-1.5 rounded-md text-sm font-bold transition-colors">
                  Message
                </button>
                <button className="bg-fb-hover hover:bg-fb-border text-fb-text px-4 py-1.5 rounded-md text-sm font-bold transition-colors">
                  Follow
                </button>
             </div>
           </div>

           <h2 className="text-2xl font-bold text-fb-text">{user.username}</h2>
           <p className="text-fb-textSec text-sm mb-6">Member since {user.joinDate || '2023'}</p>

           <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-fb-text uppercase tracking-wide mb-2">About</h3>
                <p className="text-fb-textSec text-sm leading-relaxed">{user.bio || 'No bio available.'}</p>
              </div>

              <div>
                 <h3 className="text-sm font-bold text-fb-text uppercase tracking-wide mb-2">Current Gear</h3>
                 <div className="flex flex-wrap gap-2">
                    {user.gearList ? user.gearList.map((gear, i) => (
                      <span key={i} className="bg-fb-bg border border-fb-border px-3 py-1 rounded-full text-xs text-fb-text">
                        {gear}
                      </span>
                    )) : (
                      <span className="text-fb-textSec text-xs italic">No gear listed.</span>
                    )}
                 </div>
              </div>

              <div className="flex gap-8 border-t border-fb-border pt-6">
                 <div className="text-center">
                    <span className="block font-bold text-fb-text text-lg">42</span>
                    <span className="text-xs text-fb-textSec">Posts</span>
                 </div>
                 <div className="text-center">
                    <span className="block font-bold text-fb-text text-lg">12</span>
                    <span className="text-xs text-fb-textSec">Reviews</span>
                 </div>
                 <div className="text-center">
                    <span className="block font-bold text-fb-text text-lg">156</span>
                    <span className="text-xs text-fb-textSec">Reputation</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;