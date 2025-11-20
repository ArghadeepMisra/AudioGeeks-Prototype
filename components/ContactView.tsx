
import React, { useState } from 'react';
import { IconSend } from './Icons';

const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] animate-fade-in p-6">
         <div className="w-16 h-16 bg-fb-green rounded-full flex items-center justify-center mb-6 shadow-lg shadow-fb-green/20">
             <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
             </svg>
         </div>
         <h2 className="text-3xl font-bold text-fb-text mb-2">Message Sent!</h2>
         <p className="text-fb-textSec text-center max-w-md">Thank you for contacting Audio Geeks. Our administration team will get back to you shortly.</p>
         <button onClick={() => setSubmitted(false)} className="mt-8 text-fb-accent font-bold hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="text-center mb-10">
         <h1 className="text-3xl font-bold text-fb-text mb-2">Contact Us</h1>
         <p className="text-fb-textSec">Have questions about the community, marketplace, or premium memberships? We're here to help.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-fb-surface p-8 rounded-xl border border-fb-border shadow-lg space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-bold text-fb-text mb-2">Name</label>
               <input required type="text" className="w-full bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text focus:border-fb-accent outline-none transition-colors" placeholder="Your Name" />
            </div>
            <div>
               <label className="block text-sm font-bold text-fb-text mb-2">Email</label>
               <input required type="email" className="w-full bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text focus:border-fb-accent outline-none transition-colors" placeholder="your@email.com" />
            </div>
         </div>

         <div>
             <label className="block text-sm font-bold text-fb-text mb-2">Subject</label>
             <select className="w-full bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text focus:border-fb-accent outline-none transition-colors">
                 <option>General Inquiry</option>
                 <option>Account Issue</option>
                 <option>Report a User/Post</option>
                 <option>Marketplace Dispute</option>
                 <option>Advertising</option>
             </select>
         </div>

         <div>
            <label className="block text-sm font-bold text-fb-text mb-2">Message</label>
            <textarea required className="w-full h-40 bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text focus:border-fb-accent outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
         </div>

         <button type="submit" className="w-full bg-fb-accent hover:bg-fb-accentHover text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-fb-accent/25 flex items-center justify-center gap-2">
            <IconSend className="w-5 h-5" />
            Send Message
         </button>
      </form>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
              <h3 className="font-bold text-fb-text mb-1">Email</h3>
              <p className="text-fb-textSec text-sm">support@audiogeeks.com</p>
          </div>
          <div className="p-4">
              <h3 className="font-bold text-fb-text mb-1">Discord</h3>
              <p className="text-fb-textSec text-sm">Join our Discord Server</p>
          </div>
          <div className="p-4">
              <h3 className="font-bold text-fb-text mb-1">Headquarters</h3>
              <p className="text-fb-textSec text-sm">New York, NY</p>
          </div>
      </div>
    </div>
  );
};

export default ContactView;
