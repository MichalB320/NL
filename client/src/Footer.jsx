import { Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nezisková organizácia</h3>
            <p className="text-gray-400 mb-4">
              Spolu tvoríme lepšiu budúcnosť pre našu komunitu. 
              Pridajte sa k nám a buďte súčasťou pozitívnej zmeny.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("o-nas");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  O nás
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("produkty");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Produkty
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("aktuality");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Aktuality
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("kontakt");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  Skalica SNP <br />
                   909 01 Skalica
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">+421 902 564 645</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">info@nebudlahostajny.sk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Nezisková organizácia. Všetky práva vyhradené.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Ochrana osobných údajov
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Podmienky používania
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
