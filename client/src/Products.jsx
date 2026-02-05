import { BookOpen, Calendar, Lightbulb, HandHeart } from "lucide-react";

export default function Products() {
  const products = [
    {
      icon: BookOpen,
      title: "Vzdelávacie programy",
      description: "Organizujeme workshopy, semináre a školenia zamerané na osobný a profesionálny rozvoj.",
      features: [
        "Kurzy pre verejnosť",
        "Odborné školenia",
        "Mentoringové programy"
      ]
    },
    {
      icon: Calendar,
      title: "Komunitné podujatia",
      description: "Pravidelne usporadúvame stretnutia, kultúrne a spoločenské akce pre širokú verejnosť.",
      features: [
        "Mesačné stretnutia",
        "Kultúrne festivaly",
        "Networkingové eventy"
      ]
    },
    {
      icon: Lightbulb,
      title: "Projektové poradenstvo",
      description: "Pomáhame pri príprave a realizácii komunitných projektov a získavaní grantov.",
      features: [
        "Konzultácie zadarmo",
        "Projektový manažment",
        "Grantová podpora"
      ]
    },
    {
      icon: HandHeart,
      title: "Dobrovoľnícke programy",
      description: "Vytvárame príležitosti pre ľudí, ktorí chcú pomáhať a angažovať sa v komunite.",
      features: [
        "Lokálne projekty",
        "Spolupráca s NGO",
        "Environmentálne aktivity"
      ]
    }
  ];

  return (
    <section id="produkty" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Naše aktivity a služby
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ponúkame široké spektrum aktivít a služieb pre členov aj širokú verejnosť.
            Všetky naše programy sú prístupné a otvorené pre každého.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-lg mb-6">
                  <IconComponent className="text-blue-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg">
            <p className="text-lg">
              Zaujíma vás niektorá z našich aktivít? 
              <button 
                onClick={() => {
                  const element = document.getElementById("kontakt");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="ml-2 underline hover:no-underline font-semibold"
              >
                Kontaktujte nás
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
