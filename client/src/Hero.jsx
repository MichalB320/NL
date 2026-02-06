import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import { Heart, Sparkles } from "lucide-react";
import Logo from './assets/logo.png';

export function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Zmena pozadia na fialové tóny
    <section id="domov" className="min-h-screen relative bg-gradient-to-br from-purple-80 via-violet-80 to-indigo-100">
      
      {/* Dekoračný fialový kruh */}
      <div className="absolute bottom-15 right-15 w-90 h-90 bg-purple-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-28">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 lg:py-10">
          
          {/* Štítok s textom - upravený na fialovo */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/50 backdrop-blur-sm rounded-full border border-purple-200/50 mb-6">
            <Sparkles className="w-4 h-4 text-[#81007f]" />
            <span className="text-sm font-medium text-gray-700">
              Viete, že na Slovensku sú rodiny, ktoré si musia vybrať, či zaplatia nájom alebo kúpia jedlo?
            </span>
          </div>
 
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Box okolo loga s jemným fialovým tieňom */}
              <div className="rounded-3xl overflow-hidden shadow-2xl p-7 m-5 lg:m-20 bg-white/40">
                <ImageWithFallback
                  src={Logo}
                  alt="Logo Nebuď Ľahostajný"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-2xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Podaj pomocnú ruku
              </h2>
              <p className="text-base md:text-base text-gray-600 mb-8 leading-relaxed text-left">
                Viete, že na Slovensku sú deti, ktoré nikdy neoslávia svoje narodeniny, pretože na to doma nie sú peniaze? Sú deti, ktoré nemajú ani na cestu do školy. Matky, samoživiteľky, ktoré ledva zaplatia nájom a hrozí im vysťahovanie? Ľudia, ktorí prišli o domov, pretože život im priniesol viac bolesti, než dokázali uniesť? My podávame pomocnú ruku tým, ktorí ju najviac potrebujú. Poskytujeme podporu, poradenstvo a materiálnu aj finančnú pomoc rodinám, deťom aj dospelým v ťažkých životných situáciách. Pomáhame srdcom. Veríme v zmenu. Rešpektujeme každého z vás.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Hlavné tlačidlo - tvoja fialová #81007f */}
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#81007f] text-white rounded-full hover:bg-[#6a0069] hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <Heart className="mr-2 w-5 h-5 fill-white" />
                  Chcem pomôcť
                </button>
                
                {/* Sekundárne tlačidlo - fialový obrys */}
                <button
                  onClick={() => scrollToSection("o-nas")}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-200 text-[#81007f] rounded-full hover:bg-purple-50 transition-all duration-300 font-medium"
                >
                  Naše príbehy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}