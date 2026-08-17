import React, { useEffect, useState } from "react";
import { Action } from "./components/Action.jsx";
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
          //console.log("Actions state updated:", actions);
        }

      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }

    fetchData();
  }, []);

 

  return (
    <section id="pomohli-sme" className="py-20 px-2 md:px-4 lg:px-4 relative bg-gradient-to-bl from-indigo-100 via-white to-purple-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main glass card container */}
        <div className="bg-white/60 rounded-3xl shadow-2xl border border-white/30 p-3 md:p-6 lg:p-12">
          {/* Header */}    
          <div className="text-center pt-5 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pomohli sme
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Každá akcia, každé stretnutie a každý dobrý skutok nás posúva bližšie k vytvoreniu 
              sveta plného lásky a súcitu. Pozrite si, čo sa nám spolu podarilo.
            </p>
          </div>

          {/* Actions list */}
          <div className="space-y-9">
            {actions.map((action) => (
              <Action key={action.id} action={action}/>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}