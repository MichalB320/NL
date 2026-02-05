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
    <section id="domov" className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="absolute top-20 left-15 w-100 h-100 bg-rose-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-15 w-100 h-100 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 lg:p-20">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-400/20 to-pink-400/20 backdrop-blur-sm rounded-full border border-rose-300/30 mb-6">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-base font-medium text-gray-700">
              Viete, že na Slovensku sú rodiny, ktoré si musia vybrať, či zaplatia nájom alebo kúpia jedlo?
            </span>
          </div>
 
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Podaj pomocnú ruku
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed text-left">
              Viete, že na Slovensku sú deti, ktoré nikdy neoslávia svoje narodeniny, pretože na to doma nie sú peniaze? Sú deti, ktoré nemajú ani na cestu do školy. Matky, samoživiteľky, ktoré ledva zaplatia nájom a hrozí im vysťahovanie? Ľudia, ktorí prišli o domov, pretože život im priniesol viac bolesti, než dokázali uniesť? My podávame pomocnú ruku tým, ktorí ju najviac potrebujú. Poskytujeme podporu, poradenstvo a materiálnu aj finančnú pomoc rodinám, deťom aj dospelým v ťažkých životných situáciách. Pomáhame srdcom. Veríme v zmenu. Rešpektujeme každého z vás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("kontakt")}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Heart className="mr-2 w-5 h-5 fill-white" />
                Chcem pomôcť
              </button>
              <button
                onClick={() => scrollToSection("o-nas")}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-rose-300 text-rose-500 rounded-full hover:bg-rose-50 transition-all duration-300"
              >
                Naše príbehy
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl p-10 m-10">
              <ImageWithFallback
                src={Logo}
                alt="Ruky držiace sa navzájom s láskou a podporou"
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
