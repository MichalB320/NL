import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./../supabaseClient.js";
import { Loader2, PlusCircle, Images, Pencil, Trash2, X } from "lucide-react";

/**
 * Pomocná funkcia na zmenšenie a kompresiu obrázka v prehliadači
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
            height = Math.round((height * maxWidth) / width);
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

// Pomocná funkcia na získanie relatívnej cesty v bucket-e
const getStoragePathFromUrl = (url) => {
  if (!url) return null;
  const bucketMarker = "/NeLa-bucket/";
  const index = url.indexOf(bucketMarker);
  if (index !== -1) {
    return url.substring(index + bucketMarker.length);
  }
  return null;
};

// Bezpečné formátovanie dátumu bez UTC posunu
const formatDateSk = (dateString) => {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
};

export function AdminPomohliSme() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [eventText, setEventText] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [currentImageUrls, setCurrentImageUrls] = useState([]);

  const fileInputRef = useRef(null);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    const { data, error } = await supabase.from("Help").select("*").order("date", { ascending: false });
    if (error) {
      alert("Chyba pri načítaní príbehov: " + error.message);
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

  const handleEditClick = (eventItem) => {
    setEditingId(eventItem.id);
    setTitle(eventItem.title);
    setDate(eventItem.date);
    setEventText(eventItem.description);
    setCurrentImageUrls(eventItem.images || []);
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDate("");
    setEventText("");
    setFiles([]);
    setCurrentImageUrls([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

 const handleRemoveCurrentImage = async (urlToRemove) => {
  if (!window.confirm("Naozaj chcete natrvalo odstrániť túto fotku?")) return;

  const storagePath = getStoragePathFromUrl(urlToRemove);

  if (storagePath) {
    // 1. Vymazanie súboru zo Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("NeLa-bucket")
      .remove([storagePath]);

    if (storageError) {
      alert("Chyba pri mazaní fotky zo storage: " + storageError.message);
      return;
    }
  }

  // 2. Aktualizácia lokálneho stavu (odstránenie z náhľadu)
  const updatedUrls = currentImageUrls.filter((url) => url !== urlToRemove);
  setCurrentImageUrls(updatedUrls);

  // 3. Ak práve upravujeme už existujúci príbeh, ihneď aktualizujeme aj databázu
  if (editingId) {
    const { error: dbError } = await supabase
      .from("Help")
      .update({ images: updatedUrls })
      .eq("id", editingId);

    if (dbError) {
      alert("Chyba pri aktualizácii databázy: " + dbError.message);
    } else {
      // Obnovíme zoznam v tabuľke dole
      fetchEvents();
    }
  }
};

  const handleDeleteClick = async (eventItem) => {
    if (!window.confirm("Naozaj chcete zmazať tento príbeh?")) return;

    // 1. Zmazanie fotiek zo Supabase Storage (ak existujú)
    if (eventItem.images && eventItem.images.length > 0) {
      const storagePaths = eventItem.images.map(getStoragePathFromUrl).filter(Boolean);

      if (storagePaths.length > 0) {
        await supabase.storage.from("NeLa-bucket").remove(storagePaths);
      }
    }

    // 2. Zmazanie riadku z databázy
    const { error } = await supabase.from("Help").delete().eq("id", eventItem.id);

    if (error) {
      alert("Chyba pri mazaní príbehu: " + error.message);
    } else {
      alert("Príbeh bol úspešne zmazaný.");
      fetchEvents();
      if (editingId === eventItem.id) resetForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrls = [...currentImageUrls];

    try {
      if (files.length > 0) {
        const compressedFiles = await Promise.all(files.map((file) => compressImage(file, 1200, 1200, 0.9)));
        const newImageUrls = [];

        for (const file of compressedFiles) {
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.webp`;
          const filePath = `pomohli-sme/${fileName}`;

          const { error: uploadError } = await supabase.storage.from("NeLa-bucket").upload(filePath, file);

          if (uploadError) {
            throw new Error(`Chyba pri nahrávaní obrázka (${file.name}): ` + uploadError.message);
          }

          const { data } = supabase.storage.from("NeLa-bucket").getPublicUrl(filePath);

          if (data?.publicUrl) {
            newImageUrls.push(data.publicUrl);
          }
        }
        
        // Ak sa nahrajú nové súbory, pridajú sa k existujúcim (alebo nahradia podľa potreby)
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const rowData = { title, date, description: eventText, images: imageUrls };

      if (editingId) {
        const { error: updateError } = await supabase.from("Help").update(rowData).eq("id", editingId);
        if (updateError) throw new Error("Chyba pri aktualizácii príbehu: " + updateError.message);
        alert("Príbeh bol úspešne aktualizovaný!");
      } else {
        const { error: insertError } = await supabase.from("Help").insert([rowData]);
        if (insertError) throw new Error("Chyba pri ukladaní do databázy: " + insertError.message);
        alert("Príbeh bol úspešne pridaný do sekcie Pomohli sme!");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-150">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xl font-bold text-gray-800">
            {editingId ? "Upraviť príbeh" : "Pridať nový príbeh do Pomohli sme"}
          </label>
          {editingId && (
            <button type="button" onClick={resetForm} className="flex items-center gap-1 text-sm text-red-500 hover:underline cursor-pointer">
              <X size={16} /> Zrušiť úpravu
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nadpis</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="napr. Mikuláš pre deti" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dátum konania</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Celý príbeh</label>
          <textarea value={eventText} onChange={(e) => setEventText(e.target.value)} rows={6} placeholder="Sem napíš celý text..." className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-sans" required />
        </div>

        {/* Náhľad a správa existujúcich fotiek pri úprave */}
        {editingId && currentImageUrls.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pôvodné fotky</label>
            <div className="flex flex-wrap gap-3">
              {currentImageUrls.map((url, idx) => (
                <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handleRemoveCurrentImage(url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition-opacity cursor-pointer" title="Odstrániť túto fotk" >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vstup pre nahrávanie fotiek */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {editingId ? "Pridať ďalšie fotky" : "Fotky k príbehu"} {files.length > 0 && `(Vybrané nové: ${files.length})`}
          </label>
          <div className="relative flex items-center border rounded-xl px-4 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <Images className="text-gray-400 mr-2" size={18} />
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 outline-none cursor-pointer" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400 cursor-pointer">
          {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
          {editingId ? "Uložiť zmeny" : "Publikovať do: Pomohli sme"}
        </button>
      </form>

      {/* Zoznam príbehov */}
      <div className="space-y-4">
        <label className="text-lg font-bold text-gray-800">Uverejnené príbehy</label>
        {loadingEvents ? (
          <div>
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-gray-500 text-sm">V databáze nie sú žiadne príbehy.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* DESKTOP Tabuľka */}
            <table className="w-full border-collapse text-left text-sm text-gray-500 hidden lg:table">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Náhľady fotiek</th>
                  <th className="px-6 py-3">Dátum</th>
                  <th className="px-6 py-3">Nadpis</th>
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
                          <span className="text-xs text-gray-400">Bez fotiek</span>
                        )}
                        {eventItem.images && eventItem.images.length > 3 && (
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white text-xs font-medium text-gray-500">
                            +{eventItem.images.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatDateSk(eventItem.date)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 line-clamp-1">{eventItem.title}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => handleEditClick(eventItem)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Pencil size={16} /> Upraviť
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(eventItem)} className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Trash2 size={16} /> Zmazať
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILNÉ Karty */}
            <div className="grid grid-cols-1 divide-y divide-gray-200 lg:hidden">
              {events.map((eventItem) => (
                <div key={eventItem.id} className="p-4 flex flex-col gap-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{eventItem.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {formatDateSk(eventItem.date)}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 text-right flex-shrink-0">
                      <button type="button" onClick={() => handleEditClick(eventItem)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                        <Pencil size={14} /> Upraviť
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(eventItem)} className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
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