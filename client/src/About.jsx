import { useEffect, useState } from "react";
import { Heart, Sparkles, Loader2 } from "lucide-react";
import { TeamMember } from './components/TeamMember.jsx';
import { supabase } from "./supabaseClient.js";

export function About() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase.from("Member").select("*").order("id", { ascending: true });

        if (error) throw error;

        setTeamData(data || []);

      } catch (error) {
        console.error("Chyba pri načítaní údajov o tíme:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 italic">Načítavam členov tímu...</p>
      </div>
    );
  }
  
  return (
    <section id="o-nas" className="py-20 px-2 md:px-4 lg:px-4 relative transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Glass card container */}
        <div className="bg-white/50 dark:bg-indigo-950/70 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-fuchsia-950/50 border border-white/30 dark:border-fuchsia-500/20 p-4 md:p-6 lg:p-12 transition-colors duration-300">
          {/* Team Section */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-3 transition-colors">
              Náš tím
            </h1>

            { teamData.map((member) => (
              <TeamMember 
                key={member.id}
                name={ member.name } 
                role={ member.rola }
                image={ member.fotka } 
                icon={ member.id === 1 ? Heart : Sparkles } 
                quote={ member.quote } 
                description={ member.popis }  
              />
            ))}
        
          </div>
        </div>
      </div>
    </section>
  );
}