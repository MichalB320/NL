import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from './assets/logo.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <h1 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Nebuď Ľahostajný
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("domov")}
              className="text-gray-700 hover:text-rose-400 transition-colors"
            >
              Domov
            </button>
            <button
              onClick={() => scrollToSection("o-nas")}
              className="text-gray-700 hover:text-rose-400 transition-colors"
            >
              O nás
            </button>
            <button
              onClick={() => scrollToSection("nase-projekty")}
              className="text-gray-700 hover:text-rose-400 transition-colors"
            >
              Naše projekty
            </button>
           
            <button
              onClick={() => scrollToSection("aktuality")}
              className="text-gray-700 hover:text-rose-400 transition-colors"
            >
              Aktuality
            </button>
            <button
              onClick={() => scrollToSection("kontakt")}
              className="text-gray-700 hover:text-rose-400 transition-colors"
            >
              Kontakt
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-rose-400"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("domov")}
                className="text-gray-700 hover:text-rose-400 text-left"
              >
                Domov
              </button>
              <button
                onClick={() => scrollToSection("o-nas")}
                className="text-gray-700 hover:text-rose-400 text-left"
              >
                O nás
              </button>
              <button
                onClick={() => scrollToSection("nase-projekty")}
                className="text-gray-700 hover:text-rose-400 text-left"
              >
                Naše projekty
              </button>
              <button
                onClick={() => scrollToSection("aktuality")}
                className="text-gray-700 hover:text-rose-400 text-left"
              >
                Aktuality
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-gray-700 hover:text-rose-400 text-left"
              >
                Kontakt
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}