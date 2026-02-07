import { Heart } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback"

export function TeamMember({ name, role, description, image, icon: Icon, quote }) {
  let iconClass = "mr-2 flex-shrink-0";
  
  if (Icon == Heart) {
    iconClass += " text-red-500 fill-red-500"; 
  } else {
    iconClass += " text-pink-400";
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-amber-50/80 backdrop-blur-lg rounded-3xl p-6 md:p-12 shadow-xl border border-white/40">
      <div className="grid md:grid-cols-3 gap-8 items-start">
                
        {/* Foto a meno */}
        <div className="md:col-span-1">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/50">
              <ImageWithFallback
                src={ image }
                alt={ name }
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="text-center mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md">
            <h4 className="text-2xl font-bold text-gray-800 mb-1">{ name }</h4>
            <p className="text-[#81007f] font-medium">{ role }</p>
          </div>
        </div>
                
        {/* Popis a citat */}
        <div className="md:col-span-2">
          <div className="prose prose-lg max-w-none">
            { description }
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-l-4 border-[#81007f] shadow-md">
              <p className="text-gray-700 leading-relaxed flex items-center">
                { Icon && <Icon className={ iconClass } size={ 20 } /> }
                <strong>{ quote }</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}