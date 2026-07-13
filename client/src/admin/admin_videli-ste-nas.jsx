import React, { useState } from "react";
import { supabase } from "./../supabaseClient.js";
import { Loader2, PlusCircle, Images } from "lucide-react";

export function AdminVideliSteNas() {
  const [city, setCity] = useState("");
  const [gps, setGps] = useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrls = [];

    try {
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `videli-ste-nas/${fileName}`;

          const { error: uploadError } = await supabase.storage.from("NeLa-bucket").upload(filePath, file);

          if (uploadError) {
            throw new Error(`Chyba pri nahrávaní obrázka (${file.name}): ` + uploadError.message);
          }

          const { data } = supabase.storage.from("NeLa-bucket").getPublicUrl(filePath);

          if (data?.publicUrl) {
            imageUrls.push(data.publicUrl);
          }
        }
      }

      const gpsCoords = gps.split(',').map(coord => parseFloat(coord.trim()));
      const { error: dbError } = await supabase.from("Actions").insert([
        { city, description, coords: gpsCoords, images: imageUrls, event }
      ]);

      if (dbError) {
        throw new Error("Chyba pri ukladaní do databázy: " + dbError.message);
      }

      alert("Udalosť bola úspešne pridaná do sekcie Videli ste nás!");
      setCity(""); 
      setGps(""); 
      setDescription(""); 
      setEvent(""); 
      setFiles([]);
      e.target.reset(); 
    } catch (error) {
      alert("Chyba pri nahrávaní obrázkov: " + error.message);
    } finally {
      setIsSubmitting(false);
    }

    // const { error } = await supabase.from("Actions").insert([
    //   { city, description, coords: gps, images: [], event }
    // ]);

    // setIsSubmitting(false);

    // if (error) {
    //   alert("Chyba pri ukladaní: " + error.message);
    // } else {
    //   alert("Udalosť úspešne pridaná do Videli ste nás!");
    //   setCity(""); setGps(""); setDescription(""); setEvent("");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mesto</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="napr. Skalica - mesto" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GPS suradnice</label>
          <input type="text" value={gps} onChange={(e) => setGps(e.target.value)} placeholder="napr. 48.85, 17.23" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Názov udalosti</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="napr. Vianočné trhy 2025" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Popis udalosti</label>
        <textarea value={event} onChange={(e) => setEvent(e.target.value)} rows={6} placeholder="Sem napíš text napr. Naša prvá „veľká“ akcia v rámci občianskeho združenia Nebuď ľahostajný sa konala počas adventného obdobia, keď sme mali možnosť byť súčasťou vianočných trhov v Skalici.... <strong>toto je tučným</strong> a toto <br/> zalomí riadok." className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-sans" required />
      </div>

      {/* INPUT PRE NAHRATIE FOTIEK (MULTIPLE) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fotky z akcie {files.length > 0 && `(Vybrané: ${files.length})`}
        </label>
        <div className="relative flex items-center border rounded-xl px-4 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
          <Images className="text-gray-400 mr-2" size={18} />
          <input 
            type="file" 
            accept="image/*" 
            multiple // Umožní vybrať viac fotiek naraz podržaním Ctrl / Shift
            onChange={handleFileChange} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 outline-none cursor-pointer"
          />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400 cursor-pointer">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
        Publikovať do: Videli ste nás
      </button>
    </form>
  );
}