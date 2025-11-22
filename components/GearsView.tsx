
import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../constants';
import { IconFilter, IconEdit, IconSearch } from './Icons';
import { Product } from '../types';

interface GearsViewProps {
  initialProductId?: string | null;
  searchQuery?: string;
}

const GearsView: React.FC<GearsViewProps> = ({ initialProductId, searchQuery = '' }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
     initialProductId ? MOCK_PRODUCTS.find(p => p.id === initialProductId) || null : null
  );
  const [filter, setFilter] = useState('All');
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setSelectedProduct(null);
    }
  }, [searchQuery]);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  const filters = ['All', 'Headphones', 'Amplifiers', 'DAC/Amp', 'Cables'];

  // Mock getting reviews for this product (in reality this would filter by ID)
  const productReviews = selectedProduct 
    ? MOCK_REVIEWS.filter(r => r.category === selectedProduct.category) 
    : [];

  if (selectedProduct) {
     return (
       <div className="p-6 max-w-6xl mx-auto animate-fade-in">
          <button onClick={() => setSelectedProduct(null)} className="mb-4 text-fb-accent hover:underline flex items-center gap-2">← Back to Gears</button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Product Details */}
             <div className="lg:col-span-2 space-y-6">
                <div className="bg-fb-surface p-8 rounded-xl border border-fb-border">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 flex items-center justify-center h-64">
                            <img src={selectedProduct.image} className="max-h-full max-w-full object-contain" alt={selectedProduct.name} />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col">
                            <span className="text-fb-accent font-bold uppercase text-sm mb-2">{selectedProduct.brand}</span>
                            <h1 className="text-3xl font-bold text-fb-text mb-4">{selectedProduct.name}</h1>
                            
                            <div className="mt-auto">
                                <button 
                                  onClick={() => setShowReviewModal(true)}
                                  className="w-full bg-fb-accent hover:bg-fb-accentHover text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                   <IconEdit className="w-4 h-4" /> Write a Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-fb-surface p-6 rounded-xl border border-fb-border">
                    <h2 className="text-xl font-bold text-fb-text mb-4">Description</h2>
                    <p className="text-fb-textSec leading-relaxed">
                        {selectedProduct.description || "Detailed description not available. This is a placeholder for the product description."}
                    </p>
                </div>

                <div className="bg-fb-surface p-6 rounded-xl border border-fb-border">
                    <h2 className="text-xl font-bold text-fb-text mb-4">Technical Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {selectedProduct.specs ? selectedProduct.specs.map((s, i) => (
                             <div key={i} className="flex justify-between border-b border-fb-border pb-2">
                                 <span className="text-fb-textSec">{s.label}</span>
                                 <span className="text-fb-text font-mono">{s.value}</span>
                             </div>
                         )) : <p className="text-fb-textSec italic">No specifications listed.</p>}
                    </div>
                </div>
             </div>

             {/* Reviews Sidebar */}
             <div className="lg:col-span-1 space-y-6">
                 <div className="bg-fb-surface p-6 rounded-xl border border-fb-border">
                     <h3 className="text-lg font-bold text-fb-text mb-4">Community Reviews</h3>
                     <div className="space-y-4">
                         {productReviews.length > 0 ? productReviews.map(review => (
                             <div key={review.id} className="border-b border-fb-border pb-4 last:border-0">
                                 <div className="flex items-center gap-2 mb-2">
                                     <img src={review.author.avatar} className="w-6 h-6 rounded-full" alt="" />
                                     <span className="text-sm font-bold text-fb-text">{review.author.username}</span>
                                 </div>
                                 <h4 className="font-bold text-sm text-fb-text mb-1">{review.title}</h4>
                                 <p className="text-xs text-fb-textSec line-clamp-3">"{review.snippet}"</p>
                             </div>
                         )) : (
                             <p className="text-fb-textSec text-sm text-center py-4">No reviews yet. Be the first!</p>
                         )}
                     </div>
                 </div>
             </div>
          </div>

          {showReviewModal && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
                  <div className="bg-fb-surface w-full max-w-lg rounded-xl border border-fb-border p-6">
                      <h2 className="text-2xl font-bold text-fb-text mb-4">Review {selectedProduct.name}</h2>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-fb-textSec mb-1">Title</label>
                              <input type="text" className="w-full bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text" placeholder="Summary of your experience" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-fb-textSec mb-1">Review</label>
                              <textarea className="w-full h-32 bg-fb-bg border border-fb-border rounded-lg p-3 text-fb-text" placeholder="Tell us what you think..."></textarea>
                          </div>
                          <div className="flex gap-4 pt-2">
                              <button onClick={() => setShowReviewModal(false)} className="flex-1 bg-fb-hover text-fb-text py-2 rounded-lg font-medium">Cancel</button>
                              <button onClick={() => setShowReviewModal(false)} className="flex-1 bg-fb-accent text-white py-2 rounded-lg font-medium">Submit Review</button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
       </div>
     )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-fb-text">Gears Database</h2>
          <p className="text-fb-textSec text-sm">Research equipment, read reviews, and share your experiences.</p>
        </div>
        {searchQuery && (
          <div className="flex items-center gap-2 bg-fb-accent/10 px-4 py-2 rounded-lg border border-fb-accent/20">
             <IconSearch className="w-4 h-4 text-fb-accent" />
             <span className="text-sm text-fb-text">Results for: <span className="font-bold text-white">{searchQuery}</span></span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
         <IconFilter className="w-5 h-5 text-fb-textSec mr-2" />
         {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                 filter === f ? 'bg-fb-text text-fb-bg border-fb-text' : 'bg-transparent text-fb-textSec border-fb-border hover:border-fb-text'
              }`}
            >
              {f}
            </button>
         ))}
      </div>

      {filteredProducts.length === 0 ? (
         <div className="bg-fb-surface border border-fb-border border-dashed rounded-xl p-12 text-center text-fb-textSec">
            <p className="text-lg">No gears found matching your criteria.</p>
            <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="bg-fb-surface rounded-xl border border-fb-border overflow-hidden hover:border-fb-accent/50 transition-all group flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-white">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] text-white px-2 py-1 rounded">
                  {product.category}
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-[10px] text-fb-accent font-bold uppercase tracking-wider mb-1">{product.brand}</div>
                <h3 className="text-lg font-semibold text-fb-text leading-tight mb-2">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GearsView;
