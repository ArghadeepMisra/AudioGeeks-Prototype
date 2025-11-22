
import React, { useState } from 'react';
import { MOCK_THREADS, MOCK_REVIEWS, MOCK_DMS, MOCK_USERS } from '../constants';
import { ViewState } from '../types';

interface DashboardProps {
  onChangeView: (view: ViewState, param?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const user = MOCK_USERS[0];
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'pending' | 'verified'>('idle');
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in relative">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-fb-text">Welcome back, {user.username.split(' ')[0]}</h1>
        <p className="text-fb-textSec mt-1">Here's what's happening in the community today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Latest Reviews */}
          <section>
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-fb-text">Latest Reviews</h2>
               <button onClick={() => onChangeView('reviews')} className="text-fb-accent text-sm font-medium hover:underline">View All</button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {MOCK_REVIEWS.slice(0, 2).map(review => (
                 <div 
                   key={review.id} 
                   onClick={() => onChangeView('reviews', review.id)}
                   className="bg-fb-surface rounded-xl border border-fb-border overflow-hidden hover:bg-fb-hover transition-colors cursor-pointer group"
                 >
                   <div className="relative h-40">
                     <img src={review.image} alt={review.productName} className="w-full h-full object-cover" />
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                       <h3 className="text-white font-bold text-sm leading-tight">{review.title}</h3>
                     </div>
                   </div>
                   <div className="p-3">
                      <p className="text-xs text-fb-textSec line-clamp-2">{review.snippet}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <img src={review.author.avatar} className="w-5 h-5 rounded-full" alt="" />
                         <span className="text-xs text-fb-textSec">{review.author.username}</span>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
          </section>

          {/* Trending Threads */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-fb-text">Trending Discussions</h2>
               <button onClick={() => onChangeView('forum')} className="text-fb-accent text-sm font-medium hover:underline">Go to Forum</button>
             </div>
            <div className="bg-fb-surface rounded-xl border border-fb-border overflow-hidden">
              {MOCK_THREADS.filter(t => !t.isPrivate).slice(0, 4).map(thread => (
                <div 
                  key={thread.id} 
                  onClick={() => onChangeView('forum', thread.id)}
                  className="p-4 border-b border-fb-border last:border-0 hover:bg-fb-hover transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-fb-text font-medium text-base mb-1 group-hover:text-fb-accent">{thread.title}</h3>
                      <p className="text-xs text-fb-textSec">
                        {thread.category} • Posted by <span className="text-fb-text">{thread.author.username}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-xs font-bold text-fb-text bg-fb-hover px-2 py-1 rounded-full">{thread.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Side Column */}
        <div className="space-y-8">
          
          {/* Recent Messages (DMs) */}
          <section className="bg-fb-surface rounded-xl border border-fb-border p-4">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-fb-text">Messages</h2>
               <button onClick={() => onChangeView('chat')} className="p-1 hover:bg-fb-hover rounded-full">
                 <svg className="w-5 h-5 text-fb-textSec" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
               </button>
             </div>
             <div className="space-y-2">
               {MOCK_DMS.map(dm => (
                 <div 
                   key={dm.id} 
                   onClick={() => onChangeView('chat')}
                   className="flex items-center gap-3 p-2 hover:bg-fb-hover rounded-lg cursor-pointer transition-colors"
                 >
                    <div className="relative">
                      <img src={dm.user.avatar} alt={dm.user.username} className="w-10 h-10 rounded-full" />
                      {dm.unreadCount > 0 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-fb-accent border-2 border-fb-surface rounded-full"></div>}
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <div className="flex justify-between items-baseline">
                          <h4 className={`text-sm truncate ${dm.unreadCount > 0 ? 'font-bold text-fb-text' : 'font-medium text-fb-text'}`}>{dm.user.username}</h4>
                          <span className="text-[10px] text-fb-textSec">{dm.timestamp}</span>
                       </div>
                       <p className={`text-xs truncate ${dm.unreadCount > 0 ? 'text-fb-text font-semibold' : 'text-fb-textSec'}`}>{dm.lastMessage}</p>
                    </div>
                 </div>
               ))}
             </div>
             <button onClick={() => onChangeView('chat')} className="w-full text-center text-sm text-fb-accent font-medium mt-4 hover:underline">View all messages</button>
          </section>

          {/* Verified Member Card - Dynamic */}
          {verificationStatus === 'pending' ? (
            <section className="bg-fb-surface border border-fb-border rounded-xl p-6 shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-fb-gold"></div>
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-fb-gold/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-fb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-fb-text">Verification Pending</h3>
               </div>
               <p className="text-sm text-fb-textSec mb-4">
                 We have received your ID and are currently reviewing it. This usually takes 24-48 hours. You will be notified once approved.
               </p>
               <button onClick={() => setShowVerifyModal(true)} className="text-sm text-fb-accent font-medium hover:underline">
                 Check Status / Dev Options
               </button>
            </section>
          ) : (
            <section className="bg-fb-accent rounded-xl p-6 text-white shadow-lg">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="font-bold text-lg">Get Verified</h3>
               </div>
               <p className="text-sm opacity-90 mb-4">Become a Verified Member by providing your ID. Gain access to exclusive marketplace deals and the private lounge.</p>
               <button 
                 onClick={() => setShowVerifyModal(true)}
                 className="bg-white text-fb-accent w-full py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
               >
                 Verify Identity
               </button>
            </section>
          )}

        </div>

      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowVerifyModal(false)}>
           <div className="bg-fb-surface w-full max-w-lg rounded-xl border border-fb-border shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-fb-border flex justify-between items-center">
                 <h3 className="text-xl font-bold text-fb-text">ID Verification</h3>
                 <button onClick={() => setShowVerifyModal(false)} className="text-fb-textSec hover:text-fb-text">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              
              <div className="p-6 space-y-6">
                 {/* Upload Area */}
                 <div className="border-2 border-dashed border-fb-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-fb-hover/30 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-fb-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-fb-accent/20 transition-colors">
                       <svg className="w-6 h-6 text-fb-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <h4 className="text-fb-text font-bold mb-1">Upload Government ID</h4>
                    <p className="text-xs text-fb-textSec">PNG, JPG or PDF up to 10MB</p>
                 </div>

                 {/* Actions */}
                 <div className="flex gap-3">
                    <button 
                       onClick={() => setShowVerifyModal(false)}
                       className="flex-1 px-4 py-2 rounded-lg border border-fb-border text-fb-text font-medium hover:bg-fb-hover transition-colors"
                    >
                       Cancel
                    </button>
                    <button 
                       onClick={() => { setVerificationStatus('pending'); setShowVerifyModal(false); }}
                       className="flex-1 px-4 py-2 rounded-lg bg-fb-accent text-white font-bold hover:bg-fb-accentHover transition-colors shadow-lg shadow-fb-accent/20"
                    >
                       Submit for Review
                    </button>
                 </div>

                 {/* Dev Switch */}
                 <div className="pt-4 border-t border-fb-border">
                    <div className="flex items-center justify-between bg-fb-bg p-3 rounded-lg border border-fb-border">
                       <div>
                          <p className="text-sm font-bold text-fb-text">Dev Mode: Test Pending State</p>
                          <p className="text-[10px] text-fb-textSec">Toggle to simulate "Uploaded" state in dashboard</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={verificationStatus === 'pending'}
                            onChange={() => setVerificationStatus(prev => prev === 'pending' ? 'idle' : 'pending')}
                          />
                          <div className="w-11 h-6 bg-fb-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fb-green"></div>
                       </label>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
