
import React, { useState } from 'react';
import { MOCK_REVIEWS } from '../constants';
import { IconSearch } from './Icons';
import { Review } from '../types';

interface ReviewViewProps {
  initialReviewId?: string | null;
  onBack?: () => void;
}

const ReviewView: React.FC<ReviewViewProps> = ({ initialReviewId, onBack }) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(
    initialReviewId ? MOCK_REVIEWS.find(r => r.id === initialReviewId) || null : null
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const categories = ['Headphones', 'DAC/Amp', 'Speakers', 'Accessories'];

  if (selectedReview) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-fade-in">
        <button onClick={() => setSelectedReview(null)} className="mb-6 text-fb-accent hover:underline flex items-center gap-2">
          ← Back to Reviews
        </button>
        
        <article className="bg-fb-surface border border-fb-border rounded-xl overflow-hidden">
          <img src={selectedReview.image} className="w-full h-80 object-cover" alt={selectedReview.productName} />
          <div className="p-8">
             <div className="flex items-center gap-2 mb-2">
                <span className="bg-fb-accent/10 text-fb-accent px-2 py-1 rounded text-xs font-bold uppercase">{selectedReview.category}</span>
             </div>
             <h1 className="text-4xl font-bold text-fb-text mb-2">{selectedReview.title}</h1>
             <h2 className="text-xl text-fb-textSec mb-6">{selectedReview.productName} Review</h2>
             
             <div className="flex items-center gap-3 mb-8 border-b border-fb-border pb-6">
                <img src={selectedReview.author.avatar} className="w-12 h-12 rounded-full" alt="" />
                <div>
                   <p className="font-bold text-fb-text">{selectedReview.author.username}</p>
                   <p className="text-xs text-fb-textSec">Published 2 days ago</p>
                </div>
             </div>

             <div className="prose prose-invert max-w-none text-fb-text leading-relaxed">
                <p>{selectedReview.snippet}</p>
                <p className="mt-4">{selectedReview.fullContent || "Full review content would go here. This allows the user to read the detailed breakdown of the sound signature, build quality, and value proposition."}</p>
                <h3 className="text-xl font-bold mt-6 mb-2">Sound Quality</h3>
                <p>The bass response is tight and controlled...</p>
             </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-fb-text">Reviews</h2>
            <p className="text-fb-textSec">In-depth analysis from the community.</p>
         </div>
         <div className="relative">
            <input type="text" placeholder="Search reviews..." className="bg-fb-surface border border-fb-border rounded-full py-2 pl-4 pr-10 text-fb-text" />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-textSec w-4 h-4" />
         </div>
      </div>

      {categories.map(cat => {
        const reviews = MOCK_REVIEWS.filter(r => r.category === cat || (cat === 'Headphones' && !r.category) ); // Fallback for mock data
        const displayReviews = expandedSection === cat ? reviews : reviews.slice(0, 4);
        
        if (reviews.length === 0) return null;

        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-center justify-between border-b border-fb-border pb-2">
               <h3 className="text-xl font-bold text-fb-text">{cat}</h3>
               {reviews.length > 4 && (
                 <button 
                    onClick={() => setExpandedSection(expandedSection === cat ? null : cat)}
                    className="text-fb-accent text-sm font-bold hover:underline"
                 >
                   {expandedSection === cat ? 'Collapse' : 'Expand'}
                 </button>
               )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {displayReviews.map(review => (
                 <div 
                   key={review.id} 
                   onClick={() => setSelectedReview(review)}
                   className="bg-fb-surface rounded-lg border border-fb-border overflow-hidden hover:border-fb-accent/50 transition-all cursor-pointer group"
                 >
                    <div className="h-48 overflow-hidden relative">
                       <img src={review.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={review.title} />
                    </div>
                    <div className="p-4">
                       <h4 className="font-bold text-fb-text leading-tight mb-1 group-hover:text-fb-accent">{review.title}</h4>
                       <p className="text-xs text-fb-textSec mb-3">{review.productName}</p>
                       <div className="flex items-center gap-2">
                          <img src={review.author.avatar} className="w-5 h-5 rounded-full" alt="" />
                          <span className="text-xs text-fb-textSec">{review.author.username}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ReviewView;
