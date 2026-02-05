import { Heart, HandHeart, Smile, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";

export function About() {
  const features = [
    {
      icon: Heart,
      title: "Empatia",
      description: "S porozumením načúvame každému príbehu a s láskou pomáhame tým, ktorí to potrebujú."
    },
    {
      icon: HandHeart,
      title: "Podpora",
      description: "Poskytujeme nielen materiálnu, ale hlavne emocionálnu a duchovnú podporu."
    },
    {
      icon: Smile,
      title: "Nádej",
      description: "Veríme, že každý si zaslúži šancu na lepší život a šťastnejšiu budúcnosť."
    },
    {
      icon: Sparkles,
      title: "Zmena",
      description: "Každý dobrý skutok vytvára vlnový efekt pozitívnych zmien v celej komunite."
    }
  ];

  return (
    <section id="o-nas" className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sme tu pre vás
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Každý deň sa stretávame s ľuďmi, ktorí potrebujú niekoho, kto im počúvne, 
            porozumie a pomôže. Sme nezávislé občianske združenie, ktoré vzniklo 
            z túžby priniesť viac lásky a tepla do životov ľudí okolo nás.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mb-4">
                  <IconComponent className="text-rose-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Náš tím
          </h3>

          {/* Founder Profile */}
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-lg mb-8">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="rounded-2xl overflow-hidden shadow-xl mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1552406416-272abc535d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwd2FybSUyMGNhcmluZ3xlbnwxfHx8fDE3NzAyNzczODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Zakladateľka OZ"
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-1">Mariola Janíková</h4>
                  <p className="text-rose-500 font-medium">Zakladateľka OZ Nebuď ľahostajný</p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Volám sa <strong>Mariola Janíková</strong> a som zakladateľka OZ Nebuď ľahostajný. V minulosti som pracovala ako manažérka prosperujúcej firmy, no cítila som, že potrebujem ísť inou cestou. Po vyštudovaní som začala pracovať v sociálnej sfére, kde pôsobím už šesť rokov.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Pracujem s ľuďmi závislými, bez domova, s týranými osobami či s deťmi, ktoré nikdy nepoznali stabilný domov. Pomáham plniť sny chorým deťom, aj tým, ktoré bojujú o posledné chvíle svojho života. Príbehy týchto ľudí sú plné bolesti, strachu a rezignácie… a niekedy sa pýtam samej seba, prečo je pre nich takéťažké prestať opakovať tie isté chyby.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ale viem, že aj ja robím chyby a celoživotne sa na nich učím. Prešla som si v živote rôznymi skúškami a práve tie ma naučili byť viac autentická a chápavá. Vďaka nim viem, aké dôležité je pristupovať k ľuďom s empatiou, trpezlivosťou a otvoreným srdcom.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Za sebou mám niekoľko akreditovaných výcvikov: krízovú intervenciu, psychologickú a sociálnu pomoc v krízových situáciách prostredníctvom internetu a tiež odborných výcvikov projektový špecialista, projektový manažér, motivačné rozhovory v práci s klientami v sociálnoprávnej ochrane detí a sociálnej kurately, prípadová sociálna práca, sociálna práca a sociálne služby, metódy a techniky sociálnej práce a iné.
                  </p>
                  <p className="text-gray-700 leading-relaxed flex items-center">
                    <Heart className="text-rose-400 mr-2 flex-shrink-0" size={20} />
                    <strong>Nebuď ľahostajný nie je len názov – je to moja životná cesta. A budem rada, ak sa na ňu pridáte aj vy.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member Profile */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="rounded-2xl overflow-hidden shadow-xl mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1563263427-708318a97183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZHJlbiUyMGZhbWlseSUyMHdhcm18ZW58MXx8fHwxNzcwMjc3Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Členka tímu"
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-1">Lesana</h4>
                  <p className="text-rose-500 font-medium">Členka tímu</p>
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-center">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Lesana</strong> je členkou nášho tímu. Je to mama troch detí, ktorá má veľké srdce a dlhodobo sa venuje podpore žien v ťažkých životných situáciách.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Organizuje zbierky, pomáha obetiam domáceho násilia a stojí po boku žien, ktoré potrebujú oporu. Počúva, motivuje a sprevádza.
                  </p>
                  <p className="text-gray-700 leading-relaxed flex items-center">
                    <Sparkles className="text-rose-400 mr-2 flex-shrink-0" size={20} />
                    <strong>Je dôkazom toho, že aj bežný človek môže byť silnou oporou pre iných.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
