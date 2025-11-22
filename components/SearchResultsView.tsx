
import React from 'react';
import { MOCK_PRODUCTS, MOCK_THREADS, MOCK_USERS } from '../constants';
import { IconUsers, IconMessageSquare, IconShoppingBag, IconSearch } from './Icons';
import { ViewState, User } from '../types';

interface SearchResultsViewProps {
  query: string;
  onNavigate: (view: ViewState, param?: string) => void;
  onProfileClick: (user: User) => void;
}

const SearchResultsView: React.FC<SearchResultsViewProps> = ({ query, onNavigate, onProfileClick }) => {
  const lowerQuery = query.toLowerCase();

  const products = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery)
  );

  const threads = MOCK_THREADS.filter(t =>
    t.title.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    t.category.toLowerCase().includes(lowerQuery)
  );

  const users = MOCK_USERS.filter(u =>
    u.username.toLowerCase().includes(lowerQuery) ||
    (u.bio && u.bio.toLowerCase().includes(lowerQuery))
  );

  if (!query) return (
    <div className="p-12 flex flex-col items-center justify-center text-fb-textSec animate-fade-in">
        <IconSearch className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg">Start typing to search Audio Geeks</p>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
       <div className="flex items-center gap-3 mb-8 border-b border-fb-border pb-6">
          <div className="p-3 bg-fb-accent/10 rounded-full">
            <IconSearch className="w-6 h-6 text-fb-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-fb-text">Search Results</h2>
            <p className="text-fb-textSec text-sm">Found matches for <span className="text-fb-text font-bold">"{query}"</span></p>
          </div>
       </div>

       {/* Users Section */}
       {users.length > 0 && (
         <section>
           <h3 className="text-lg font-bold text-fb-text mb-4 flex items-center gap-2">
             <IconUsers className="w-5 h-5 text-fb-accent" /> People
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {users.map(user => (
               <div key={user.id} onClick={() => onProfileClick(user)} className="bg-fb-surface p-4 rounded-xl border border-fb-border flex items-center gap-4 cursor-pointer hover:bg-fb-hover transition-colors shadow-sm">
                  <img src={user.avatar} className="w-12 h-12 rounded-full" alt={user.username} />
                  <div>
                    <h4 className="font-bold text-fb-text flex items-center gap-1">
                        {user.username}
                        {user.badge && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            user.badge === 'Admin' 
                              ? 'bg-fb-gold/20 text-fb-gold border-fb-gold/20' 
                              : 'bg-fb-accent/20 text-fb-accent border-fb-accent/20'
                          }`}>
                            {user.badge}
                          </span>
                        )}
                    </h4>
                    <p className="text-xs text-fb-textSec line-clamp-1">{user.bio || 'Member'}</p>
                  </div>
               </div>
             ))}
           </div>
         </section>
       )}

       {/* Threads Section */}
       {threads.length > 0 && (
         <section>
           <h3 className="text-lg font-bold text-fb-text mb-4 flex items-center gap-2">
             <IconMessageSquare className="w-5 h-5 text-fb-accent" /> Discussions
           </h3>
           <div className="space-y-2">
              {threads.map(thread => (
                <div key={thread.id} onClick={() => onNavigate('forum', thread.id)} className="bg-fb-surface p-4 rounded-xl border border-fb-border hover:bg-fb-hover transition-colors cursor-pointer shadow-sm">
                   <div className="flex justify-between items-start">
                       <div>
                            <h4 className="text-fb-text font-medium mb-1 text-lg">{thread.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-fb-textSec">
                                <span className="bg-fb-bg px-2 py-0.5 rounded border border-fb-border">{thread.category}</span>
                                <span>•</span>
                                <span>Posted by {thread.author.username}</span>
                                <span>•</span>
                                <span>{thread.lastActivity}</span>
                            </div>
                       </div>
                       <div className="text-right hidden sm:block">
                           <div className="text-fb-text font-bold">{thread.replies}</div>
                           <div className="text-xs text-fb-textSec">replies</div>
                       </div>
                   </div>
                </div>
              ))}
           </div>
         </section>
       )}

       {/* Gears Section */}
       {products.length > 0 && (
         <section>
           <h3 className="text-lg font-bold text-fb-text mb-4 flex items-center gap-2">
             <IconShoppingBag className="w-5 h-5 text-fb-accent" /> Gears
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <div key={product.id} onClick={() => onNavigate('gears', product.id)} className="bg-fb-surface rounded-xl border border-fb-border overflow-hidden hover:border-fb-accent/50 cursor-pointer transition-all group flex flex-col h-full cursor-pointer"
                >
                    <div className="h-32 p-4 bg-white flex items-center justify-center relative">
                       <img src={product.image} className="max-h-full max-w-full object-contain" alt={product.name} />
                       <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] text-white px-2 py-1 rounded">
                            {product.category}
                       </div>
                    </div>
                    <div className="p-4">
                       <div className="text-[10px] text-fb-accent font-bold uppercase mb-1">{product.brand}</div>
                       <div className="font-bold text-fb-text text-sm truncate mb-2">{product.name}</div>
                    </div>
                </div>
              ))}
           </div>
         </section>
       )}

       {users.length === 0 && threads.length === 0 && products.length === 0 && (
          <div className="text-center py-16 bg-fb-surface border border-fb-border border-dashed rounded-xl">
             <p className="text-fb-text font-bold text-lg mb-2">No results found</p>
             <p className="text-fb-textSec">We couldn't find anything matching "{query}" in our database.</p>
          </div>
       )}
    </div>
  );
};

export default SearchResultsView;
