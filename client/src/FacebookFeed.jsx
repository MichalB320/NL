import { useEffect } from "react";
import { Facebook } from "lucide-react";

export default function FacebookFeed({url}) {
  useEffect(() => {
    // Load Facebook SDK
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <section id="aktuality" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Zmena: flex-col pre mobil, flex-row pre počítač (md:) */}
    <div className="flex flex-col md:flex-row gap-12 items-center">
      
      {/* ĽAVÁ STRANA - TEXT (Zaberá 50% na počítači) */}
      <div className="flex flex-col md:w-1/2 text-center md:text-left"> 
        <div className="inline-flex items-center justify-center md:justify-start">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Facebook className="text-blue-600" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Sledujte naše aktuality
        </h2>
        <p className="text-lg text-gray-600">
          Buďte v kontakte s našimi najnovšími aktivitami, podujatiami a príspevkami.
          Sledujte nás na Facebooku a staňte sa súčasťou našej komunity.
        </p>
      </div>

      {/* PRAVÁ STRANA - FACEBOOK (Zaberá zvyšných 50%) */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="bg-gray-50 rounded-2xl p-3 sm:p-5 shadow-inner">
          {/* Tu som opravil class na className */}
          <div 
            className="fb-page" 
            data-href="https://www.facebook.com/profile.php?id=61579157963686" 
            data-tabs="timeline" 
            data-width="350" 
            data-height="630" 
            data-small-header="false" 
            data-adapt-container-width="false" 
            data-hide-cover="false" 
            data-show-facepile="true"
          >
            <blockquote cite="https://www.facebook.com/profile.php?id=61579157963686" className="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/profile.php?id=61579157963686">Nebuď Ľahostajný</a>
            </blockquote>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
  );
}



/*
import { useEffect } from 'react';

const FacebookFeed = ({ url }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <section id="aktuality" className="py-20 bg-white">
    <div 
        class="fb-page" 
        data-href="https://www.facebook.com/profile.php?id=61579157963686" 
        data-tabs="timeline" 
        data-width="400" 
        data-height="600" s
        data-small-header="false" 
        data-adapt-container-width="true" 
        data-hide-cover="false" 
        data-show-facepile="true"
    >
        <blockquote cite="https://www.facebook.com/profile.php?id=61579157963686" class="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/profile.php?id=61579157963686">Nebuď Ľahostajný</a>
        </blockquote>
    </div>
    </section>
  );
};

export default FacebookFeed;

*/