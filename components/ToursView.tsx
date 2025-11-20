import React, { useState } from 'react';
import { MOCK_TOURS } from '../constants';
import { IconInfo, IconMap } from './Icons';
import { Tour } from '../types';

interface ToursViewProps {
  onChangeView: (view: string, param?: string) => void;
}

const ToursView: React.FC<ToursViewProps> = ({ onChangeView }) => {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [region, setRegion] = useState('All');
  const [showApplyPopup, setShowApplyPopup] = useState(false);

  const handleToggleDetails = (id: string) => {
    setSelectedTourId(selectedTourId === id ? null : id);
  };

  const handleApply = () => {
    setShowApplyPopup(true);
    setTimeout(() => setShowApplyPopup(false), 3000);
  };

  const regions = ['All', 'North America', 'Europe', 'Asia'];

  const filteredTours = region === 'All' ? MOCK_TOURS : MOCK_TOURS.filter(t => t.region === region);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in relative">
      
      {/* Popup Notification */}
      {showApplyPopup && (
        <div className="fixed top-24 right-6 bg-fb-accent text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-bounce">
           <h4 className="font-bold text-lg">Application Received!</h4>
           <p className="text-sm opacity-90">You are now registered for the tour lottery.</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-fb-text">Equipment Tours</h2>
          <p className="text-fb-textSec text-sm">Try gear in your own home before you buy.</p>
        </div>
        <div className="flex items-center gap-2 bg-fb-surface border border-fb-border rounded-lg p-1">
           <IconMap className="w-5 h-5 text-fb-textSec ml-2" />
           <select 
             value={region} 
             onChange={(e) => setRegion(e.target.value)}
             className="bg-transparent text-fb-text text-sm font-medium p-2 focus:outline-none cursor-pointer"
           >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
           </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredTours.map(tour => (
          <div key={tour.id} className="bg-fb-surface rounded-xl border border-fb-border overflow-hidden flex flex-col shadow-sm">
            {/* Tour Header Card */}
            <div className="flex flex-col sm:flex-row">
                <div 
                  className="sm:w-1/3 h-48 sm:h-auto relative cursor-pointer group overflow-hidden"
                  onClick={() => tour.productId && onChangeView('marketplace', tour.productId)}
                >
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                      tour.status === 'Open' ? 'bg-fb-green text-white' : 
                      tour.status === 'In Progress' ? 'bg-fb-accent text-white' : 'bg-fb-textSec text-fb-bg'
                  }`}>
                      {tour.status}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-bold flex items-center gap-1">
                     Visit Product Page
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 
                      className="text-xl font-bold text-fb-text hover:text-fb-accent cursor-pointer"
                      onClick={() => tour.productId && onChangeView('marketplace', tour.productId)}
                    >
                      {tour.title}
                    </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                    <p className="text-fb-textSec text-[10px] uppercase tracking-wide font-bold">Equipment</p>
                    <p className="text-fb-text font-medium">{tour.equipmentName}</p>
                    </div>
                    <div>
                    <p className="text-fb-textSec text-[10px] uppercase tracking-wide font-bold">Host</p>
                    <div className="flex items-center gap-2">
                        <img src={tour.host.avatar} className="w-4 h-4 rounded-full" alt="" />
                        <p className="text-fb-text">{tour.host.username}</p>
                    </div>
                    </div>
                    <div>
                    <p className="text-fb-textSec text-[10px] uppercase tracking-wide font-bold">Region</p>
                    <p className="text-fb-text">{tour.region}</p>
                    </div>
                    <div>
                    <p className="text-fb-textSec text-[10px] uppercase tracking-wide font-bold">Slots</p>
                    <p className="text-fb-text">{tour.participants} / 20</p>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-fb-border flex gap-3">
                    <button 
                        onClick={() => handleToggleDetails(tour.id)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border border-fb-border hover:bg-fb-hover text-fb-text flex items-center justify-center gap-2 ${selectedTourId === tour.id ? 'bg-fb-hover' : ''}`}
                    >
                        <IconInfo className="w-4 h-4" />
                        {selectedTourId === tour.id ? 'Hide Details' : 'View Details & Impressions'}
                    </button>
                    <button 
                      onClick={handleApply}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm ${
                      tour.status === 'Open' 
                      ? 'bg-fb-accent hover:bg-fb-accentHover text-white' 
                      : 'bg-fb-hover text-fb-textSec cursor-not-allowed border border-fb-border'
                      }`}
                      disabled={tour.status !== 'Open'}
                    >
                      {tour.status === 'Open' ? 'Apply Now' : 'Closed'}
                    </button>
                </div>
                </div>
            </div>

            {/* Expanded Details Section */}
            {selectedTourId === tour.id && (
                <div className="bg-fb-bg border-t border-fb-border p-6 animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Gear Info */}
                        <div className="lg:col-span-1 space-y-4">
                            <h4 className="font-bold text-fb-text text-lg border-b border-fb-border pb-2">Technical Specs</h4>
                            <ul className="space-y-2">
                                {tour.specs.map((spec, i) => (
                                    <li key={i} className="flex justify-between text-sm">
                                        <span className="text-fb-textSec">{spec.label}</span>
                                        <span className="text-fb-text font-mono">{spec.value}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <h4 className="font-bold text-fb-text text-sm mb-2">Description</h4>
                                <p className="text-sm text-fb-textSec leading-relaxed">{tour.description}</p>
                            </div>
                        </div>

                        {/* Impressions / Reviews */}
                        <div className="lg:col-span-2">
                             <h4 className="font-bold text-fb-text text-lg border-b border-fb-border pb-2 mb-4">Community Impressions</h4>
                             <div className="space-y-4">
                                 {tour.impressions.length > 0 ? tour.impressions.map(imp => (
                                     <div key={imp.id} className="bg-fb-surface p-4 rounded-lg border border-fb-border">
                                         <div className="flex items-center justify-between mb-2">
                                             <div className="flex items-center gap-2">
                                                 <img src={imp.author.avatar} className="w-8 h-8 rounded-full" alt="" />
                                                 <div>
                                                     <p className="text-sm font-bold text-fb-text">{imp.author.username}</p>
                                                     <p className="text-[10px] text-fb-textSec">{imp.date}</p>
                                                 </div>
                                             </div>
                                         </div>
                                         <p className="text-sm text-fb-text leading-relaxed">"{imp.content}"</p>
                                     </div>
                                 )) : (
                                     <div className="text-center py-8 text-fb-textSec bg-fb-surface rounded-lg border border-fb-border border-dashed">
                                         No impressions yet. Be the first to share your thoughts!
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToursView;
