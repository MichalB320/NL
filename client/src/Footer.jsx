import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback"; // uprav cestu ak je komponent inde

// Importy log partnerov (uisti sa, že cesty zodpovedajú tvojej štruktúre)
import varime from './assets/partneri/varime-logo-slogan.png';
import jozef from './assets/partneri/logo_jozef.png';
import lificaffe from './assets/partneri/lificaffe-logo.png';
import dm from './assets/partneri/dm.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Sekcia PARTNERI */}
        <div className="pb-12 border-b border-gray-800 mb-12">
          <p className="text-center text-lg font-semibold uppercase tracking-widest text-gray-400 mb-8">
            Naši partneri
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 ">
            
            <div className="h-16 md:h-20 w-36 md:w-48 flex items-center justify-center transition-all duration-300">
              <a href="https://www.varime.blog/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 transition-transform">
                <ImageWithFallback src={varime} alt="Varime.blog" className="max-h-full max-w-full object-contain invert" />
              </a>
            </div>

            <div className="h-16 md:h-20 w-36 md:w-48 flex items-center justify-center ransition-all duration-300">
              <a href="https://lificaffe.cz/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 transition-transform">
                <ImageWithFallback src={lificaffe} alt="Lifi Caffe" className="max-h-full max-w-full object-contain" />
              </a>
            </div>

            <div className="h-16 md:h-20 w-36 md:w-48 flex items-center justify-center transition-all duration-300">
              <a href="https://jozefdruhy.sk/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 transition-transform">
                <ImageWithFallback src={jozef} alt="Jozef Druhý" className="max-h-full max-w-full object-contain" />
              </a>
            </div>

            <div className="h-16 md:h-30 w-31 md:w-33 flex items-center justify-center transition-all duration-300">
              <a href="https://mojadm.sk/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 transition-transform">
                <ImageWithFallback src={dm} alt="DM Drogerie" className="max-h-full max-w-full object-contain" />
              </a>
            </div>

          </div>
        </div>

        {/* Hlavný obsah pätičky */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* O nás & Identifikácia OZ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-[#81007f] fill-[#81007f]" size={24} />
              <h3 className="text-xl font-bold">Nebuď Ľahostajný</h3>
            </div>
            <p className="text-gray-400 text-sm text-justify leading-relaxed">
              Sme občianske združenie pôsobiace najmä v Skalici a okolí. Naším poslaním je podávať pomocnú ruku rodinám a deťom v ťažkých životných situáciách. Spolu tvoríme lepšiu budúcnosť.
            </p>
            <div className="pt-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Identifikačné údaje:</p>
              <p className="text-xs text-gray-400">NELA - Nebuď ľahostajný</p>
              <p className="text-xs text-gray-400">IČO: 56216211</p>
              <p className="text-xs text-gray-400 italic">Registrované na MV SR</p>
            </div>
          </div>

          {/* Rýchle odkazy */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Rýchle odkazy</h3>
            <ul className="space-y-3">
              {[
                { id: "o-nas", label: "O nás" },
                { id: "nase-projekty", label: "Naše projekty" },
                { id: "pomohli-sme", label: "Pomohli sme" },
                { id: "videli-ste-nas", label: "Videli ste nás" },
                { id: "aktuality", label: "Aktuality" },
                { id: "kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.id);
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-gray-400 hover:text-[#81007f] hover:translate-x-1 transition-all duration-300 text-sm cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt & Sociálne siete */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Kontakt</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#81007f] mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">
                  SNP<br />
                  909 01 Skalica
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="text-[#81007f] flex-shrink-0" size={18} />
                <a href="tel:+421902564645" className="text-gray-400 hover:text-white">+421 902 564 645</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="text-[#81007f] flex-shrink-0" size={18} />
                <a href="mailto:info@nebudlahostajny.sk" className="text-gray-400 hover:text-white">info@nebudlahostajny.sk</a>
              </li>
            </ul>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61579157963686"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/nebud_lahostajny/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#E4405F] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Spodná lišta s GDPR */}
        <div className="border-t border-gray-800 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {currentYear} NELA - Nebuď ľahostajný, Všetky práva vyhradené.
            </p>
            <div className="flex gap-8 text-xs font-medium">
              <label 
                htmlFor="privacy-modal" 
                className="text-gray-400 hover:text-[#81007f] cursor-pointer transition-colors"
              >
                Ochrana osobných údajov (GDPR)
              </label>
              <span className="text-gray-700">|</span>
              <p className="text-gray-600">
                Vytvorené pre dobrú vec
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}