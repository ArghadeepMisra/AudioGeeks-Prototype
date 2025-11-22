import React, { useState, useRef } from 'react';
import { MOCK_THREADS, MOCK_USERS } from '../constants';
import { IconLock, IconEdit, IconHeart, IconReply, IconSend, IconChevronLeft, IconChevronRight } from './Icons';
import { Thread } from '../types';

interface ForumViewProps {
  initialThreadId?: string | null;
  onProfileClick: (user: any) => void;
}

const ITEMS_PER_PAGE = 8;

const ForumView: React.FC<ForumViewProps> = ({ initialThreadId, onProfileClick }) => {
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(
    initialThreadId ? MOCK_THREADS.find(t => t.id === initialThreadId) || null : null
  );
  const [isCreating, setIsCreating] = useState(false);
  
  // Reply & Interaction State
  const [replyText, setReplyText] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  
  const categories = ['All', 'Rooms', 'Headphones', 'Amplifiers', 'IEMs', 'Source Gear'];

  const filteredThreads = filter === 'All' 
    ? MOCK_THREADS
    : filter === 'Rooms'
      ? MOCK_THREADS.filter(t => t.isPrivate)
      : MOCK_THREADS.filter(t => t.category === filter && !t.isPrivate);

  const totalPages = Math.ceil(filteredThreads.length / ITEMS_PER_PAGE);
  const paginatedThreads = filteredThreads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleLike = (postId: string) => {
      const newLikes = new Set(likedPosts);
      if (newLikes.has(postId)) {
          newLikes.delete(postId);
      } else {
          newLikes.add(postId);
      }
      setLikedPosts(newLikes);
  };

  const handleReply = (post: any) => {
      const quote = `> @${post.author.username} wrote:\n> ${post.content}\n\n`;
      setReplyText(prev => prev + quote);
      if (replyInputRef.current) {
          replyInputRef.current.focus();
          replyInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  };

  const handlePostReply = () => {
    if (!replyText.trim() || !selectedThread) return;

    const newPost = {
        id: `new_${Date.now()}`,
        author: MOCK_USERS[0], // Current user
        content: replyText,
        timestamp: 'Just now',
        images: []
    };

    const updatedThread = {
        ...selectedThread,
        posts: [...(selectedThread.posts || []), newPost],
        replies: (selectedThread.replies || 0) + 1,
        lastActivity: 'Just now'
    };

    // Update Local State
    setSelectedThread(updatedThread);
    setReplyText('');

    // Update Mock Data (Persistence for session)
    const threadIndex = MOCK_THREADS.findIndex(t => t.id === selectedThread.id);
    if (threadIndex > -1) {
        MOCK_THREADS[threadIndex] = updatedThread;
    }
  };

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
     const participants = Array.from(new Set(selectedThread.posts?.map(p => p.author.username) || []));

     return (
       <div className={`p-6 max-w-5xl mx-auto animate-fade-in ${selectedThread.isAdmin ? 'bg-fb-red/5 rounded-xl border border-fb-red/10' : ''}`}>
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
            
            {participants.length > 0 && (selectedThread.isAdmin || selectedThread.isPrivate) && (
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-fb-textSec uppercase">Participants:</span>
                    <div className="flex gap-2 flex-wrap">
                        {participants.map(name => (
                            <span key={name} className="text-[10px] font-bold text-fb-text uppercase bg-fb-bg px-2 py-0.5 rounded border border-fb-border">{name}</span>
                        ))}
                    </div>
                </div>
            )}
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
                       className={`text-sm font-bold cursor-pointer hover:underline ${post.author.badge === 'Admin' ? 'text-fb-gold' : 'text-fb-text'}`}
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
                     
                     {/* Action Bar */}
                     <div className="flex items-center gap-4 mt-4 pt-3 border-t border-fb-border">
                        <button 
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${likedPosts.has(post.id) ? 'text-fb-red' : 'text-fb-textSec hover:text-fb-red'}`}
                        >
                            <IconHeart className="w-4 h-4" filled={likedPosts.has(post.id)} />
                            {likedPosts.has(post.id) ? 'Liked' : 'Like'}
                        </button>
                        <button 
                            onClick={() => handleReply(post)}
                            className="flex items-center gap-1.5 text-xs font-bold text-fb-textSec hover:text-fb-accent transition-colors"
                        >
                            <IconReply className="w-4 h-4" />
                            Reply
                        </button>
                     </div>
                  </div>
               </div>
            )) : (
              <div className="text-center p-12 bg-fb-surface border border-fb-border border-dashed rounded-xl">
                 <p className="text-fb-textSec">No posts in this thread yet.</p>
              </div>
            )}
         </div>

         {/* Reply Section */}
         <div className="bg-fb-surface border border-fb-border rounded-xl p-6 mt-8">
            <h3 className="text-sm font-bold text-fb-text mb-4 flex items-center gap-2">
                <IconEdit className="w-4 h-4" /> Write a Reply
            </h3>
            <textarea
                ref={replyInputRef}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-32 bg-fb-bg border border-fb-border rounded-lg p-4 text-fb-text focus:border-fb-accent focus:outline-none mb-4 font-sans leading-relaxed"
                placeholder="Share your thoughts... (Quote text will appear here)"
            />
            <div className="flex justify-end">
                <button 
                    onClick={handlePostReply}
                    disabled={!replyText.trim()}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${!replyText.trim() ? 'bg-fb-border text-fb-textSec cursor-not-allowed' : 'bg-fb-accent hover:bg-fb-accentHover text-white'}`}
                >
                    <IconSend className="w-4 h-4" />
                    Post Reply
                </button>
            </div>
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
            onClick={() => { setFilter(cat); setCurrentPage(1); }}
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
        {paginatedThreads.length === 0 ? (
             <div className="p-8 text-center text-fb-textSec">No threads found in this category.</div>
        ) : (
            paginatedThreads.map((thread, index) => (
            <div 
                key={thread.id} 
                onClick={() => setSelectedThread(thread)}
                className={`p-4 hover:bg-fb-hover transition-colors group cursor-pointer ${
                index !== paginatedThreads.length - 1 ? 'border-b border-fb-border' : ''
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

      {/* Pagination Controls - Separated Row */}
      {filteredThreads.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-fb-surface border border-fb-border text-fb-textSec hover:bg-fb-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors shadow-sm ${
                      currentPage === page 
                        ? 'bg-fb-accent text-white' 
                        : 'bg-fb-surface border border-fb-border text-fb-text hover:bg-fb-hover'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-fb-surface border border-fb-border text-fb-textSec hover:bg-fb-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
            </div>
        )}
    </div>
  );
};

export default ForumView;