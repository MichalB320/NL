import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import { Heart, Quote } from "lucide-react";
import Logo from './assets/logo.png';
import HandsImg from "./assets/hands_helping.png";

export function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="domov" className="py-20 px-4 relative bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-7 md:p-12 lg:p-16">
          
          {/* PRVÝ RIADOK: Otázka a Obrázok */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-300 blur-2xl"/>
                <div className="w-46 h-46 md:w-72 md:h-42 rounded-full overflow-hidden border-[10px] border-white shadow-2xl relative z-10">
                  <img src={HandsImg} alt="Pomoc" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="relative">
              <Quote className="absolute -top-6 -left-4 w-10 h-10 text-purple-300 opacity-40 rotate-180" />
              <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight italic relative z-10">
                Viete, že na Slovensku sú rodiny, ktoré si musia vybrať, či zaplatia nájom alebo kúpia jedlo?
              </p>
            </div>
          </div>

          {/* DRUHÝ RIADOK: Logo a Text (Presne podľa tvojho originálu) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            

            {/* Textová sekcia */}
            <div className="text-left">
              <h2 className="text-2xl md:text-2xl lg:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                Podaj pomocnú ruku
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed italic border-l-4 border-[#81007f] pl-6">
                Sú deti, ktoré nemajú ani na cestu do školy. Matky, samoživiteľky, ktoré ledva zaplatia nájom a hrozí im vysťahovanie? Ľudia, ktorí prišli o domov, pretože život im priniesol viac bolesti, než dokázali uniesť? My podávame pomocnú ruku tým, ktorí ju najviac potrebujú. Poskytujeme podporu, poradenstvo a materiálnu aj finančnú pomoc rodinám, deťom aj dospelým v ťažkých životných situáciách. Pomáhame srdcom. Veríme v zmenu. Rešpektujeme každého z vás.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#81007f] text-white text-lg font-bold rounded-full hover:bg-[#6a0069] hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <Heart className="mr-2 w-5 h-5 fill-white" />
                  Chcem pomôcť
                </button>
                
                <button
                  onClick={() => scrollToSection("o-nas")}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-200 text-[#81007f] text-lg font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 font-medium cursor-pointer"
                >
                  Naše príbehy
                </button>
              </div>
            </div>

            {/* Logo - na mobile skryté (hidden), na desktopoch zobrazené (md:flex) */}
            <div className="hidden md:flex justify-center">
              <div className="rounded-3xl overflow-hidden p-7 bg-white/40 border border-violet/50 shadow-inner w-full max-w-sm">
                <ImageWithFallback
                  src={Logo}
                  alt="Logo Nebuď Ľahostajný"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}