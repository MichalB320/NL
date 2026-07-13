import { useState, useEffect } from 'react'
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
import { MapSection} from './Map.jsx';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AdminPage } from './Admin.jsx';
import varime from './assets/partneri/varime-logo-slogan.png';
import jozef from './assets/partneri/logo_jozef.png';
import lificaffe from './assets/partneri/lificaffe-logo.png';
import dm from './assets/partneri/dm.png';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

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
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100">
      {/*}
      <div 
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: '20%',
          bottom: '70%',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderTop: '2px solid red',
          borderBottom: '2px solid red',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'red',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        DETEKČNÁ ZÓNA
      </div>
      */}
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <HelpedSection />
        <MapSection />
        {hasConsent ? (
          <FacebookFeed url={mojadresa}/>
        ) : (
          <div className="max-w-4xl mx-auto my-10 p-10 bg-white/50 rounded-3xl border-2 border-dashed border-purple-200 text-center">
            <p className="text-gray-600">
              Pre zobrazenie noviniek z Facebooku je potrebné povoliť cookies.
            </p>
          </div>
        )}
        <Contact />
      </main>
      {/* Sekcia PARNERI */}
      <div className="mt-4 pb-15">
        <p className="text-center text-xl font-semibold uppercase tracking-widest text-gray-400 mb-8">
          Naši partneri
        </p>
  
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 transition-all duration-500">

          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0">
            <a href="https://www.varime.blog/" target="_blank" rel="noopener noreferrer" className="h-full w-full, flex items-center justify-center hover:scale-110 hover:grayscale-0 transition-transform">
              <ImageWithFallback src={varime} className="max-h-full max-w-full object-contain"/>
            </a>
          </div>
    
          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0">
            <a href="https://lificaffe.cz/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 hover:grayscale-0 transition-transform">
            <ImageWithFallback src={lificaffe} className="max-h-full max-w-full object-contain"/>
            </a>
          </div>
    
          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0">
            <a href="https://jozefdruhy.sk/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 hover:grayscale-0 transition-transform">
              <ImageWithFallback src={jozef} className="max-h-full max-w-full object-contain"/> 
            </a>
          </div>

          <div className="h-20 md:h-28 w-40 md:w-52 flex items-center justify-center grayscale hover:grayscale-0">
            <a href="https://mojadm.sk/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center hover:scale-110 hover:grayscale-0 transition-transform">
              <ImageWithFallback src={dm} className="max-h-full max-w-full object-contain"/> 
            </a>
          </div>

        </div>
      </div>
      <Footer />
      <HelpButton />
      {!hasConsent && <CookieConsent onAccept={() => setHasConsent(true)} />}
    </div>
  )
}

export default App
