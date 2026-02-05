import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import { Heart } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <p className="text-rose-500 font-semibold mb-2 uppercase tracking-wide text-sm md:text-base">
          Viete, že na Slovensku sú rodiny, ktoré si musia vybrať, či zaplatia nájom alebo kúpia jedlo?
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Podaj pomocnú ruku
            </h2>
            <p className="text-base md:text-xl text-gray-600 mb-8 leading-relaxed">
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
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={Logo}
                alt="Ruky držiace sa navzájom s láskou a podporou"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
