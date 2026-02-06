import { Heart } from "lucide-react";

export function HelpButton() {
  const scrollToContact = () => {
    const element = document.getElementById("kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300 animate-pulse"
      aria-label="Chcem pomôcť"
    >
      <Heart className="w-5 h-5 fill-white" />
      <span className="font-medium">Chcem pomôcť</span>
    </button>
  );
}
