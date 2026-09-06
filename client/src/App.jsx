import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import { Header } from './Header.jsx'
import { Hero } from './Hero.jsx'
import Footer from './Footer.jsx'
import { About } from './About.jsx'
//import Products from './Products.jsx'
import { FacebookFeed } from './FacebookFeed.jsx'
import { Contact } from './Contact.jsx'
import { HelpButton } from './HelpButton'
import { Projects } from './Projects.jsx'
import { CookieConsent } from './CookieConsent.jsx'
import { HelpedSection } from './Helped.jsx'
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Megaphone, Loader2 } from "lucide-react"; // Ikonka pre vrchný pásik
import varime from './assets/partneri/varime-logo-slogan.png';
// import jozef from './assets/partneri/logo_jozef.png';
// import lificaffe from './assets/partneri/lificaffe-logo.png';
// import dm from './assets/partneri/dm.png';

const AdminPage = lazy(() => import('./Admin.jsx').then(m => ({ default: m.AdminPage })));
const AuctionModal = lazy(() => import('./components/AuctionModal.jsx').then(m => ({ default: m.AuctionModal })));
const MapSection = lazy(() => import('./Map.jsx').then(m => ({ default: m.MapSection })));

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const hasSeenPromo = localStorage.getItem("seenAuctionPromo");
  //   if (!hasSeenPromo) {
  //     setIsModalOpen(true);
  //     localStorage.setItem("seenAuctionPromo", "true"); // Zapamätá si, že už videl, aby neotravoval pri každom prekliku
  //   }
  // }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const mojadresa = "https://www.facebook.com/profile.php?id=61579157963686";
  const [hasConsent, setHasConsent] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'true') {
      setHasConsent(true);
    }
  }, []);

  const sponsors = [
    {
      id: 1,
      image: varime
    }
  ];

  useEffect(() => {
    const startObserver = () => {
      if (currentHash.startsWith("#/admin")) return;

      const sections = document.querySelectorAll("section[id]");

      const options = {
        root: null,
        rootMargin: '-30% 0px -65% 0px',
        threshold: [0, 0.1, 0.5, 0.9],
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (window.location.hash !== `#${id}` && !window.location.hash.startsWith("#/admin")) {
              window.history.replaceState(null, null, `#${id}`);
            }
          }
        });
      }, options);

      sections.forEach((s) => observer.observe(s));
      return observer;
    };

    let observerInstance = startObserver();

    const timer = setTimeout(() => {
      observerInstance.disconnect();
      observerInstance = startObserver();
    }, 5000);

    return () => {
      if (observerInstance) observerInstance.disconnect();
      clearTimeout(timer);
    };
  }, [currentHash]);

  if (currentHash.startsWith("#/admin")) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <Loader2 className="text-purple-600 dark:text-purple-500 animate-spin" size={40} />
        </div>
      }>
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 dark:from-slate-950 dark:via-purple-950/50 dark:to-indigo-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Informačný panel (Megaphone) */}
      <div onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-[#81007f] to-[#b000ae] dark:from-[#6a0069] dark:via-purple-600 dark:to-[#9a0098] text-white py-2.5 px-4 text-center text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 dark:hover:from-[#7a0078] transition-all shadow-md z-[999] relative">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
        </span>
        <Megaphone size={16} className="animate-bounce" />
        <span>Pripravujeme veľkú charitatívnu dražbu pre rodiny v núdzi! Kliknite pre viac informácií.</span>
      </div>
      
      <Suspense fallback={null}>
        {isModalOpen && <AuctionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </Suspense>

      <Header />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <HelpedSection /> 
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-400 dark:text-gray-500">Načítavam mapu...</div>}>
          <MapSection />
        </Suspense>
        
        {hasConsent ? (
          <FacebookFeed url={mojadresa} />
        ) : (
          <div className="max-w-4xl mx-auto my-10 p-10 bg-white/50 dark:bg-purple-950/30 rounded-3xl border-2 border-dashed border-purple-200 dark:border-purple-800 text-center transition-colors">
            <p className="text-gray-600 dark:text-gray-300">
              Pre zobrazenie noviniek z Facebooku je potrebné povoliť cookies.
            </p>
          </div>
        )}
        
        <Contact />
      </main>

      {/* Sekcia PARTNERI */}
      {/* <div className="mt-4 pb-15">
        <p className="text-center text-xl font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8 transition-colors">
          Naši partneri
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-75 transition-all duration-500">

          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0 dark:brightness-125 dark:hover:brightness-100 transition-all duration-300">
            <a href="https://www.varime.blog/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 grayscale hover:grayscale-0 transition-transform">
              <ImageWithFallback src={varime} className="max-h-full max-w-full object-contain" />
            </a>
          </div>

          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0 dark:brightness-125 dark:hover:brightness-100 transition-all duration-300">
            <a href="https://lificaffe.cz/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 grayscale hover:grayscale-0 transition-transform">
              <ImageWithFallback src={lificaffe} className="max-h-full max-w-full object-contain" />
            </a>
          </div>

          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0 dark:brightness-125 dark:hover:brightness-100 transition-all duration-300">
            <a href="https://jozefdruhy.sk/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 grayscale hover:grayscale-0 transition-transform">
              <ImageWithFallback src={jozef} className="max-h-full max-w-full object-contain" />
            </a>
          </div>

          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0 dark:brightness-125 dark:hover:brightness-100 transition-all duration-300">
            <a href="https://mojadm.sk/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 grayscale hover:grayscale-0 transition-transform">
              <ImageWithFallback src={dm} className="max-h-full max-w-full object-contain" />
            </a>
          </div>

        </div>
      </div> */}
      
      <Footer />
      <HelpButton />
      {!hasConsent && <CookieConsent onAccept={() => setHasConsent(true)} />}
    </div>
  )
}

export default App