import { Heart, HandHeart, Backpack, Bus, Gift, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";

export function Projects() {
  const projects = [
    {
      icon: HandHeart,
      title: "Pomoc ženám v núdzi",
      image: "https://images.unsplash.com/photo-1758526387966-381b2a558748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRvbWVzdGljJTIwdmlvbGVuY2UlMjBzdXBwb3J0JTIwaGVscHxlbnwxfHx8fDE3NzAyNzczODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mnohé ženy prežívajú domáce násilie alebo ostali samy s deťmi, bez zázemia a podpory. Často utekajú len s tým, čo majú na sebe, bez finančných prostriedkov či základných vecí pre deti.",
      help: "Pomôcť mi môžeš darovaním potravín, hygienických potrieb, oblečenia, hračiek, alebo finančným príspevkom, vďaka ktorému im vieme zabezpečiť akútnu pomoc a bezpečie."
    },
    {
      icon: Backpack,
      title: "Batôžtek nádeje",
      image: "https://images.unsplash.com/photo-1654112260750-62e27953e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBiYWNrcGFjayUyMHN1cHBsaWVzJTIwY2hpbGRyZW58ZW58MXx8fHwxNzcwMjc3MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Pripravte školskú tašku alebo batôžtek s pomôckami pre dieťa, ktoré to potrebuje. Vhodné sú zošity, perá, pastelky, peračníky, pravítka či športové vrecúška.",
      help: "Ak chcete, pridajte aj krátky povzbudivý odkaz - poteší rovnako ako darované veci."
    },
    {
      icon: Bus,
      title: "Nabi kartu - daruj cestu",
      image: "https://images.unsplash.com/photo-1758908176211-5bd0932f956a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc3BvcnQlMjBjYXJkJTIwdHJhdmVsfGVufDF8fHx8MTc3MDI3NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mnohé deti zo sociálne slabších rodín sa nedostanú do školy alebo na krúžky, pretože si nemôžu dovoliť cestu autobusom. Deti však nemôžu za situáciu svojich rodičov.",
      help: "Aj malý príspevok znamená, že dieťa sa dostane tam, kam potrebuje."
    },
    {
      icon: Gift,
      title: "Mikulášsky balíček",
      image: "https://images.unsplash.com/photo-1640672927297-c559cfc7b5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBnaWZ0cyUyMGNoaWxkcmVuJTIwcGFja2FnZXN8ZW58MXx8fHwxNzcwMjc3MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Spravte radosť dieťaťu na Mikuláša! Môžete pripraviť vlastný balíček so sladkosťami a drobnosťami.",
      help: "Alebo nám prispieť finančne - balíček radi pripravíme za vás."
    },
    {
      icon: Mail,
      title: "List pre odvážne dieťa",
      image: "https://images.unsplash.com/photo-1740679953597-f0b9e03e1645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGxldHRlciUyMHdyaXRpbmclMjBlbmNvdXJhZ2VtZW50fGVufDF8fHx8MTc3MDI3NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Slová povzbudenia majú veľkú silu. Napíšte krátky list, pohľadnicu alebo nakreslite obrázok, ktorý odovzdáme deťom v ťažkých životných situáciách.",
      help: "Môže to byť pár viet: \"Myslím na teba, si silný/á, nevzdávaj sa.\" Pre dieťa, ktoré často počúva opak, to znamená obrovskú podporu."
    }
  ];

  return (
    <section id="nase-projekty" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Naše projekty
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Vaša pomoc môže mať mnoho podôb. Vyberte si tú, ktorá je vám najbližšia.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#81007f] rounded-full">
            <Heart className="text-white w-5 h-5 fill-white" />
            <span className="font-semibold text-white">Podaj pomocnú ruku</span>
          </div>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 h-64 md:h-auto">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-3 p-8 md:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
                        <IconComponent className="text-[#81007f]" size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-4 border-l-4 border-[#81007f]">
                          <p className="text-gray-700 leading-relaxed font-medium">
                            💝 {project.help}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          const element = document.getElementById("kontakt");
                          if (element) element.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#81007f] text-white rounded-full hover:bg-[#6a0069] hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        Chcem pomôcť
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}