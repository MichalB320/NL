import React, { useState } from "react";
import { supabase } from "./../supabaseClient.js";
import { Loader2, PlusCircle, Image } from "lucide-react";

export function AdminMembers() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [eventText, setEventText] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = null;

    try {
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `o-nas/${fileName}`;

        const { error: uploadError, data } = await supabase.storage.from("NeLa-bucket").upload(filePath, file);

        if (uploadError) {
          throw new Error("Chyba pri nahrávaní obrázka: " + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage.from("NeLa-bucket").getPublicUrl(filePath);

        imageUrl =publicUrl;
      }

      const { error: dbError } = await supabase.from("Member").insert([
        { name, rola: role, quote, popis: eventText, fotka: imageUrl }
      ]);

      if (dbError) {
        throw new Error("Chyba pri ukladaní do databázy: " + dbError.message);
      }

      alert("Úspešne pridané do sekcie Členky!");
      
      setName(""); 
      setRole(""); 
      setQuote(""); 
      setEventText("");
      setFile(null);
      
      e.target.reset();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meno Priezvisko</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="napr. Mariola Janíková" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rola</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="napr. Členka tímu" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
        <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="napr. Aj malé skutky môžu viesť k veľkým zmenám." className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Popis</label>
        <textarea value={eventText} onChange={(e) => setEventText(e.target.value)} rows={6} placeholder="Sem napíš informácie... napr. <strong>Lesana</strong> je členkou nášho tímu. Je to mama troch detí, ktorá má veľké srdce a dlhodobo sa venuje podpore žien v ťažkých životných situáciách.<br/><br/> Organizuje zbierky, pomáha obetiam domáceho násilia a stojí po boku žien, ktoré potrebujú oporu. Počúva, motivuje a sprevádza." className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-sans" required />
      </div>
      {/* NOVÝ INPUT PRE FOTKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profilová fotka</label>
          <div className="relative flex items-center border rounded-xl px-4 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <Image className="text-gray-400 mr-2" size={18} />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 outline-none cursor-pointer"
            />
          </div>
        </div>
      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400 cursor-pointer">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
        Publikovať do: O nás
      </button>
    </form>
  );
}