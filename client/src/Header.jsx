import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo2 from './assets/logo2.png';

export function Header() {
  const isDonateVisible = true;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDonateInfo, setShowDonateInfo] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-purple-950/30 border-b border-transparent dark:border-purple-900/30 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => scrollToSection("domov")} className="flex-shrink-0 flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none cursor-pointer">
            <img src={Logo2} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#81007f] via-purple-600 to-[#b026ae] dark:from-purple-300 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Nebuď Ľahostajný
            </h1>
          </button>

          <div className="flex items-center gap-2 md:gap-8">
            {isDonateVisible && (
              <button
                onClick={() => setShowDonateInfo(!showDonateInfo)}
                className="inline-flex items-center px-1 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 animate-pulse-subtle sm:mr-4 text-xs sm:text-sm border-1 cursor-pointer"
              >
                {showDonateInfo ? 'Zavrieť' : '2% z dane'}
              </button>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <button
                onClick={() => scrollToSection("domov")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Domov
              </button>
              <button
                onClick={() => scrollToSection("o-nas")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                O nás
              </button>
              <button
                onClick={() => scrollToSection("nase-projekty")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Naše projekty
              </button>
              <button
                onClick={() => scrollToSection("pomohli-sme")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Pomohli sme
              </button>
              <button
                onClick={() => scrollToSection("videli-ste-nas")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Videli ste nás
              </button>
              <button
                onClick={() => scrollToSection("aktuality")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Aktuality
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Kontakt
              </button>
            </nav>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 transition-colors">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100 dark:border-purple-900/40">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("domov")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                Domov
              </button>
              <button
                onClick={() => scrollToSection("o-nas")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                O nás
              </button>
              <button
                onClick={() => scrollToSection("nase-projekty")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                Naše projekty
              </button>
              <button
                onClick={() => scrollToSection("pomohli-sme")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                Pomohli sme
              </button>
              <button
                onClick={() => scrollToSection("videli-ste-nas")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                Videli ste nás
              </button>
              <button
                onClick={() => scrollToSection("aktuality")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                Aktuality
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-gray-700 dark:text-gray-200 hover:text-[#81007f] dark:hover:text-purple-300 text-left font-medium transition-colors"
              >
                Kontakt
              </button>
            </div>
          </nav>
        )}

        {/* Rozbaľovací panel: 2% z dane */}
        {isDonateVisible && showDonateInfo && (
          <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-indigo-950/95 backdrop-blur-xl border-t-4 border-[#81007f] dark:border-purple-500 shadow-2xl dark:shadow-purple-950/80 animate-in fade-in slide-in-from-top-4 duration-300 z-40 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

              {/* ĽAVÁ STRANA: TEXT */}
              <div className="space-y-4">
                <h3 className="text-xs lg:text-sm font-black text-[#81007f] dark:text-purple-300 uppercase tracking-widest">
                  CHUDOBA NIE JE VOĽBA. POMOC ÁNO.
                </h3>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  Z Vašich 2% dane pomôžeme rodinám v núdzi zvládnuť ťažké dni.
                </p>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Aj ty môžeš pomôcť ľuďom a deťom v ťažkej životnej situácii – darovaním 2 % zo svojich daní. Podporíš tým našu prácu v rodinách, pomoc deťom, matkám a ľuďom, ktorí sa ocitli v kríze.
                </p>
              </div>

              {/* PRAVÁ STRANA: ÚDAJE (KARTA) */}
              <div className="flex flex-col gap-3">
                <h4 className="text-base lg:text-lg font-bold text-[#81007f] dark:text-purple-300 flex items-center">
                  Údaje pre darovanie 2%:
                </h4>
                <div className="bg-violet-50 dark:bg-purple-900/40 p-4 rounded-3xl border-2 border-violet-100 dark:border-purple-700/50 shadow-inner relative transition-colors">
                  <div className="space-y-3">
                    <div className="group relative">
                      <p className="text-[9px] lg:text-[10px] uppercase font-black text-violet-500 dark:text-purple-300 tracking-tighter">Názov:</p>
                      <p className="text-base lg:text-lg font-bold text-gray-800 dark:text-white">NELA-Nebuď ľahostajný</p>
                    </div>

                    <div className="flex justify-between items-end border-t border-violet-200 dark:border-purple-800/60 pt-3">
                      <div>
                        <p className="text-[9px] lg:text-[10px] uppercase font-black text-violet-500 dark:text-purple-300 tracking-tighter">IČO:</p>
                        <p className="text-base lg:text-lg font-mono font-black text-[#81007f] dark:text-purple-300">56216211</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-sm font-semibold text-red-600 dark:text-red-400 flex items-center pt-1">
                  Vyhlásenie je potrebné podať do 30. apríla.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}