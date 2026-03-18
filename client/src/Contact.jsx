import { BadgeEuro, CreditCard, MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export function Contact() {
  const contactInfo = [
    {
      icon: BadgeEuro,
      title: "Kontakt pre sponzorov",
      details: ["mariola.janikova@nebudlahostajny.sk"],
      link: "mailto:mariola.janikova@nebudlahostajny.sk"
    },
    {
      icon: CreditCard,
      title: "IBAN",
      details: ["SK29 0200 0000 0050 5482 6759", "Ďakujeme za každý, aj malý príspevok."]
    },
    {
      icon: MapPin,
      title: "Adresa",
      details: ["Skalica SNP", "909 01 Skalica", "Slovenská republika"],
      link: "https://www.google.com/maps/search/?api=1&query=SNP+Skalica+90901"
    },
    {
      icon: Phone,
      title: "Telefón",
      details: ["+421 902 564 645"],
      link: "tel:+421902564645"
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["info@nebudlahostajny.sk", "mariola.janikova@nebudlahostajny.sk"],
      link: "mailto:info@nebudlahostajny.sk"
    },
    {
      icon: Clock,
      title: "Úradné hodiny",
      details: ["Nepretržite"],
      link: null
    },
    {
      icon: Facebook,
      title: "Facebook",
      details: ["www.facebook.com/profile.php?id=61579157963686"],
      link: "https://www.facebook.com/profile.php?id=61579157963686"
    },
    {
      icon: Instagram,
      title: "Instagram",
      details: ["www.instagram.com/nebud_lahostajny/","#NebudLahostajny"],
      link: "https://www.instagram.com/nebud_lahostajny/"
    },
  ];

  return (
    <section id="kontakt" className="py-20 px-4 relative">
      
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ozvite sa nám</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Neváhajte nás kontaktovať. Či už potrebujete pomoc, alebo chcete pomôcť iným.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const isClickable = !!info.link;
              
              // Spoločné štýly pre kartu
              const cardClass = `bg-white rounded-2xl p-6 shadow-md transition-all duration-300 flex flex-col items-center text-center border border-transparent ${
                isClickable ? "hover:shadow-xl hover:border-purple-200 cursor-pointer group" : ""
              }`;

              // Obsah karty
              const cardContent = (
                <>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, dIdx) => (
                      <p key={dIdx} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </>
              );

              // Logika: Ak je klikateľná, vrátime <a>, inak <div>
              return isClickable ? (
                <a 
                  key={index} 
                  href={info.link} 
                  target={info.link.startsWith('http') ? "_blank" : "_self"} 
                  rel="noopener noreferrer" 
                  className={cardClass}
                >
                  {cardContent}
                </a>
              ) : (
                <div key={index} className={cardClass}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}