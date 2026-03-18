import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from './assets/logo.png';

export function Header() {
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
    <header className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#81007f] to-[#b026ae] bg-clip-text text-transparent">
                Nebuď Ľahostajný
              </h1> 
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-8">
            <button 
              onClick={() => setShowDonateInfo(!showDonateInfo)} 
              className="inline-flex items-center px-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 animate-pulse-subtle sm:mr-4 text-xs sm:text-sm border-1"
            >
              {showDonateInfo ? 'Zavrieť' : '2% z dane'}
            </button>
          
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <button
                onClick={() => scrollToSection("domov")}
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                Domov
              </button>
              <button
                onClick={() => scrollToSection("o-nas")}
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                O nás
              </button>
              <button
                onClick={() => scrollToSection("nase-projekty")}
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                Naše projekty
              </button>
              {/*<button
                onClick={() => scrollToSection("pomohli-sme")}
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                Pomohli sme
              </button>*/}
              {/*<button
                onClick={() => scrollToSection("videli-ste-nas")}
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                Videli ste nás
              </button>*/}
              <button
                onClick={() => scrollToSection("aktuality")}  
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                Aktuality
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-gray-700 hover:text-violet-500 transition-colors"
              >
                Kontakt
              </button>
            </nav>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-700 hover:text-violet-500">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("domov")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                Domov
              </button>
              <button
                onClick={() => scrollToSection("o-nas")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                O nás
              </button>
              <button
                onClick={() => scrollToSection("nase-projekty")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                Naše projekty
              </button>
              {/*<button 
                onClick={() => scrollToSection("pomohli-sme")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                Pomohli sme
              </button>*/}
              {/*<button
                onClick={() => scrollToSection("videli-ste-nas")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                Videli ste nás
              </button>*/}
              <button
                onClick={() => scrollToSection("aktuality")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                Aktuality
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-gray-700 hover:text-violet-500 text-left"
              >
                Kontakt
              </button>
            </div>
          </nav>
        )}

        {showDonateInfo && (
        <div className="absolute top-full left-0 right-0 bg-white border-t-4 border-[#81007f] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-40">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">
      
            {/* ĽAVÁ STRANA: TEXT */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#81007f] uppercase tracking-widest">
                CHUDOBA NIE JE VOĽBA. POMOC ÁNO.
              </h3>
              <p className="text-2xl font-bold text-gray-900 leading-tight">
                Z Vašich 2% dane pomôžeme rodinám v núdzi zvládnuť ťažké dni.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aj ty môžeš pomôcť ľuďom a deťom v ťažkej životnej situácii – darovaním 2 % zo svojich daní. Podporíš tým našu prácu v rodinách, pomoc deťom, matkám a ľuďom, ktorí sa ocitli v kríze.
              </p>
              
            </div>
      
            {/* PRAVÁ STRANA: ÚDAJE (KARTA) */}
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-bold text-[#81007f] flex items-center pt-6">
                Údaje pre darovanie 2%:
              </h4>
              <div className="bg-violet-50 p-2 rounded-3xl border-2 border-violet-100 shadow-inner relative">

                <div className="space-y-2">
                  <div className="group relative">
                    <p className="text-[10px] uppercase font-black text-violet-400 tracking-tighter">Názov:</p>
                    <p className="text-lg font-bold text-gray-800">NELA-Nebuď ľahostajný</p>
                  </div>

                  <div className="flex justify-between items-end border-t border-violet-200 pt-4">
                    <div>
                      <p className="text-[10px] uppercase font-black text-violet-400 tracking-tighter">IČO:</p>
                      <p className="text-lg font-mono font-black text-[#81007f]">56216211</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs font-semibold text-red-600 flex items-center pt-3">
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