import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import Fb from './FacebookFeed.jsx'
import { Header } from './Header.jsx'
import { Hero } from './Hero.jsx'
import Footer from './Footer.jsx'
import { About } from './About.jsx'
import Products from './Products.jsx'
import FacebookFedd from './FacebookFeed.jsx'
import Contact from './Contact.jsx'
import { HelpButton } from './HelpButton'
import { Projects } from './Projects.jsx'

function App() {
  const mojadresa = "https://www.facebook.com/profile.php?id=61579157963686";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Products />
        <FacebookFedd url={mojadresa}/>
        <Contact />
      </main>
      <Footer />
      <HelpButton />
    </div>
  )
}

export default App
