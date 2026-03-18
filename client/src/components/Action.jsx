import { Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback.jsx";

export function Action({ action }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  function toggleDescription() {
    if (isExpanded === true) {
        setIsExpanded(false);
    } else {
        setIsExpanded(true);
    }
    }


  // Funkcie pre Lightbox
  const openLightbox = (index) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % action.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + action.images.length) % action.images.length);
  };

  return (
    <div className="bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-violet/50">
      <div className="p-8 md:p-10">
        {/* Hlavička akcie */}
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-0">
            {action.title}
          </h2>
          <div className="self-end md:self-auto inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400/20 to-fuchsia-400/20 backdrop-blur-sm rounded-full border border-purple-300/30">
            <Calendar className="w-4 h-4 text-[#81007f]" />
            <span className="text-sm font-medium text-gray-700">{action.date}</span>
          </div>
        </div>

        {/* Popis akcie s funkciou Zobraziť viac */}
        <div className="mb-8">
          <p className={`text-gray-700 text-sm leading-relaxed ${!isExpanded ? "line-clamp-4" : ""}`}>
            {action.description}
          </p>
          <button
            onClick={toggleDescription}
            className="mt-2 text-[#81007f] font-bold text-sm hover:underline transition-all"
          >
            {isExpanded ? "Zobraziť menej" : "zobraziť viac"}
          </button>
        </div>

        {/* Galéria obrázkov */}
    
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {action.images.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <ImageWithFallback
                src={image}
                alt={`${action.title} - fotka ${index + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

        {/* --- LIGHTBOX (Modálne okno) --- */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Tlačidlo zavrieť */}
          <button className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors z-[110]">
            <X size={40} />
          </button>

          {/* Šípka vľavo */}
          <button 
            onClick={prevImage}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Aktuálny obrázok v Lightboxe */}
          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={action.images[activeImageIndex]} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              alt="Detail"
            />
            <div className="absolute -bottom-10 left-0 right-0 text-center text-white font-medium">
              Fotka {activeImageIndex + 1} z {action.images.length}
            </div>
          </div>

          {/* Šípka vpravo */}
          <button 
            onClick={nextImage}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}

    </div>
  );
}