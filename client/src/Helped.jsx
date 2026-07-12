import React, { useEffect, useState } from "react";
import { Action } from "./components/Action.jsx";
/*
import MariolaMikulas from "./assets/pomohli-sme/mariola_mikulas.jpeg";
import Deti from "./assets/pomohli-sme/deti.jpg";
import DetiMikulas from "./assets/pomohli-sme/deti_mikulas.jpeg";
import JankoBalicek from "./assets/pomohli-sme/IMG_4668.jpeg";
import Balik from "./assets/pomohli-sme/IMG_4648.jpeg";
import Clenky from "./assets/pomohli-sme/IMG_0816.jpeg";
import Adam from "./assets/pomohli-sme/IMG_4496.jpeg";
import Plysak from "./assets/pomohli-sme/mariola_plysak.jpeg";
import OZ from "./assets/pomohli-sme/OZ.jpg";
import Sabi from "./assets/pomohli-sme/sabi.jpeg";
import DM from "./assets/pomohli-sme/dm.jpeg";
import DM2 from "./assets/pomohli-sme/dm2.jpeg";
*/
import { supabase } from "./supabaseClient";

export function HelpedSection() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("Help").select("*").order("date", { ascending: false });
        
        const formattedData = (data || []).map(item => {
          let formattedDate = item.date;
  
          if (item.date) {
            const dateObj = new Date(item.date);
    
            // Intl.DateTimeFormat vráti napr. "jún 2025"
            const rawDate = new Intl.DateTimeFormat('sk-SK', { month: 'long', year: 'numeric' }).format(dateObj);
    
            // Zväčšíme prvé písmeno mesiaca, aby to vyzeralo pekne: "Jún 2025"
            formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
          }

          return {
            ...item,
            date: formattedDate 
          };
        });

        if (error) {
          console.error("Error fetching actions:", error);
        } else {
          setActions(formattedData);
          console.log("Actions state updated:", actions);
        }

      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }

    fetchData();
  }, []);

 

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