import React, { useState, useEffect } from "react";
import { supabase } from "./../supabaseClient.js";
import { Loader2, PlusCircle, Images, Pencil, Trash2, X } from "lucide-react";

export function AdminVideliSteNas() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [city, setCity] = useState("");
  const [gps, setGps] = useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [currentImageUrls, setCurrentImageUrls] = useState([]);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    const { data, error } = await supabase.from("Actions").select("id, images, city, description").order("id", { ascending: false });
    if (error) {
      alert("Chyba pri načítaní udalostí: " + error.message);
    } else {
      setEvents(data || []);
    }
    setLoadingEvents(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleEditClick = async (event) => {
    const { data } = await supabase.from("Actions").select("*").eq("id", event.id);

    setEditingId(data[0].id);
    console.log(data[0].id);
    setCity(data[0].city);
    setGps(data[0].coords);
    setDescription(data[0].description);
    setEvent(data[0].event);
    setCurrentImageUrls(data[0].images || []);
    setFiles([]);
  }

  const resetForm = (target) => {
    setEditingId(null);
    setCity("");
    setGps("");
    setDescription("");
    setEvent("");
    setFiles([]);
    setCurrentImageUrls([]);
    if (target) target.reset();
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Naozaj chcete zmazať túto akciu?")) return;

    const { error } = await supabase.from("Actions").delete().eq("id", id);

    if (error) {
      alert("Chyba pri mazaní akcie: " + error.message);
    } else {
      alert("Akcia bola úspešne zmazaná");
      fetchEvents();
      if (editingId === id) resetForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrls = [...currentImageUrls];

    try {
      if (files.length > 0) {
        const newImageUrls = [];
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
            newImageUrls.push(data.publicUrl);
          }
        }
        imageUrls = newImageUrls;
      }

      const parts = gps.split(',').map(coord => coord.trim());
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (isNaN(lat) || isNaN(lng)) throw new Error("Zadané GPS súradnice nie sú platné. Zadajte ich v tvare: 48.85, 17.23");
      const gpsCoords = [lat, lng];

      const rowData = { city, description, coords: gpsCoords, images: imageUrls, event };

      if (editingId) {
        const { error: updateError } = await supabase.from("Actions").update(rowData).eq("id", editingId);
        if (updateError) throw new Error("Chyba pri aktualizácií akcie: " + updateError.message);
        alert("Akcia bola úspešne aktualizovaná!");
      } else {
        const { error: insertError } = await supabase.from("Actions").insert([rowData]);
        if (insertError) throw new Error("Chyba pri ukladaní do databázy: " + insertError.message);
        alert("Akcia bola úspešne pridaná do sekcie Videli ste nás!");
      }

      resetForm(e.target);
      fetchEvents();

      // const gpsCoords = gps.split(',').map(coord => parseFloat(coord.trim()));
      // const { error: dbError } = await supabase.from("Actions").insert([
      //   { city, description, coords: gpsCoords, images: imageUrls, event }
      // ]);

      // if (dbError) {
      //   throw new Error("Chyba pri ukladaní do databázy: " + dbError.message);
      // }

      // alert("Udalosť bola úspešne pridaná do sekcie Videli ste nás!");
      // setCity("");
      // setGps("");
      // setDescription("");
      // setEvent("");
      // setFiles([]);
      // e.target.reset();
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
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-150">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xl font-bold text-gray-800">
            {editingId ? "Upraviť akciu" : "Pridať novú akciu do Videli ste nás"}
          </label>
          {editingId && (
            <button type="button" onClick={() => resetForm()} className="flex items-center gap-1 text-sm text-red-500 hover:underline cursor-pointer">
              <X size={16} /> Zrušiť úpravu
            </button>
          )}
        </div>

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
            Fotky z akcie {editingId && files.length === 0 ? "(Ponechajú sa pôvodné, ak nevyberiete nové)" : files.length > 0 ? `(Vybrané: ${files.length})` : ""}
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
          {editingId ? "Uložiť zmeny" : "Publikovať do: Videli ste nás"}
        </button>
      </form>

      <div className="space-y-4">
        <label className="text-lg font-bold text-gray-800">Uverejnené akcie</label>
        {loadingEvents ? (
          <div>
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-gray-500 text-sm">Žiadne akcie zatiaľ neboli pridané.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">


            <table className="w-full border-collapse text-left text-sm text-gray-500 hidden lg:table">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Náhľady fotiek</th>
                  <th className="px-6 py-3">Miesto</th>
                  <th className="px-6 py-3">Popis udalosti</th>
                  <th className="px-6 py-4 text-right">Akcie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        {event.images && event.images.length > 0 ? (
                          event.images.slice(0, 3).map((img, index) => (
                            <img key={index} src={img} alt="" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">Žiadne fotky</span>
                        )}
                        {event.images && event.images.length > 3 && (
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white text-xs font-medium text-gray-500">
                            +{event.images.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{event.city}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{event.description}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => handleEditClick(event)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Pencil size={16} /> Upraviť
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(event.id)} className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Trash2 size={16} /> Zmazať
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILNÁ VERZIA (Karty) */}
            <div className="grid grid-cols-1 divide-y divide-gray-200 lg:hidden">
              {events.map((eventItem) => (
                <div key={eventItem.id} className="p-4 flex flex-col gap-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{eventItem.description}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {eventItem.city}
                      </div>
                    </div>

                    {/* Akcie na mobile */}
                    <div className="flex flex-col gap-2 text-right flex-shrink-0">
                      <button type="button" onClick={() => handleEditClick(eventItem)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                        <Pencil size={14} /> Upraviť
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(eventItem.id)} className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                        <Trash2 size={14} /> Zmazať
                      </button>
                    </div>
                  </div>

                  {/* Zobrazenie miniatúr fotiek na mobile */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {eventItem.images && eventItem.images.length > 0 ? (
                      eventItem.images.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="h-10 w-10 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Žiadne priložené fotky</span>
                    )}
                  </div>
                </div>
              ))}
            </div>


          </div>
        )}
      </div>
    </div>
  );
}