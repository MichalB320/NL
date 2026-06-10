import { useEffect, useState } from "react";
import { MapPin, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import GalleryStack from "./components/GalleryStack.jsx";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import trhy1 from "./assets/videli-ste-nas/trhy/trhy1.jpeg";
import trhy2 from "./assets/videli-ste-nas/trhy/trhy2.jpeg";
import trhy3 from "./assets/videli-ste-nas/trhy/trhy3.jpeg";
import trhy4 from "./assets/videli-ste-nas/trhy/trhy4.jpg";
import { Action } from "./components/Action.jsx";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export function MapSection() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(1);

  const handleMarkerClick = (locId) => {
    setSelectedLocationId(locId);
    document.getElementById('side-panel').scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox = (location, index) => {
    setActiveLocation(location);
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    setIsImageLoading(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (!activeLocation) return;
    setIsImageLoading(true);
    setActiveImageIndex((prev) => (prev + 1) % activeLocation.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!activeLocation) return;
    setIsImageLoading(true);
    setActiveImageIndex((prev) => (prev - 1 + activeLocation.images.length) % activeLocation.images.length);
  };

  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [activeImageIndex]);

  const locations = [
    {
      id: 1,
      city: "Skalica",
      description: "Vianočné trhy 2025",
      coords: [48.84612012770536, 17.22889819851306],
      images: [trhy1, trhy2, trhy3, trhy4],
      event: "Naša prvá „veľká“ akcia v rámci občianskeho združenia Nebuď ľahostajný sa konala počas adventného obdobia, keď sme mali možnosť byť súčasťou vianočných trhov v Skalici. Vďaka podpore organizátora sme mali na trhoch vlastný stánok, v ktorom sme rozdávali dobrú náladu, úsmevy a radi sme sa podelili s návštevníkmi o množstvo sladkých dobrôt. Na vianočných trhoch sme spojili sily aj so Sandrou z Varimeblog, ktorá nám napiekla množstvo výborných domácich maškŕt. Aj vďaka nej mal náš stánok krásnu atmosféru a návštevníci si mohli pochutnať na niečom naozaj výnimočnom. Tiež s naším sponzorom LiFicaffe okienko s perfektnou kávičkou, ktorá voňala široko ďaleko. :) Výťažok zo zbierky sme následne použili na nákup vianočných darčekov pre deti a na pomoc rodinám v rámci okresu Skalica. Pomoc mala rôzne podoby – od potravinovej pomoci až po hygienické potreby pre rodiny, ktoré to najviac potrebujú. Zo srdca ďakujeme všetkým, ktorí sa pri našom stánku zastavili, podporili nás a stali sa súčasťou tejto krásnej myšlienky. Aj vďaka vám môžeme pomáhať tam, kde je to najviac potrebné. Zároveň ďakujeme organizatorovi pánovi Hrehorovi, vďaka ktorému sme sa mohli stánkov zúčastniť. Nebuďme ľahostajní ❤️"
    },
  ];

  const displayedLocations = selectedLocationId ? locations.filter(l => l.id === selectedLocationId) : [];

  return (
    <section id="videli-ste-nas" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Kde všade ste nás mohli vidieť</h3>
            </div>

            {/* HLAVNÝ KONTAJNER (GRID) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              

              {/* MAPA */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-xl h-[500px] z-0 border-4 border-white">
                <MapContainer 
                  center={[48.84612012770536, 17.22889819851306]} 
                  zoom={14} 
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; OSM'/>

                  {locations.map((loc) => (
                    <Marker 
                      key={loc.id} 
                      position={loc.coords} 
                      icon={customIcon}
                      eventHandlers={{
                        add: (e) => {
                          if (loc.id === 1) {
                            e.target.openPopup(); // Leaflet sám otvorí popup hneď, ako sa vykreslí
                          }
                        },
                        click: () => handleMarkerClick(loc.id), // REAKCIA NA KLIK
                      }}
                    >
                      <Popup minWidth={180} className="custom-popup">
                        <div className="p-1">
                          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-1">
                             <MapPin className="w-4 h-4 text-purple-600" /> {loc.city}
                          </h4>
                          <p className="text-[10px] text-gray-600">{loc.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* BOČNÝ PANEL */}
              <div id="side-panel" className="lg:col-span-1 scroll-mt-30 md:scroll-mt-45 space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {displayedLocations.length > 0 ? (
                  displayedLocations.map((loc) => (
                    <div key={loc.id} className="group p-6 bg-gray-50 rounded-2xl border-2 border-purple-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 text-[#81007f] bg-purple-100 rounded-xl">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-800">{loc.city}</h4>
                        </div>
                        {selectedLocationId && (
                           <button onClick={() => setSelectedLocationId(null)} className="text-gray-400 hover:text-red-500">
                              <X size={20} />
                           </button>
                        )}
                      </div>
                      <p className="text-justify text-gray-600 text-sm leading-relaxed mb-4">
                        {loc.event}
                      </p>

                      <GalleryStack images={loc.images} onOpenLightbox={(index) => openLightbox(loc, index)} />
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl">
                    <MapPin className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 italic">Kliknite na špendlík na mape pre zobrazenie detailov o udalosti.</p>
                  </div>
                )}
              </div>
            
            </div>
          </div>
        </div>
      </div>
      
      {activeImageIndex !== null && createPortal (
        <div onClick={closeLightbox} className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" >
          <button className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors z-[10000]">
            <X size={40} />
          </button>
          {activeLocation.images.length > 1 && (
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
            <img key={activeImageIndex} src={activeLocation.images[activeImageIndex]} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onLoad={() => setIsImageLoading(false)}
              alt="Detail"
            />
            {!isImageLoading && (
              <div className="mt-4 text-white font-medium tracking-widest uppercase text-xs">
                Fotka {activeImageIndex + 1} / {activeLocation.images.length}
              </div>
            )}
            
          </div>
          
          {activeLocation.images.length > 1 && (
            <button onClick={nextImage} className="absolute right-4 p-2 text-white/50 hover:text-white transition-all z-[10000]">
              <ChevronRight size={60} />
            </button>
          )}
        </div>, document.body
      )}
      
      {/* CSS pre Leaflet Popup aby ladil s tvojím UI */}
      <style jsx="true" global="true" >{`
        .leaflet-popup-content-wrapper {
          border-radius: 1.5rem !important;
          padding: 0.5rem !important;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
        .leaflet-container {
          font-family: inherit !important;
        }
      `}</style>
    </section>
  );
}