import { Heart, HandHeart, Backpack, Bus, Gift, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import Matky from './assets/nase-projekty/matky.jpg';
import Aut_Karta from './assets/nase-projekty/autobusova_karta.jpg';
import Mik_balik from './assets/nase-projekty/mikulassky_balicek.jpg';
import Taska from './assets/nase-projekty/taska.jpg';

export function Projects() {
  const projects = [
    {
      icon: HandHeart,
      title: "Pomoc ženám v núdzi",
      image: Matky,
      description: "Mnohé ženy prežívajú domáce násilie alebo ostali samy s deťmi, bez zázemia a podpory. Často utekajú len s tým, čo majú na sebe, bez finančných prostriedkov či základných vecí pre deti.",
      help: "Pomôcť mi môžeš darovaním potravín, hygienických potrieb, oblečenia, hračiek, alebo finančným príspevkom, vďaka ktorému im vieme zabezpečiť akútnu pomoc a bezpečie."
    },
    {
      icon: Backpack,
      title: "Batôžtek nádeje",
      image: Taska,
      description: "Pripravte školskú tašku alebo batôžtek s pomôckami pre dieťa, ktoré to potrebuje. Vhodné sú zošity, perá, pastelky, peračníky, pravítka či športové vrecúška.",
      help: "Ak chcete, pridajte aj krátky povzbudivý odkaz - poteší rovnako ako darované veci."
    },
    {
      icon: Bus,
      title: "Nabi kartu - daruj cestu",
      image: Aut_Karta,
      description: "Mnohé deti zo sociálne slabších rodín sa nedostanú do školy alebo na krúžky, pretože si nemôžu dovoliť cestu autobusom. Deti však nemôžu za situáciu svojich rodičov.",
      help: "Aj malý príspevok znamená, že dieťa sa dostane tam, kam potrebuje."
    },
    {
      icon: Gift,
      title: "Mikulášsky balíček",
      image: Mik_balik,
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
    <section id="nase-projekty" className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-slate-950 dark:via-purple-950/40 dark:to-indigo-950 transition-colors duration-300">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">
              Naše projekty
            </h2>
            <p className="text-lg text-gray-600 dark:text-purple-200/80 max-w-3xl mx-auto leading-relaxed mb-8 transition-colors">
              Vaša pomoc môže mať mnoho podôb. Vyberte si tú, ktorá je vám najbližšia.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#81007f] dark:bg-purple-600 rounded-full shadow-lg dark:shadow-purple-900/50">
              <Heart className="text-white w-5 h-5 fill-white" />
              <span className="font-semibold text-white">Podaj pomocnú ruku</span>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-10 snap-x snap-mandatory px-10">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="min-w-[80vw] md:min-w-[400px] snap-center bg-white dark:bg-purple-950/50 dark:backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg dark:shadow-purple-950/60 border border-transparent dark:border-purple-800/40 hover:shadow-xl dark:hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="h-44">
                  <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-shrink-0 w-9 h-9 bg-purple-100 dark:bg-purple-900/60 rounded-xl flex items-center justify-center">
                          <IconComponent className="text-[#81007f] dark:text-purple-300" size={19} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-center text-sm">
                        {project.description}
                      </p>
                      <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-purple-900/40 dark:to-indigo-900/40 rounded-xl p-4 border-l-4 border-[#81007f] dark:border-purple-400">
                        <p className="text-gray-700 dark:text-purple-200 leading-relaxed font-medium text-xs">
                          💝 {project.help}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        const element = document.getElementById("kontakt");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#81007f] dark:bg-purple-600 text-white rounded-full hover:bg-[#6a0069] dark:hover:bg-purple-500 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      Chcem pomôcť
                    </button>
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