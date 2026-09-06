import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import { Heart, Quote } from "lucide-react";
import Logo from './assets/logo.png';
import HandsImg from "./assets/hands_helping.webp";

export function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="domov" className="py-20 px-2 md:px-4 lg:px-4 relative bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-100 dark:from-slate-950 dark:via-purple-950/60 dark:to-indigo-950 overflow-hidden min-h-screen flex items-center transition-colors duration-300"> 
      

      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Hlavná sklenená karta */}
        <div className="relative bg-white/60 dark:bg-indigo-950/60 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-indigo-950/50 border border-white/30 dark:border-indigo-400/20 p-5 md:p-10 lg:p-16 transition-all duration-300">          
          
          {/* PRVÝ RIADOK: Otázka a Obrázok */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div className="flex justify-center items-center py-4">
              <div className="relative">
                {/* Svetelná žiara za fotkou */}
                <div className="absolute inset-0 rounded-full bg-purple-300 dark:bg-gradient-to-r dark:from-purple-600/50 dark:to-indigo-600/40 blur-2xl transition-colors" />
                <div className="w-46 h-46 md:w-82 md:h-42 rounded-full overflow-hidden border-[10px] border-white dark:border-purple-500/40 shadow-2xl relative z-10 transition-colors">
                  <img src={HandsImg} alt="Pomoc" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="relative">
              <p className="text-center md:text-left text-xl md:text-xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-100 leading-tight italic relative z-10">
                <span className="relative whitespace-nowrap pl-6">
                  <Quote className="absolute top-3 left-1 lg:top-4 lg:-left-2 w-5 h-5 lg:w-8 lg:h-8 text-[#81007f] dark:text-purple-400 opacity-25 dark:opacity-40" />
                  Viete,
                </span>
                {" "}že na Slovensku sú rodiny, ktoré si musia vybrať, či zaplatia nájom alebo kúpia{" "}
                <span className="relative whitespace-nowrap">
                  jedlo?
                  <Quote className="absolute -top-1 left-full w-5 h-5 lg:w-8 lg:h-8 text-[#81007f] dark:text-purple-400 opacity-25 dark:opacity-40 rotate-180 ml-1" />
                </span>
              </p>
            </div>
          </div>

          {/* DRUHÝ RIADOK: Logo a Text */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Textová sekcia */}
            <div className="text-left">
              <h2 className="text-2xl md:text-2xl lg:text-5xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight">
                Podaj pomocnú ruku
              </h2>

              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed italic border-l-4 border-[#81007f] dark:border-purple-400 pl-6 text-justify font-medium">
                Sú deti, ktoré nemajú ani na cestu do školy. Matky, samoživiteľky, ktoré ledva zaplatia nájom a hrozí im vysťahovanie? Ľudia, ktorí prišli o domov, pretože život im priniesol viac bolesti, než dokázali uniesť? My podávame pomocnú ruku tým, ktorí ju najviac potrebujú. Poskytujeme podporu, poradenstvo a materiálnu aj finančnú pomoc rodinám, deťom aj dospelým v ťažkých životných situáciách. Pomáhame srdcom. Veríme v zmenu. Rešpektujeme každého z vás.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection("kontakt")} className="inline-flex items-center justify-center px-8 py-4 bg-[#81007f] dark:bg-purple-600 text-white text-lg font-bold rounded-full hover:bg-[#6a0069] dark:hover:bg-purple-500 hover:scale-105 transition-all duration-300 shadow-md cursor-pointer">
                  <Heart className="mr-2 w-5 h-5 fill-white" />
                  Chcem pomôcť
                </button>
                
                <button onClick={() => scrollToSection("o-nas")} className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-200 dark:border-purple-800/80 text-[#81007f] dark:text-purple-300 text-lg font-semibold rounded-full hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-300 cursor-pointer">
                  Naše príbehy
                </button>
              </div>
            </div>

            {/* Karta s logom */}
            <div className="hidden md:flex justify-center">
              <div className="rounded-3xl overflow-hidden p-7 bg-white/40 dark:bg-purple-950/40 border border-violet-200/50 dark:border-purple-800/50 shadow-inner dark:shadow-purple-900/30 w-full max-w-sm transition-colors">
                <ImageWithFallback
                  src={Logo}
                  alt="Logo Nebuď Ľahostajný"
                  className="w-full h-auto dark:invert dark:brightness-200 dark:hue-rotate-180 transition-all duration-300"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}