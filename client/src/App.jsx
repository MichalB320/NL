import { useState, useEffect } from 'react'
import './App.css'
//import Fb from './FacebookFeed.jsx'
import { Header } from './Header.jsx'
import { Hero } from './Hero.jsx'
import Footer from './Footer.jsx'
import { About } from './About.jsx'
import Products from './Products.jsx'
import FacebookFedd from './FacebookFeed.jsx'
import { Contact } from './Contact.jsx'
import { HelpButton } from './HelpButton'
import { Projects } from './Projects.jsx'
import { CookieConsent } from './CookieConsent.jsx'

function App() {
  const mojadresa = "https://www.facebook.com/profile.php?id=61579157963686";
  const [hasConsent, setHasConsent] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'true') {
      setHasConsent(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        
        {hasConsent ? (
          <FacebookFedd url={mojadresa}/>
        ) : (
          <div className="max-w-4xl mx-auto my-10 p-10 bg-white/50 rounded-3xl border-2 border-dashed border-purple-200 text-center">
            <p className="text-gray-600">
              Pre zobrazenie noviniek z Facebooku je potrebné povoliť cookies.
            </p>
          </div>
        )}
        <Contact />
      </main>
      <Footer />
      <HelpButton />
      {!hasConsent && <CookieConsent onAccept={() => setHasConsent(true)} />}
      {//<PrivacyModal />
}
    </div>
  )
}

export default App
