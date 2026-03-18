import { useState } from "react";
import { Calendar, MapPin, Heart, Camera, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";

export function MapSection() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const locations = [
    {
      id: 1,
      city: "Bratislava",
      position: { left: "25%", top: "65%" },
      image: "https://images.unsplash.com/photo-1612446485216-2dc52fc0bb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlY2VpdmluZyUyMGdpZnRzJTIwY2hhcml0eXxlbnwxfHx8fDE3NzMyMTEzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      event: "Vianočná zbierka 2025"
    },
    {
      id: 2,
      city: "Košice",
      position: { left: "75%", top: "60%" },
      image: "https://images.unsplash.com/photo-1663398073685-5fbf5e1bbdd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGRvbmF0aW9uJTIwdm9sdW50ZWVycyUyMHNvcnRpbmd8ZW58MXx8fHwxNzczMjExMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      event: "Letná zbierka oblečenia"
    },
    {
      id: 3,
      city: "Žilina",
      position: { left: "35%", top: "40%" },
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwdm9sdW50ZWVycyUyMGhlbHBpbmclMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczMTI2ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      event: "Komunitná podpora"
    },
    {
      id: 4,
      city: "Prešov",
      position: { left: "70%", top: "45%" },
      image: "https://images.unsplash.com/photo-1752584157962-8821ce8b732b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5JTIwZXZlbnR8ZW58MXx8fHwxNzczMTI5NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      event: "Potravinová pomoc"
    },
    {
      id: 5,
      city: "Nitra",
      position: { left: "30%", top: "55%" },
      image: "https://images.unsplash.com/photo-1600186755589-84242bd8368f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwcGFja2luZyUyMGJveGVzJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc3MzIxMTMzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      event: "Balíčky nádeje"
    }
  ];

    return(
        <section id="videli-ste-nas">

            {/* Map section - "Videli ste nás" */}
          <div className="bg-gradient-to-br from-white/90 to-purple-50/80  rounded-3xl overflow-hidden shadow-lg border border-white/50">
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full shadow-lg mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Videli ste nás</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Kde všade sme pomohli
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Kliknite na pripináčik a pozrite si fotky z našich akcií v rôznych mestách Slovenska.
                </p>
              </div>

              {/* Interactive Map */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/50 bg-gradient-to-br from-purple-50 to-fuchsia-50 h-[500px]">
                {/* Map background with SVG illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 800 600" className="w-full h-full opacity-20">
                    <path
                      d="M150,350 L200,300 L250,280 L300,260 L350,250 L400,240 L450,250 L500,260 L550,280 L600,300 L650,320 L680,340 L700,360 L720,380 L720,400 L700,420 L680,430 L650,440 L600,450 L550,460 L500,465 L450,460 L400,450 L350,440 L300,430 L250,420 L200,400 L150,380 Z"
                      fill="currentColor"
                      className="text-purple-300"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Location pins */}
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-full"
                    style={{
                      left: location.position.left,
                      top: location.position.top,
                    }}
                  >
                    {/* Pin */}
                    <div className="relative">
                      <MapPin
                        className="w-10 h-10 text-purple-600 fill-purple-400 drop-shadow-lg group-hover:scale-125 transition-transform"
                        strokeWidth={2}
                      />
                      {/* Pulse animation */}
                      <div className="absolute inset-0 w-10 h-10">
                        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                      {/* City label */}
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-semibold text-gray-800">{location.city}</span>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Popup for selected location */}
                {selectedLocation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border-2 border-purple-300 p-6 w-80 animate-in fade-in zoom-in duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-6 h-6 text-purple-600" />
                          <h4 className="text-xl font-bold text-gray-800">{selectedLocation.city}</h4>
                        </div>
                        <button
                          onClick={() => setSelectedLocation(null)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-3">{selectedLocation.event}</p>
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <ImageWithFallback
                          src={selectedLocation.image}
                          alt={selectedLocation.city}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected location detail (shown below map on mobile) */}
              {selectedLocation && (
                <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md md:hidden">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md">
                        <ImageWithFallback
                          src={selectedLocation.image}
                          alt={selectedLocation.city}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <h4 className="text-xl font-bold text-gray-800">{selectedLocation.city}</h4>
                      </div>
                      <p className="text-gray-600">{selectedLocation.event}</p>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>


        </section>
    );
}