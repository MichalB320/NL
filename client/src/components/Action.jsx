import { Calendar, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { ImageWithFallback } from "../figma/ImageWithFallback.jsx";
import GalleryStack from "./GalleryStack.jsx";

export function Action({ action }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  function toggleDescription() {
    setIsExpanded(!isExpanded);
  }

  const openLightbox = (index) => {
    setIsImageLoading(true); // Pri otvorení začneme načítavať
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    setIsImageLoading(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setIsImageLoading(true);
    setActiveImageIndex((prev) => (prev + 1) % action.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setIsImageLoading(true);
    setActiveImageIndex((prev) => (prev - 1 + action.images.length) % action.images.length);
  };

  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeImageIndex]);

  return (
    <div className="bg-white/70 rounded-3xl overflow-hidden shadow-lg border border-violet/50">
      <div className="p-8 md:p-10 flex flex-col lg:flex-row lg:gap-15 items-center lg:items-start">
        <div className="flex-1 w-full">
        {/* Hlavička akcie */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-0 sm:max-w-[72%]">
            {action.title}
          </h2>
          <div className="self-end md:self-auto inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400/20 to-fuchsia-400/20 backdrop-blur-sm rounded-full border border-purple-300/30">
            <Calendar className="w-4 h-4 text-[#81007f]" />
            <span className="text-sm font-medium text-gray-700">{action.date}</span>
          </div>
        </div>

        {/* Popis akcie s funkciou Zobraziť viac */}
        <div className="mb-8">
          <p className={`text-justify text-gray-700 text-sm leading-relaxed ${!isExpanded ? "line-clamp-4 lg:line-clamp-none" : "lg:line-clamp-none"}`} dangerouslySetInnerHTML={{ __html: action.description }}>
            
          </p>
          <button onClick={toggleDescription} className="lg:hidden mt-2 text-[#81007f] font-bold text-sm hover:underline">
            {isExpanded ? "Zobraziť menej" : "zobraziť viac"}
          </button>
        </div>
        </div>

      {/*<GalleryStack images={action.images} onOpenLightbox={(index) => openLightbox(index)} />*/}
        {/* Galéria ako balíček fotiek */}
        <div className="flex-shrink-0 flex justify-center pt-10 md:py-10 pr-5 md:pr-12"> 
          <div onClick={() => openLightbox(0)} className="relative w-44 h-44 md:w-80 md:h-[400px] cursor-pointer group">
            {action.images.slice(0, 3).map((image, index) => (
              <div key={index} className="absolute inset-0 transition-all duration-500 ease-out shadow-xl rounded-2xl overflow-hidden border-1 border-violet/50" style={{
                // Posun a rotácia pre efekt naskladaných kariet
                transform: `translateX(${index * 10}px) translateY(${index * -8}px) rotate(${index * 2}deg)`,
                // Nižšie indexy sú pod vrchnou fotkou
                zIndex: 30 - index,
                // Jemné stmavenie spodných fotiek pre hĺbku
                filter: index > 0 ? `brightness(${100 - index * 15}%)` : "none",
              }}>
        
                <ImageWithFallback src={image} className="w-full h-full object-cover transition-transform duration-700" alt={`Náhľad ${index + 1}`}/>
        
                {/* Na poslednej (spodnej) viditeľnej fotke ukážeme počet zvyšných fotiek */}
                {index === Math.min(action.images.length - 1, 2) && action.images.length > 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl">
                    + {action.images.length - 3}
                  </div>
               )}
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* --- LIGHTBOX CEZ PORTÁL --- */}
      {activeImageIndex !== null && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Tlačidlo zavrieť */}
          <button className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors z-[10000]">
            <X size={40} />
          </button>

          {/* Šípky */}
          {action.images.length > 1 && (
            <button onClick={prevImage} className="absolute left-4 p-2 text-white/50 hover:text-white transition-all z-[10000]">
              <ChevronLeft size={60} />
            </button>
          )}

          <div className="max-w-7xl max-h-[90vh] relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>

            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              </div>
            )}
            <img 
              key={activeImageIndex}
              src={action.images[activeImageIndex]} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onLoad={() => setIsImageLoading(false)}
              alt="Detail"
            />
            {!isImageLoading && (
              <div className="mt-4 text-white font-medium tracking-widest uppercase text-xs">
                Fotka {activeImageIndex + 1} / {action.images.length}
              </div>
            )}
            
          </div>
          {action.images.length > 1 && (
            <button onClick={nextImage} className="absolute right-4 p-2 text-white/50 hover:text-white transition-all z-[10000]">
              <ChevronRight size={60} />
            </button>
          )}
        </div>,
        document.body // Vykreslí sa na koniec <body>
      )}
    </div>
  );
}