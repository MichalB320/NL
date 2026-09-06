import { Heart } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function TeamMember({ name, role, description, image, icon: Icon, quote }) {
  let iconClass = "mr-2 flex-shrink-0";
  let quoteBar = quote;
  
  if (Icon === Heart) {
    iconClass += " text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400"; 
  } else {
    iconClass += " text-pink-400 dark:text-fuchsia-300";
  } 

  return (
    <div className="bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-amber-50/80 dark:from-slate-900/60 dark:via-purple-950/40 dark:to-indigo-950/60 backdrop-blur-none lg:backdrop-blur-lg rounded-3xl p-4 md:p-8 lg:p-12 shadow-xl border border-violet-200/50 dark:border-purple-800/40 transition-colors duration-300">
      <div className="grid md:grid-cols-3 gap-8 items-start">
                
        {/* Foto a meno */}
        <div className="md:col-span-1">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/50 dark:ring-purple-500/20">
              <ImageWithFallback
                src={ image }
                loading="eager"
                fetchPriority="high"
                alt={ name }
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="text-center mt-6 bg-white/60 dark:bg-slate-950/60 backdrop-blur-none lg:backdrop-blur-sm rounded-2xl p-4 shadow-md border border-transparent dark:border-purple-800/30 transition-colors">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{ name }</h4>
            <p className="text-[#81007f] dark:text-fuchsia-300 font-medium">{ role }</p>
          </div>
        </div>
                
        {/* Popis a citat */}
        <div className="md:col-span-2">
          <div className="prose prose-lg max-w-none">
            
            <p className="text-gray-700 dark:text-gray-200 text-center md:text-justify leading-relaxed mb-4 transition-colors" dangerouslySetInnerHTML={{ __html: description }}></p>

            { (() => {
              if (quoteBar !== "") {
                return (
                  <div className="bg-white/80 dark:bg-slate-950/70 backdrop-blur-none lg:backdrop-blur-lg rounded-xl p-4 border-l-4 border-[#81007f] dark:border-fuchsia-400 shadow-md transition-colors">
                    <p className="text-gray-700 dark:text-gray-100 leading-relaxed flex items-center">
                      { Icon && <Icon className={ iconClass } size={ 20 } /> }
                      <strong>{ quote }</strong>
                    </p>
                  </div>
                );
              } else {
                return null;
              }
            })()
            }
          </div>
        </div>
      </div>
    </div>
  );
}