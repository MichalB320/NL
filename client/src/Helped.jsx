import { Action } from "./components/Action.jsx";
import MariolaMikulas from "./assets/pomohli-sme/mariola_mikulas.jpeg";
import Deti from "./assets/pomohli-sme/deti.jpg";
import DetiMikulas from "./assets/pomohli-sme/deti_mikulas.jpeg";
import JankoBalicek from "./assets/pomohli-sme/IMG_4668.jpeg";
import Balik from "./assets/pomohli-sme/IMG_4648.jpeg";
import Clenky from "./assets/pomohli-sme/IMG_0816.jpeg";
import Adam from "./assets/pomohli-sme/IMG_4496.jpeg";

export function HelpedSection() {
  const actions = [
    {
      id: 0,
      title: "Mikuláš pre deti",
      date: "December 2025",
      description: "V decembri sa naše občianske združenie Nebuď ľahostajný rozhodlo priniesť radosť deťom z rodín zo sociálne slabšieho prostredia v okrese Skalica. Oslovili sme sponzorov aj širokú verejnosť s prosbou o pomoc pri príprave mikulášskych balíčkov. Vďaka veľkej ochote a podpore sa nám podarilo vyzbierať približne 100 balíčkov plných sladkostí a drobných prekvapení. Následne sme ich spolu s ozajstným Mikulášom osobne rozvážali priamo do rodín po celom okrese. Mikuláš navštívil deti u nich doma, vypočul si krásne básničky a odmenil ich balíčkom. Pre niektoré deti to bola dokonca úplne prvá návšteva Mikuláša v živote. Nechýbali úsmevy, detská radosť, ale ani slzičky dojatia. Celá mikulášska akcia dopadla nad naše očakávania a opäť nám pripomenula, že aj malé gesto môže priniesť veľa radosti. Ďakujeme všetkým sponzorom, Reštaurácia Jozef II., LiFicaffe okienko, Senica, Materským školám Hurbanova a Hviezdoslavova v Skalici, Pánovi doktori PhDr. PaedDr. Mgr. Ivanovi Balážimu MBA, DBA, DSc a všetkým ľuďom s dobrým srdcom, ktorí nám pomohli túto krásnu myšlienku premeniť na skutočnosť. Nebuďme ľahostajní, podajme pomocnú ruku. ❤️",
      images: [
        MariolaMikulas,
        Deti,
        JankoBalicek,
        Balik,
        DetiMikulas,
        Clenky
      ]
    },
    {
      id: 1,
      title: "Adamovi sme nakúpili oblečenie a nabili poukážku na autobus",
      date: "November 2025",
      description: "Adam je chlapec, ktorý už v mladom veku vie, aké to je byť umiestnený v detskom domove. Chlapec, ktorý stále hľadá odpoveď na otázky, kde je jeho domov a kam patrí.V rámci predvianočnej zbierky sme sa rozhodli Adamovi pomôcť. Zobrali sme ho do obchodného centra, aby si mohol aspoň na chvíľu vyskúšať, aké je to byť „obyčajným“ dieťaťom v našom ponímaní bežného sveta. Spoločne sme mu vybrali nové oblečenie, obliekli sme ho do novučkých vecí a kúpili sme mu aj topánky.Súčasťou našej pomoci bolo aj nabitie autobusovej karty, aby mohol pravidelne a bez problémov dochádzať do školy. Možno sa to zdajú byť malé skutky, no práve tie často vedú k veľkým veciam. Najväčšou odmenou pre nás bol Adamov úprimný úsmev.Ďakujeme všetkým sponzorom a ochotným darcom, vďaka ktorým sme mohli Adamovi spraviť radosť a ukázať mu, že na svete sú ľudia, ktorým na ňom záleží. Nebuďme ľahostajní ❤️",
      images: [Adam]
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