
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_DMS, MOCK_USERS } from '../constants';
import { IconSend, IconEdit, IconHeart, IconReply } from './Icons';
import { DMConversation, ChatMessage } from '../types';

const ChatView: React.FC = () => {
  const [conversations, setConversations] = useState<DMConversation[]>(MOCK_DMS);
  const [activeDmId, setActiveDmId] = useState(MOCK_DMS[0].id);
  const [messageText, setMessageText] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  
  const activeConversation = conversations.find(dm => dm.id === activeDmId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentUser = MOCK_USERS[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation?.messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;

    const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sender: currentUser,
        content: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
    };

    const updatedConversations = conversations.map(dm => {
        if (dm.id === activeDmId) {
            const updatedDm = {
                ...dm,
                lastMessage: `You: ${messageText}`,
                timestamp: 'Just now',
                messages: [...dm.messages, newMessage]
            };
            // Update the mock source for persistence across view changes
            const mockIndex = MOCK_DMS.findIndex(m => m.id === dm.id);
            if (mockIndex >= 0) MOCK_DMS[mockIndex] = updatedDm;
            
            return updatedDm;
        }
        return dm;
    });

    setConversations(updatedConversations);
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleLike = (msgId: string) => {
    setLikedMessages(prev => {
        const newSet = new Set(prev);
        if (newSet.has(msgId)) newSet.delete(msgId);
        else newSet.add(msgId);
        return newSet;
    });
  };

  const handleReply = (msg: ChatMessage) => {
    const quote = `> @${msg.sender.username} wrote: "${msg.content}"\n\n`;
    setMessageText(prev => prev + quote);
    inputRef.current?.focus();
  };

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
          {conversations.map(dm => (
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
                   {dm.lastMessage}
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
                    <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line group relative transition-all ${msg.isMe ? 'bg-fb-accent text-white' : 'bg-fb-surface border border-fb-border text-fb-text'}`}>
                       <div>{msg.content}</div>
                       
                       {/* Message Actions - Only for received messages */}
                       {!msg.isMe && (
                           <div className="flex items-center gap-3 mt-2 pt-2 border-t border-fb-border">
                               <button 
                                    onClick={() => toggleLike(msg.id)}
                                    className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${
                                        likedMessages.has(msg.id) 
                                            ? 'text-fb-red' 
                                            : 'text-fb-textSec hover:text-fb-text'
                                    }`}
                               >
                                    <IconHeart className="w-3 h-3" filled={likedMessages.has(msg.id)} />
                                    {likedMessages.has(msg.id) ? 'Liked' : 'Like'}
                               </button>
                               <button 
                                    onClick={() => handleReply(msg)}
                                    className="flex items-center gap-1 text-[10px] font-bold transition-colors text-fb-textSec hover:text-fb-text"
                               >
                                    <IconReply className="w-3 h-3" />
                                    Reply
                               </button>
                           </div>
                       )}
                    </div>
                 </div>
               ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-fb-surface border-t border-fb-border">
              <div className="relative flex items-end gap-2 bg-fb-bg border border-fb-border rounded-3xl px-4 py-2 focus-within:border-fb-accent transition-colors">
                <textarea
                  ref={inputRef}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-fb-text focus:outline-none resize-none py-2 max-h-32 text-sm"
                  rows={1}
                  style={{ minHeight: '40px' }}
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className={`p-2 rounded-full mb-1 transition-colors ${!messageText.trim() ? 'text-fb-textSec cursor-not-allowed' : 'text-fb-accent hover:bg-fb-hover'}`}
                >
                  <IconSend className="w-6 h-6" />
                </button>
              </div>
              <div className="text-[10px] text-fb-textSec mt-2 text-center">
                  Press Enter to send, Shift + Enter for new line
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
