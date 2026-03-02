import React, { useState } from 'react';

export function CookieConsent({ onAccept }) {
  const [showBanner, setShowBanner] = useState(true);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    onAccept();
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Používateľ povedal NIE. Facebook sa nespustí, lišta zmizne.
    // Uložíme si to do sessionStorage, aby ho to neotravovalo pri každom prekliku, 
    // ale pri novom otvorení webu sa ho spýtame znova.
    sessionStorage.setItem('cookie-declined', 'true');
    setShowBanner(false);
  };

  // Ak sme lištu zavreli, nič nevyykresľujeme
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000] p-4 md:p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-purple-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        
        {/* Textová časť so scrollboxom */}
        <div className="flex-grow">
          <h4 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
            Chránime vaše súkromie 🍪 
            <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Právne informácie</span>
          </h4>
          
          {/* Scrollbox s textom GDPR */}
          <div className="h-32 overflow-y-auto bg-gray-50 p-4 rounded-xl text-xs text-gray-500 leading-relaxed border border-gray-100 mb-2">
            <p className="font-bold text-gray-700 mb-2 underline">Informácie o spracúvaní osobných údajov:</p>
            <p className="mb-2"><strong>Prevádzkovateľ:</strong> NELA - Nebuď ľahostajný, Sídlo: Na križovatkách 18397/27A 821 04 Bratislava - Ružinov, IČO: 56 216 211.</p>
            <p className="mb-2"><strong>Účel:</strong> Vaše údaje spracúvame na účely prezentácie činnosti združenia a zobrazenia noviniek zo sociálnej siete Facebook.</p>
            <p className="mb-2"><strong>Facebook Plugin:</strong> Na webe používame sociálny plugin Meta Platforms Ireland Ltd. Po udelení súhlasu dochádza k prenosu údajov (IP adresa). Tieto údaje sa ukladajú v prehliadači ako súbory cookies.</p>
            <p className="mb-2"><strong>Vaše práva:</strong> Máte právo na prístup, opravu alebo vymazanie údajov. Kontakt: info@nebudlahostajny.sk.</p>
            <p className="italic">Pokračovaním a kliknutím na tlačidlo súhlasíte s vyššie uvedenými podmienkami.</p>
          </div>
          
          <p className="text-[11px] text-gray-400">
            Pre plnohodnotný zážitok (napr. zobrazenie Facebook príspevkov) potrebujeme váš súhlas.
          </p>
        </div>

        {/* Akčné tlačidlá */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto self-center">
          <button 
            onClick={handleDecline}
            className="btn btn-ghost btn-sm text-gray-400 hover:text-gray-600 order-2 sm:order-1"
          >
            Odmietnuť
          </button>
          <button 
            onClick={handleAccept}
            className="btn bg-[#81007f] hover:bg-[#6a0069] text-white border-none px-10 rounded-full shadow-lg shadow-purple-200 order-1 sm:order-2"
          >
            Rozumiem a súhlasím
          </button>
        </div>
      </div>
    </div>
  );
}