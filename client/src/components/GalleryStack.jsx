import { ImageWithFallback } from "../figma/ImageWithFallback.jsx";

export default function GalleryStack({ images, onOpenLightbox }) {
  if (!images || !Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {/* Pri kliknutí posielame index 0 (prvá fotka) */}
      <div onClick={() => onOpenLightbox(0)} className="relative w-40 h-40 cursor-pointer group">
        
        {images.slice(0, 3).map((image, index) => (
          <div 
            key={index} 
            className="absolute inset-0 transition-all duration-300 shadow-lg rounded-xl overflow-hidden"
            style={{
              transform: `translateX(${index * 8}px) translateY(${index * -8}px) rotate(${index * 2}deg)`,
              zIndex: 10 - index,
              filter: index > 0 ? `brightness(${100 - index * 10}%)` : "none",
            }}
          >
            <ImageWithFallback src={image} className="w-full h-full object-cover" alt={`image-${index}`} />
            
            {/* Indikátor pre viac fotiek (+X) */}
            {index === 2 && images.length > 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                +{images.length - 2}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}