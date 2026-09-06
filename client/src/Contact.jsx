import { BadgeEuro, CreditCard, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

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
    },/*
    {
      icon: Clock,
      title: "Úradné hodiny",
      details: ["Nepretržite"],
      link: null
    },*/
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
    <section id="kontakt" className="py-20 px-2 md:px-4 relative transition-colors duration-300">
      
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/70 dark:bg-slate-900/60 dark:backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-purple-800/40 p-4 md:p-12 lg:p-16 transition-colors">
          <div className="text-center pt-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">Ozvite sa nám</h2>
            <p className="text-lg text-gray-600 dark:text-purple-200/80 max-w-3xl mx-auto transition-colors">
              Neváhajte nás kontaktovať. Či už potrebujete pomoc, alebo chcete pomôcť iným.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const isClickable = !!info.link;
              
              // Spoločné štýly pre kartu
              const cardClass = `bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col items-center text-center border border-violet/20 dark:border-purple-800/30 ${
                isClickable ? "hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-500 cursor-pointer group" : ""
              }`;

              // Obsah karty
              const cardContent = (
                <>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-950/60 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-[#81007f] dark:text-purple-300" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 transition-colors">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, dIdx) => (
                      <p key={dIdx} className="text-gray-600 dark:text-purple-200/70 text-sm transition-colors">{detail}</p>
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