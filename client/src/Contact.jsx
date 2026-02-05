import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresa",
      details: [
        "Skalica SNP",
        "909 01 Skalica",
        "Slovenská republika"
      ]
    },
    {
      icon: Phone,
      title: "Telefón",
      details: [
        "+421 902 564 645"
      ]
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "info@nebudlahostajny.sk",
        "mariola.janikova@nebudlahostajny.sk"
      ]
    },
    {
      icon: Clock,
      title: "Úradné hodiny",
      details: [
        "Nepretržite"
      ]
    },
  ];

  return (
    <section id="kontakt" className="py-20 px-4 relative">
      {/* Decorative blur circles */}
      
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Glass card container */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ozvite sa nám
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Neváhajte nás kontaktovať. Či už potrebujete pomoc, alebo chcete 
              pomôcť iným - budeme radi, keď sa ozvete. Žiadna otázka nie je príliš malá.
            </p>
          </div>

            


            {/* Contact Information */}
            <div>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex-col items-center text-center"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl mb-4 self-center">
                        <IconComponent className="text-rose-500" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              
            </div>

            
          
        </div>
      </div>
    </section>
  );
}