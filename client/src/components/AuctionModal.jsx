import { useState, useEffect } from "react";
import { X, Sparkles, Trophy, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import zigopodpis from "./../assets/pripravujeme/IMG_4016.jpeg";
import slubpodpis from "./../assets/pripravujeme/IMG_4017.webp";
import podpis from "./../assets/pripravujeme/IMG_4019.jpeg";
import vitaminy from "./../assets/pripravujeme/IMG_4030.jpeg";
import trickopodpis from "./../assets/pripravujeme/IMG_4036.jpeg"
import hracky1 from "./../assets/pripravujeme/IMG_4056.jpeg";
import hracky2 from "./../assets/pripravujeme/IMG_4063.jpeg";
import silt from "./../assets/pripravujeme/IMG_4578.jpeg";
import siltpodpis from "./../assets/pripravujeme/IMG_4579.jpeg";
import drespodpis from "./../assets/pripravujeme/IMG_4583.jpeg";

export function AuctionModal({ isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const auctionImages = [
    zigopodpis,
    slubpodpis,
    podpis,
    vitaminy,
    trickopodpis,
    hracky1,
    hracky2,
    silt,
    siltpodpis,
    drespodpis
  ];

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % auctionImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + auctionImages.length) % auctionImages.length);
  };

  // Zablokovanie scrollovania pozadia, keď je modal otvorený
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Hlavné okno modalu */}
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-purple-100 flex flex-col relative animate-in zoom-in-95 duration-300">
        
        {/* Tlačidlo na zatvorenie v pravom rohu */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-500 rounded-full transition-all cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          

          {/* 1. STĹPEC - TEXT (7 z 12) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#81007f] text-[11px] font-bold uppercase mb-3 animate-pulse">
                <Sparkles size={12} className="fill-[#81007f]" />
                Pripravujeme dražbu
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                Nebuď ľahostajný – pripravujeme veľkú charitatívnu dražbu!
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Už čoskoro spustíme charitatívnu dražbu, v ktorej si budete môcť vydražiť množstvo jedinečných predmetov za skvelé ceny. Celý výťažok poputuje na pomoc sociálne slabším rodinám.
              </p>

              {/* Zoznam cien */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-[#81007f] flex items-center gap-1.5 mb-2">
                  <Trophy size={14} /> Tešiť sa môžete napríklad na:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">🧢</span><span>Čiapka s podpisom <strong>Attilu Végha</strong></span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">👕</span><span>Dres s podpismi <strong>FC Spartak Trnava</strong></span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">🏒</span><span>Podpísaný dres hokejbalistov <strong>Skalice</strong></span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">📸</span><span>Fotka s podpisom <strong>Žigmunda Pálffyho</strong></span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">🎁</span><span>Darčeky od <strong>dm drogerie markt</strong></span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">🎭</span><span>Podpisové karty hercov zo <strong>seriálu Sľub</strong></span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">🧸</span><span>Rôzne hračky pre deti</span></li>
                  <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"><span className="text-sm">✨</span><span>A mnoho ďalších darov...</span></li>
                </ul>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Každým prihodením nielen získate výnimočný predmet, ale zároveň prispejete na dobrú vec. Veríme, že spoločne dokážeme pomôcť tým, ktorí to najviac potrebujú.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <p className="text-[11px] text-gray-400 italic mb-3">
                🙏 Zo srdca ďakujeme všetkým sponzorom, ktorí do dražby venovali tieto krásne ceny.
              </p>
              <div className="bg-gradient-to-r from-[#81007f] to-[#b000ae] text-white p-3 rounded-xl text-center shadow-sm">
                <p className="font-bold text-xs uppercase tracking-wider">
                  Draž, pomáhaj a meň životy k lepšiemu!
                </p>
              </div>
            </div>
          </div>

          {/* 2. STĹPEC - FOTOGALÉRIA (5 z 12) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md bg-gray-100">
                <img 
                  src={auctionImages[activeImageIndex]} 
                  alt="Predmet dražby"
                  className="w-full h-full object-cover"
                />
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md cursor-pointer"><ChevronLeft size={18} /></button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md cursor-pointer"><ChevronRight size={18} /></button>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-semibold">{activeImageIndex + 1} / {auctionImages.length}</div>
              </div>

              {/* Náhľady miniatúr */}
              <div className="grid grid-cols-5 gap-1.5 mt-3">
                {auctionImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? "border-[#81007f] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Náhľad" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3">
              <div className="p-2.5 bg-[#81007f] text-white rounded-xl"><Heart size={18} className="animate-pulse" /></div>
              <div>
                <h5 className="font-bold text-gray-800 text-xs">Vyvolávacia cena od 3 €</h5>
                <p className="text-gray-500 text-[11px]">Môže sa zapojiť naozaj každý!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}