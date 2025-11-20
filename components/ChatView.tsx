import React, { useState, useRef, useEffect } from 'react';
import { MOCK_DMS, MOCK_USERS } from '../constants';
import { IconSend, IconEdit } from './Icons';
import { DMConversation } from '../types';

const ChatView: React.FC = () => {
  const [activeDmId, setActiveDmId] = useState(MOCK_DMS[0].id);
  const [messageText, setMessageText] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  
  const activeConversation = MOCK_DMS.find(dm => dm.id === activeDmId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeDmId]);

  return (
    <div className="flex h-[calc(100vh-5rem)] animate-fade-in">
      {/* DM List Sidebar */}
      <div className="w-80 bg-fb-surface border-r border-fb-border hidden md:flex flex-col">
        <div className="p-4 border-b border-fb-border flex justify-between items-center">
          <h2 className="font-bold text-2xl text-fb-text">Chats</h2>
          <button 
            onClick={() => setShowCompose(true)}
            className="bg-fb-hover hover:bg-fb-border p-2 rounded-full transition-colors text-fb-text"
          >
            <IconEdit className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2">
           <input className="w-full bg-fb-bg border-none rounded-full px-4 py-2 text-sm text-fb-text focus:ring-1 ring-fb-accent" placeholder="Search Messenger" />
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {MOCK_DMS.map(dm => (
            <div 
              key={dm.id}
              onClick={() => setActiveDmId(dm.id)}
              className={`flex items-center gap-3 p-3 mx-2 rounded-lg cursor-pointer transition-colors ${activeDmId === dm.id ? 'bg-fb-accent/10' : 'hover:bg-fb-hover'}`}
            >
               <div className="relative">
                 <img src={dm.user.avatar} className="w-12 h-12 rounded-full" alt="" />
                 {dm.unreadCount > 0 && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-fb-accent border-2 border-fb-surface rounded-full"></div>}
               </div>
               <div className="flex-1 overflow-hidden">
                 <div className="flex justify-between items-baseline">
                   <span className="font-semibold text-fb-text truncate">{dm.user.username}</span>
                   <span className="text-[10px] text-fb-textSec whitespace-nowrap">{dm.timestamp}</span>
                 </div>
                 <div className={`text-sm truncate ${dm.unreadCount > 0 ? 'text-fb-text font-bold' : 'text-fb-textSec'}`}>
                   {dm.messages[dm.messages.length-1]?.isMe ? `You: ${dm.messages[dm.messages.length-1]?.content}` : dm.messages[dm.messages.length-1]?.content}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-fb-bg">
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="h-16 border-b border-fb-border flex items-center px-6 bg-fb-surface/90 backdrop-blur-md shadow-sm z-10">
              <div className="flex items-center gap-3">
                <img src={activeConversation.user.avatar} className="w-10 h-10 rounded-full" alt="" />
                <div>
                   <h2 className="font-bold text-fb-text">{activeConversation.user.username}</h2>
                   <p className="text-xs text-fb-textSec">Active Now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
               {activeConversation.messages.map(msg => (
                 <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.isMe ? 'bg-fb-accent text-white' : 'bg-fb-surface border border-fb-border text-fb-text'}`}>
                       {msg.content}
                    </div>
                 </div>
               ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-fb-surface border-t border-fb-border">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-fb-bg border border-fb-border rounded-full py-2.5 pl-4 pr-12 text-fb-text focus:outline-none focus:border-fb-accent"
                />
                <button className="p-2 text-fb-accent hover:bg-fb-hover rounded-full transition-colors">
                  <IconSend className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        ) : (
           <div className="flex-1 flex items-center justify-center text-fb-textSec">
             Select a chat to start messaging
           </div>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
           <div className="bg-fb-surface w-full max-w-md rounded-xl border border-fb-border shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-fb-border flex justify-between items-center">
                 <h3 className="font-bold text-fb-text text-center w-full">New Message</h3>
                 <button onClick={() => setShowCompose(false)} className="text-fb-accent hover:underline absolute right-4 text-sm">Cancel</button>
              </div>
              <div className="p-2 border-b border-fb-border">
                 <div className="flex items-center gap-2">
                    <span className="text-fb-textSec">To:</span>
                    <input autoFocus className="bg-transparent focus:outline-none text-fb-text flex-1 py-1" />
                 </div>
              </div>
              <div className="h-64 overflow-y-auto p-2">
                 <p className="text-xs text-fb-textSec px-2 mb-2 font-bold uppercase">Suggested</p>
                 {MOCK_USERS.filter(u => u.id !== 'u1').map(user => (
                    <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-fb-hover rounded-lg cursor-pointer">
                       <img src={user.avatar} className="w-10 h-10 rounded-full" alt="" />
                       <span className="text-fb-text font-medium">{user.username}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ChatView;
