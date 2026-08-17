import { useEffect, useState, useCallback, useRef } from "react";
import { MapPin, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import GalleryStack from "./components/GalleryStack.jsx";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { supabase } from "./supabaseClient";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function MarkerClusterGroup({ locations, onMarkerClick, defaultOpenId }) {
  const map = useMap();

  // Použijeme ref na callback, aby sme nemuseli spúšťať celý useEffect znova
  // pri každej zmene referencie funkcie handleMarkerClick
  const onClickRef = useRef(onMarkerClick);
  useEffect(() => {
    onClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    if (!map || locations.length === 0) return;

    const markerClusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyOnMaxZoom: true,
      chunkedLoading: true
    });

    const markers = [];

    locations.forEach((loc) => {
      if (!loc.coords || !Array.isArray(loc.coords) || loc.coords.length !== 2) return;
      if (isNaN(loc.coords[0]) || isNaN(loc.coords[1])) return;

      const marker = L.marker(loc.coords, { icon: customIcon });

      const popupContent = `
        <div class="p-1">
    <h4 class="text-sm font-bold text-gray-800 flex items-center gap-2 mb-1">
      <!-- SVG ikona MapPin s tvojou fialovou farbou namiesto React komponentu -->
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#81007f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-purple-600 flex-shrink-0" style="display: inline-block; vertical-align: middle;">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.74a1.095 1.095 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      ${loc.city}
    </h4>
    <p class="text-[10px] text-gray-600">${loc.description}</p>
  </div>
      `;

      marker.bindPopup(popupContent, { minWidth: 180, className: "custom-popup" });

      marker.on("click", () => {
        onClickRef.current(loc.id);
      });

      // AUTOMATICKÉ OTVORENIE PRE PREDVOLENÚ UDALOSŤ PRI PRVOM NAČÍTANÍ
      if (loc.id === defaultOpenId) {
        marker.on("add", () => {
          setTimeout(() => {
            // Otvorí popup a plynule naň vycentruje mapu
            marker.openPopup();
            map.setView(loc.coords, map.getZoom());
          }, 200); // Malé oneskorenie, aby Leaflet stihol marker bezpečne vykresliť
        });
      }

      markerClusterGroup.addLayer(marker);
      markers.push(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, locations, defaultOpenId]); // Odstránili sme onMarkerClick zo závislostí

  return null;
}

export function MapSection() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeLocation, setActiveLocation] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  // NAČÍTANIE DÁT ZO SUPABASE
  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("Actions").select("*");

        if (error) throw error;

        // Ochrana pred neplatnými dátami
        const validData = (data || []).filter(
          (loc) =>
            Array.isArray(loc.coords) &&
            loc.coords.length === 2 &&
            !isNaN(loc.coords[0]) &&
            !isNaN(loc.coords[1]) &&
            loc.coords[0] !== null &&
            loc.coords[1] !== null
        );

        setLocations(validData);

        const hasDefaultId = validData.some(loc => loc.id === 13);

        if (hasDefaultId) {
          // Ak ID 13 existuje, necháme ho aktívne (netreba nič meniť, v stave už je 13)
          setSelectedLocationId(13);
        } else if (validData.length > 0) {
          // Ak ID 13 v databáze nie je, ako zálohu zvolíme prvú načítanú lokalitu
          setSelectedLocationId(validData[0].id);
        }
      } catch (error) {
        console.error("Chyba pri načítaní lokácií:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  const handleMarkerClick = useCallback((locId) => {
    setSelectedLocationId(locId);
    // Malý timeout zabezpečí, že sa DOM stihne pripraviť, ak sa bočný panel práve vykresľuje
    setTimeout(() => {
      const element = document.getElementById('side-panel');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, []);

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

  const displayedLocations = selectedLocationId ? locations.filter(l => l.id === selectedLocationId) : [];

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-gray-500 italic">Načítavam mapu a podujatia...</p>
      </div>
    );
  }

  return (
    <section id="videli-ste-nas" className="py-20 px-2 md:px-4 lg:px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="p-5 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Kde všade ste nás mohli vidieť</h3>
            </div>

            {/* HLAVNÝ KONTAJNER (GRID) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* MAPA */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-xl h-[500px] z-0 border-4 border-white">
                <MapContainer
                  center={[48.482869, 17.175551]}
                  zoom={8}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; OSM' />

                  {/* Klastrovanie s priamo mapovanými dátami */}
                  <MarkerClusterGroup
                    locations={locations}
                    onMarkerClick={handleMarkerClick}
                    defaultOpenId={selectedLocationId}
                  />
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
                          <button onClick={() => setSelectedLocationId(null)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                            <X size={20} />
                          </button>
                        )}
                      </div>
                      <p className="text-justify text-gray-600 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: loc.event }} />

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

      {/* LIGHTBOX */}
      {activeImageIndex !== null && createPortal(
        <div onClick={closeLightbox} className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" >
          <button className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors z-[10000] cursor-pointer">
            <X size={40} />
          </button>
          {activeLocation.images.length > 1 && (
            <button onClick={prevImage} className="absolute left-4 p-2 text-white/50 hover:text-white transition-all z-[10000] cursor-pointer">
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
            <button onClick={nextImage} className="absolute right-4 p-2 text-white/50 hover:text-white transition-all z-[10000] cursor-pointer">
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
        .marker-cluster-small {
          background-color: rgba(129, 0, 127, 0.2) !important;
        }
        .marker-cluster-small div {
          background-color: rgba(129, 0, 127, 0.6) !important;
          color: white !important;
          font-weight: bold;
        }
        .marker-cluster-medium {
          background-color: rgba(129, 0, 127, 0.3) !important;
        }
        .marker-cluster-medium div {
          background-color: rgba(129, 0, 127, 0.8) !important;
          color: white !important;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}