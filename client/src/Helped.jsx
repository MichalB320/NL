import { Action } from "./components/Action.jsx";
import MariolaMikulas from "./assets/mariola_mikulas.jpeg";
import Deti from "./assets/deti.jpg";
import DetiMikulas from "./assets/deti_mikulas.jpeg";
import JankoBalicek from "./assets/IMG_4668.jpeg";
import Balik from "./assets/IMG_4648.jpeg";
import Clenky from "./assets/IMG_0816.jpeg";

export function HelpedSection() {
  const actions = [
    {
      id: 1,
      title: "Mikuláš pre deti",
      date: "December 2025",
      description: "V decembri sa naše občianske združenie Nebuď ľahostajný rozhodlo priniesť radosť deťom z rodín zo sociálne slabšieho prostredia v okrese Skalica. Oslovili sme sponzorov aj širokú verejnosť s prosbou o pomoc pri príprave mikulášskych balíčkov. Vďaka veľkej ochote a podpore sa nám podarilo vyzbierať približne 100 balíčkov plných sladkostí a drobných prekvapení. Následne sme ich spolu s ozajstným Mikulášom osobne rozvážali priamo do rodín po celom okrese. Mikuláš navštívil deti u nich doma, vypočul si krásne básničky a odmenil ich balíčkom. Pre niektoré deti to bola dokonca úplne prvá návšteva Mikuláša v živote. Nechýbali úsmevy, detská radosť, ale ani slzičky dojatia. Celá mikulášska akcia dopadla nad naše očakávania a opäť nám pripomenula, že aj malé gesto môže priniesť veľa radosti. Ďakujeme všetkým sponzorom, Reštaurácia Jozef II., LiFicaffe okienko, Senica, Materským školám Hurbanova a Hviezdoslavova v Skalici, Pánovi doktori PhDr. PaedDr. Mgr. Ivanovi Balážimu MBA, DBA, DSc a všetkým ľuďom s dobrým srdcom, ktorí nám pomohli túto krásnu myšlienku premeniť na skutočnosť. Nebuďme ľahostajní, podajme pomocnú ruku. ♥",
      images: [
        MariolaMikulas,
        Deti,
        JankoBalicek,
        Balik,
        DetiMikulas,
        Clenky
      ]
    },
  ];

  return (
    <section id="pomohli-sme" className="py-20 px-4 relative bg-gradient-to-bl from-indigo-100 via-white to-purple-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main glass card container */}
        <div className="bg-white/60 rounded-3xl shadow-2xl border border-white/30 p-5 md:p-12 lg:p-16">
          {/* Header */}    
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pomohli sme
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Každá akcia, každé stretnutie a každý dobrý skutok nás posúva bližšie k vytvoreniu 
              sveta plného lásky a súcitu. Pozrite si, čo sa nám spolu podarilo.
            </p>
          </div>

          {/* Actions list */}
          <div className="space-y-12">
            {actions.map((action) => (
              <Action key={action.id} action={action}/>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}