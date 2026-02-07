import { Heart, Sparkles } from "lucide-react";
import Mariola from './assets/mariola.jpg';
import Lenka from './assets/lenka.jpg';
import { TeamMember } from './components/TeamMember.jsx';

export function About() {
  

  return (
    <section id="o-nas" className="py-20 px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Glass card container */}
        <div className="bg-white/70  rounded-3xl shadow-2xl border border-white/30 p-5 md:p-12 lg:p-16">
          

          {/* Team Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-1">
              Náš tím
            </h3>

            <TeamMember 
              name="Mariola Janíková" 
              role="Zakladateľka OZ Nebuď ľahostajný" 
              image={ Mariola } 
              icon={ Heart } 
              quote="Nebuď ľahostajný nie je len názov - je to moja životná cesta. A budem rada, ak sa na ňu pridáte aj vy." 
              description={
                <>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Volám sa <strong>Mariola Janíková</strong> a som zakladateľka OZ Nebuď ľahostajný. V minulosti som pracovala ako manažérka prosperujúcej firmy, no cítila som, že potrebujem ísť inou cestou. Po vyštudovaní som začala pracovať v sociálnej sfére, kde pôsobím už šesť rokov.</p>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Pracujem s ľuďmi závislými, bez domova, s týranými osobami či s deťmi, ktoré nikdy nepoznali stabilný domov. Pomáham plniť sny chorým deťom, aj tým, ktoré bojujú o posledné chvíle svojho života. Príbehy týchto ľudí sú plné bolesti, strachu a rezignácie… a niekedy sa pýtam samej seba, prečo je pre nich také ťažké prestať opakovať tie isté chyby.</p>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Ale viem, že aj ja robím chyby a celoživotne sa na nich učím. Prešla som si v živote rôznymi skúškami a práve tie ma naučili byť viac autentická a chápavá. Vďaka nim viem, aké dôležité je pristupovať k ľuďom s empatiou, trpezlivosťou a otvoreným srdcom.</p>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Za sebou mám niekoľko akreditovaných výcvikov: krízovú intervenciu, psychologickú a sociálnu pomoc v krízových situáciách prostredníctvom internetu a tiež odborných výcvikov projektový špecialista, projektový manažér, motivačné rozhovory v práci s klientami v sociálnoprávnej ochrane detí a sociálnej kurately, prípadová sociálna práca, sociálna práca a sociálne služby, metódy a techniky sociálnej práce a iné.</p>
                </>
              }  
            />

            <TeamMember
              name="Lenka"
              role="Členka tímu"
              image={ Lenka }
              icon={ Sparkles }
              quote="Aj malé skutky môžu viesť k veľkým zmenám."
              description={
                <>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4"><strong>Lenka</strong>  je členkou nášho tímu. Je všestrannou ženou pôsobiacou v rôznych organizáciách, ktorá má bohaté skúsenosti z viacerých oblastí sociálneho aj ekonomického života. Vďaka tomu dokáže vidieť súvislosti, chápať širší kontext problémov a ponúkať praktické riešenia. Aktuálne pracuje ako sociálna pracovníčka so zameraním sa na maloleté deti. Denne sa stretáva s rodinami v zložitých životných situáciach, ktoré vyžadujú pochopenie, trpezlivosť a odbornosť.</p>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Vo svojej praxi pomáha ľuďom zorientovať sa v ťažkých situáciách, hľadať riešenia a znovu nachádzať istotu. Počúva bez súdenia, podporuje a sprevádza krok za krokom.</p>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Ako sama tvrdí naučila sa nevšímať si problémy ľudí len z diaľky. Verí, že aj malé skutky môžu viesť k veľkým zmenám a že aktívny záujem o spoločnosť má zmysel.</p>
                </>
              }
            />
            
            <TeamMember 
              name="Lesana"
              role="Členka tímu"
              image="https://images.unsplash.com/photo-1563263427-708318a97183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZHJlbiUyMGZhbWlseSUyMHdhcm18ZW58MXx8fHwxNzcwMjc3Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              icon={ Sparkles }
              quote="Je dôkazom toho, že aj bežný človek môže byť silnou oporou pre iných."
              description={
                <>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4"><strong>Lesana</strong> je členkou nášho tímu. Je to mama troch detí, ktorá má veľké srdce a dlhodobo sa venuje podpore žien v ťažkých životných situáciách.</p>
                  <p className="text-gray-700 text-center md:text-left leading-relaxed mb-4">Organizuje zbierky, pomáha obetiam domáceho násilia a stojí po boku žien, ktoré potrebujú oporu. Počúva, motivuje a sprevádza.</p>
                </>
              }
            />
        
          </div>
        </div>
      </div>
    </section>
  );
}
