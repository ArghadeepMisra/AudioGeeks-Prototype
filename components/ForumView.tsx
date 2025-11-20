import React, { useState } from 'react';
import { MOCK_THREADS, MOCK_USERS } from '../constants';
import { IconLock, IconEdit } from './Icons';
import { Thread } from '../types';

interface ForumViewProps {
  initialThreadId?: string | null;
  onProfileClick: (user: any) => void;
}

const ForumView: React.FC<ForumViewProps> = ({ initialThreadId, onProfileClick }) => {
  const [filter, setFilter] = useState('All');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(
    initialThreadId ? MOCK_THREADS.find(t => t.id === initialThreadId) || null : null
  );
  const [isCreating, setIsCreating] = useState(false);
  
  const categories = ['All', 'Rooms', 'Headphones', 'Amplifiers', 'IEMs', 'Source Gear'];

  const filteredThreads = filter === 'All' 
    ? MOCK_THREADS
    : filter === 'Rooms'
      ? MOCK_THREADS.filter(t => t.isPrivate)
      : MOCK_THREADS.filter(t => t.category === filter && !t.isPrivate);

  if (isCreating) {
    return (
      <div className="p-6 max-w-3xl mx-auto animate-fade-in">
        <button onClick={() => setIsCreating(false)} className="mb-4 text-fb-textSec hover:text-fb-text">Cancel</button>
        <div className="bg-fb-surface p-6 rounded-xl border border-fb-border">
           <h2 className="text-2xl font-bold text-fb-text mb-6">Create New Discussion</h2>
           <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-fb-textSec mb-1">Title</label>
                <input type="text" className="w-full bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text" placeholder="e.g., Review of the new ZMF Bokeh" />
              </div>
              <div>
                <label className="block text-sm font-medium text-fb-textSec mb-1">Category</label>
                <select className="w-full bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text">
                   {categories.filter(c => c !== 'All' && c !== 'Rooms').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-fb-textSec mb-1">Content</label>
                <textarea className="w-full h-64 bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text" placeholder="Write your thoughts here..."></textarea>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => setIsCreating(false)} className="bg-fb-accent text-white px-6 py-2 rounded-lg font-bold hover:bg-fb-accentHover">
                   Post Thread
                </button>
              </div>
           </div>
        </div>
      </div>
    )
  }

  if (selectedThread) {
     return (
       <div className="p-6 max-w-5xl mx-auto animate-fade-in">
         <button onClick={() => setSelectedThread(null)} className="mb-4 text-fb-accent hover:underline">← Back to Forum</button>
         
         {/* Thread Header */}
         <div className="mb-8 border-b border-fb-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-fb-hover px-2 py-1 rounded text-xs text-fb-textSec">{selectedThread.category}</span>
              {selectedThread.isPrivate && <span className="bg-fb-red/20 text-fb-red px-2 py-1 rounded text-xs border border-fb-red/30 flex items-center gap-1"><IconLock className="w-3 h-3"/> Restricted</span>}
            </div>
            <h1 className="text-3xl font-bold text-fb-text mb-4">{selectedThread.title}</h1>
            <div className="flex items-center gap-2">
               <img src={selectedThread.author.avatar} className="w-6 h-6 rounded-full" alt="" />
               <span className="text-fb-text font-medium">{selectedThread.author.username}</span>
               <span className="text-fb-textSec text-sm">• {selectedThread.lastActivity}</span>
            </div>
         </div>

         {/* Posts */}
         <div className="space-y-6">
            {(selectedThread.posts || []).length > 0 ? selectedThread.posts?.map((post) => (
               <div key={post.id} className="bg-fb-surface border border-fb-border rounded-xl p-6 flex gap-4">
                  <div className="flex flex-col items-center gap-2 min-w-[80px]">
                     <img 
                       src={post.author.avatar} 
                       onClick={() => onProfileClick(post.author)}
                       className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 ring-fb-accent transition-all" 
                       alt={post.author.username} 
                     />
                     <span 
                       className={`text-sm font-bold cursor-pointer hover:underline ${post.author.badge === 'Admin' ? 'text-[#FFD700]' : 'text-fb-text'}`}
                       onClick={() => onProfileClick(post.author)}
                     >
                       {post.author.username}
                     </span>
                     {post.author.badge && <span className="text-[10px] border border-fb-border px-1 rounded text-fb-textSec">{post.author.badge}</span>}
                  </div>
                  <div className="flex-1">
                     <div className="text-xs text-fb-textSec mb-2">{post.timestamp}</div>
                     <p className="text-fb-text leading-relaxed whitespace-pre-line">{post.content}</p>
                     {post.images && post.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-4">
                           {post.images.map((img, idx) => (
                              <img key={idx} src={img} className="rounded-lg border border-fb-border max-h-64 object-cover" alt="Attachment" />
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            )) : (
              <div className="text-center p-12 bg-fb-surface border border-fb-border border-dashed rounded-xl">
                 <p className="text-fb-textSec mb-4">This is a restricted area or contains no public posts.</p>
                 {selectedThread.isAdmin && (
                    <div className="flex justify-center gap-4">
                       <div className="w-32 p-4 bg-fb-bg border border-fb-border rounded flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-fb-green mb-2"></div>
                          <span className="text-xs font-bold text-fb-text">Access Granted</span>
                       </div>
                    </div>
                 )}
              </div>
            )}
         </div>
       </div>
     )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-fb-text">Community Forum</h2>
          <p className="text-fb-textSec text-sm">Discuss gear, music, and technical theory.</p>
        </div>
        <button onClick={() => setIsCreating(true)} className="bg-fb-accent hover:bg-fb-accentHover text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <IconEdit className="w-4 h-4" /> Create Post
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-fb-border">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              filter === cat 
                ? 'bg-fb-accent/10 text-fb-accent' 
                : 'bg-transparent text-fb-textSec hover:bg-fb-hover hover:text-fb-text'
            }`}
          >
            {cat === 'Rooms' && <IconLock className="w-3 h-3" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Thread List */}
      <div className="bg-fb-surface rounded-xl border border-fb-border shadow-sm overflow-hidden min-h-[400px]">
        {filteredThreads.length === 0 ? (
             <div className="p-8 text-center text-fb-textSec">No threads found in this category.</div>
        ) : (
            filteredThreads.map((thread, index) => (
            <div 
                key={thread.id} 
                onClick={() => setSelectedThread(thread)}
                className={`p-4 hover:bg-fb-hover transition-colors group cursor-pointer ${
                index !== filteredThreads.length - 1 ? 'border-b border-fb-border' : ''
                }`}
            >
                <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                    {thread.isAdmin ? (
                        <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30 flex items-center gap-1">
                           <IconLock className="w-2 h-2" /> Admin Only
                        </span>
                    ) : thread.isPrivate ? (
                        <span className="text-[10px] bg-fb-accent/20 text-fb-accent px-1.5 py-0.5 rounded border border-fb-accent/30 flex items-center gap-1">
                           <IconLock className="w-2 h-2" /> Private
                        </span>
                    ) : null}
                    {thread.isPinned && (
                        <span className="text-[10px] bg-fb-textSec/20 text-fb-text px-1.5 py-0.5 rounded border border-fb-border">Pinned</span>
                    )}
                    <span className="text-[10px] text-fb-textSec bg-fb-bg px-2 py-0.5 rounded-full border border-fb-border">{thread.category}</span>
                    </div>
                    <h3 className="text-lg font-medium text-fb-text group-hover:text-fb-accent transition-colors">
                    {thread.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-fb-textSec">
                    <div className="flex items-center gap-1 z-10" onClick={(e) => { e.stopPropagation(); onProfileClick(thread.author); }}>
                        <img src={thread.author.avatar} alt={thread.author.username} className="w-4 h-4 rounded-full hover:opacity-80" />
                        <span className="text-fb-textSec hover:text-fb-text hover:underline">{thread.author.username}</span>
                    </div>
                    <span>•</span>
                    <span>{thread.lastActivity}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 text-fb-textSec text-sm hidden sm:flex">
                   {thread.isAdmin ? (
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1 text-fb-green bg-fb-green/10 px-2 py-1 rounded border border-fb-green/20">
                            <span className="w-2 h-2 rounded-full bg-fb-green"></span>
                            <span className="text-[10px] font-bold">Access</span>
                         </div>
                         <div className="flex items-center gap-1 text-fb-red bg-fb-red/10 px-2 py-1 rounded border border-fb-red/20">
                            <span className="w-2 h-2 rounded-full bg-fb-red"></span>
                            <span className="text-[10px] font-bold">No Access</span>
                         </div>
                      </div>
                   ) : (
                     <>
                        <div className="flex flex-col items-center w-16">
                        <span className="font-semibold text-fb-text">{thread.replies}</span>
                        <span className="text-[10px]">Replies</span>
                        </div>
                        <div className="flex flex-col items-center w-16">
                        <span className="font-semibold text-fb-text">{thread.views >= 1000 ? `${(thread.views/1000).toFixed(1)}k` : thread.views}</span>
                        <span className="text-[10px]">Views</span>
                        </div>
                     </>
                   )}
                </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ForumView;
