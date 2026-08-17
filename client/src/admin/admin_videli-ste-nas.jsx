import React, { useState, useEffect } from "react";
import { supabase } from "./../supabaseClient.js";
import { Loader2, PlusCircle, Images, Pencil, Trash2, X } from "lucide-react";

/**
 * Pomocná funkcia na zmenšenie a kompresiu obrázka v prehliadači pred nahrávaním
 */
const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxHeight) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Kompresia obrázka zlyhala."));
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

/**
 * Pomocná funkcia na získanie relatívnej cesty v bucket-e z verejnej URL adresy.
 * Očakáva URL v tvare: .../storage/v1/object/public/NeLa-bucket/videli-ste-nas/file.webp
 */
const getStoragePathFromUrl = (url) => {
  if (!url) return null;
  const bucketMarker = "/NeLa-bucket/";
  const index = url.indexOf(bucketMarker);
  if (index !== -1) {
    return url.substring(index + bucketMarker.length);
  }
  return null;
};

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

  const handleEditClick = async (eventItem) => {
    const { data, error } = await supabase.from("Actions").select("*").eq("id", eventItem.id).single();

    if (error || !data) {
      alert("Chyba pri načítaní detailu akcie.");
      return;
    }

    setEditingId(data.id);
    setCity(data.city || "");
    // Ošetrenie GPS na zápis s medzerou (napr. "48.85, 17.23")
    setGps(Array.isArray(data.coords) ? data.coords.join(", ") : data.coords || "");
    setDescription(data.description || "");
    setEvent(data.event || "");
    setCurrentImageUrls(data.images || []);
    setFiles([]);
  };

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

  /**
   * Vymaže konkrétny obrázok zo Storage aj zo stavu pri úprave
   */
  const handleRemoveExistingImage = async (urlToRemove) => {
    console.log(urlToRemove);
    const filePath = getStoragePathFromUrl(urlToRemove);
    console.log(filePath);

    if (filePath) {
      const { data, error } = await supabase.storage.from("NeLa-bucket").remove([filePath]);

      console.log(data);
      if (error) {
        console.error("Chyba pri mazaní obrázka zo Storage:", error.message);
      }
    }

    setCurrentImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Naozaj chcete zmazať túto akciu vrátane všetkých jej fotiek?")) return;

    try {
      // 1. Načítanie obrázkov akcie pred zmazaním z DB
      const { data: eventData, error: fetchError } = await supabase.from("Actions").select("images").eq("id", id).single();

      if (fetchError) {
        throw new Error("Nepodarilo sa získať informácie o akcii.");
      }

      // 2. Vymazanie fotiek zo Storage
      if (eventData?.images && eventData.images.length > 0) {
        const filePaths = eventData.images.map((url) => getStoragePathFromUrl(url)).filter((path) => path !== null);

        if (filePaths.length > 0) {
          const { error: storageError } = await supabase.storage.from("NeLa-bucket").remove(filePaths);

          if (storageError) {
            console.error("Chyba pri mazaní súborov zo Storage:", storageError.message);
          }
        }
      }

      // 3. Vymazanie záznamu z tabuľky Actions
      const { error: deleteError } = await supabase.from("Actions").delete().eq("id", id);

      if (deleteError) {
        throw new Error("Chyba pri mazaní akcie: " + deleteError.message);
      }

      alert("Akcia aj s fotkami bola úspešne zmazaná.");
      fetchEvents();
      if (editingId === id) resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let newlyUploadedUrls = [];

      // Upload nových fotiek
      if (files.length > 0) {
        const compressedFiles = await Promise.all(
          files.map((file) => compressImage(file, 1200, 1200, 0.9))
        );

        for (const file of compressedFiles) {
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.webp`;
          const filePath = `videli-ste-nas/${fileName}`;

          const { error: uploadError } = await supabase.storage.from("NeLa-bucket").upload(filePath, file);

          if (uploadError) {
            throw new Error(`Chyba pri nahrávaní obrázka (${file.name}): ` + uploadError.message);
          }

          const { data } = supabase.storage.from("NeLa-bucket").getPublicUrl(filePath);

          if (data?.publicUrl) {
            newlyUploadedUrls.push(data.publicUrl);
          }
        }
      }

      // Spojenie ponechaných starých fotiek s novonahratými
      const finalImageUrls = [...currentImageUrls, ...newlyUploadedUrls];

      // Parser GPS
      const parts = gps.split(",").map((coord) => coord.trim());
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);

      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Zadané GPS súradnice nie sú platné. Zadajte ich v tvare: 48.85, 17.23");
      }
      const gpsCoords = [lat, lng];

      const rowData = {
        city,
        description,
        coords: gpsCoords,
        images: finalImageUrls,
        event,
      };

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
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-150">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">GPS súradnice</label>
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

        {/* EXISTUJÚCE FOTKY PRI ÚPRAVE */}
        {editingId && currentImageUrls.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pôvodné fotky (kliknutím na X odstrániš):</label>
            <div className="flex flex-wrap gap-2">
              {currentImageUrls.map((url, idx) => (
                <div key={idx} className="relative group w-16 h-16">
                  <img src={url} alt="" className="w-full h-full object-cover rounded-lg border" />
                  <button type="button" onClick={() => handleRemoveExistingImage(url)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-700 transition-colors cursor-pointer">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INPUT PRE NAHRATIE FOTIEK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {editingId ? "Pridať ďalšie fotky k akcii" : "Fotky z akcie"}{" "}
            {files.length > 0 ? `(Vybrané nové: ${files.length})` : ""}
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

      {/* ZOZNAM AKCIÍ */}
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
                {events.map((eventItem) => (
                  <tr key={eventItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        {eventItem.images && eventItem.images.length > 0 ? (
                          eventItem.images.slice(0, 3).map((img, index) => (
                            <img key={index} src={img} alt="" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">Žiadne fotky</span>
                        )}
                        {eventItem.images && eventItem.images.length > 3 && (
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white text-xs font-medium text-gray-500">
                            +{eventItem.images.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{eventItem.city}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{eventItem.description}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => handleEditClick(eventItem)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Pencil size={16} /> Upraviť
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(eventItem.id)} className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Trash2 size={16} /> Zmazať
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILNÁ VERZIA */}
            <div className="grid grid-cols-1 divide-y divide-gray-200 lg:hidden">
              {events.map((eventItem) => (
                <div key={eventItem.id} className="p-4 flex flex-col gap-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{eventItem.description}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{eventItem.city}</div>
                    </div>

                    <div className="flex flex-col gap-2 text-right flex-shrink-0">
                      <button type="button" onClick={() => handleEditClick(eventItem)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                        <Pencil size={14} /> Upraviť
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(eventItem.id)} className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                        <Trash2 size={14} /> Zmazať
                      </button>
                    </div>
                  </div>

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