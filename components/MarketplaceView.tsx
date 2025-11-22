
import React, { useState } from 'react';
import { MOCK_PRODUCTS, MOCK_PREOWNED } from '../constants';
import { IconFilter } from './Icons';
import { Product } from '../types';

interface MarketplaceViewProps {
  initialProductId?: string | null;
}

const MarketplaceView: React.FC<MarketplaceViewProps> = ({ initialProductId }) => {
  const [viewMode, setViewMode] = useState<'retail' | 'preowned'>('retail');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
     initialProductId ? [...MOCK_PRODUCTS, ...MOCK_PREOWNED].find(p => p.id === initialProductId) || null : null
  );
  const [filter, setFilter] = useState('All');

  const allProducts = viewMode === 'retail' ? MOCK_PRODUCTS : MOCK_PREOWNED;
  const filteredProducts = filter === 'All' ? allProducts : allProducts.filter(p => p.category === filter);

  const filters = ['All', 'Headphones', 'Amplifiers', 'DAC/Amp', 'Cables'];

  if (selectedProduct) {
     return (
       <div className="p-6 max-w-6xl mx-auto animate-fade-in">
          <button onClick={() => setSelectedProduct(null)} className="mb-4 text-fb-accent hover:underline flex items-center gap-2">← Back to Marketplace</button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-fb-surface p-8 rounded-xl border border-fb-border">
             <div className="h-96 bg-white rounded-lg overflow-hidden p-8 flex items-center justify-center">
               <img src={selectedProduct.image} className="max-h-full max-w-full object-contain" alt={selectedProduct.name} />
             </div>
             <div className="flex flex-col">
                <div className="mb-auto">
                  <h2 className="text-sm font-bold text-fb-accent uppercase tracking-wider mb-2">{selectedProduct.brand}</h2>
                  <h1 className="text-4xl font-bold text-fb-text mb-4">{selectedProduct.name}</h1>
                  <div className="text-3xl font-bold text-fb-text mb-6">${selectedProduct.price.toLocaleString()}</div>
                  
                  <div className="bg-fb-bg rounded-lg p-4 mb-6 border border-fb-border">
                     <h3 className="font-bold text-fb-text mb-2 text-sm">Specifications</h3>
                     <div className="grid grid-cols-2 gap-y-2 text-sm">
                        {selectedProduct.specs ? selectedProduct.specs.map((s, i) => (
                           <React.Fragment key={i}>
                             <span className="text-fb-textSec">{s.label}</span>
                             <span className="text-fb-text font-mono text-right">{s.value}</span>
                           </React.Fragment>
                        )) : (
                          <span className="text-fb-textSec italic">Specs not available</span>
                        )}
                     </div>
                  </div>

                  <p className="text-fb-textSec leading-relaxed mb-8">
                    {selectedProduct.description || "Experience high-fidelity audio with this premium equipment. Designed for the discerning audiophile who values clarity, soundstage, and tonal accuracy."}
                  </p>
                </div>

                <a 
                   href={selectedProduct.affiliateLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full bg-fb-accent hover:bg-fb-accentHover text-white text-center py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-fb-accent/25 block"
                >
                   {selectedProduct.seller ? 'Contact Seller' : 'Check Price & Buy'}
                </a>
             </div>
          </div>
       </div>
     )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-fb-text">Marketplace</h2>
          <p className="text-fb-textSec text-sm">Find your next gear upgrade.</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="bg-fb-surface p-1 rounded-lg border border-fb-border flex">
           <button 
             onClick={() => setViewMode('retail')}
             className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'retail' ? 'bg-fb-accent text-white shadow' : 'text-fb-textSec hover:text-fb-text'}`}
           >
             Retail / Deals
           </button>
           <button 
             onClick={() => setViewMode('preowned')}
             className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'preowned' ? 'bg-fb-accent text-white shadow' : 'text-fb-textSec hover:text-fb-text'}`}
           >
             Pre-Owned
           </button>
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => setSelectedProduct(product)}
            className="bg-fb-surface rounded-xl border border-fb-border overflow-hidden hover:border-fb-accent/50 transition-all group flex flex-col h-full cursor-pointer"
          >
            <div className="relative h-56 overflow-hidden bg-white">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              />
              {viewMode === 'preowned' && (
                 <div className="absolute top-2 right-2 bg-fb-surface/90 backdrop-blur-sm text-[10px] font-bold text-fb-text px-2 py-1 rounded border border-fb-border">
                   {product.condition}
                 </div>
              )}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] text-white px-2 py-1 rounded">
                {product.category}
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-[10px] text-fb-accent font-bold uppercase tracking-wider mb-1">{product.brand}</div>
              <h3 className="text-lg font-semibold text-fb-text leading-tight mb-2">{product.name}</h3>
              
              {viewMode === 'preowned' && (
                <div className="flex items-center gap-2 mb-4">
                   <img src={product.seller?.avatar} className="w-5 h-5 rounded-full" alt="" />
                   <span className="text-xs text-fb-textSec">Sold by {product.seller?.username}</span>
                </div>
              )}
              
              <div className={`mt-auto pt-4 border-t border-fb-border flex items-center justify-between ${viewMode === 'retail' ? 'mt-auto' : ''}`}>
                <div className="font-sans text-xl font-bold text-fb-text">
                  ${product.price.toLocaleString()}
                </div>
                <button className="bg-fb-hover hover:bg-fb-border text-fb-text px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  {viewMode === 'retail' ? 'Buy Now' : 'Contact'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceView;
