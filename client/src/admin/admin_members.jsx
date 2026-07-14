import React, { useState, useEffect } from "react";
import { supabase } from "./../supabaseClient.js";
import { Loader2, PlusCircle, Image, Pencil, Trash2, X } from "lucide-react";

export function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [eventText, setEventText] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    const { data, error } = await supabase.from("Member").select("*").order("id", { ascending: true });

    if (error) {
      alert("Chyba pri načítavaní dát: " + error.message);
    } else {
      setMembers(data || []);
    }
    setLoadingMembers(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.rola);
    setQuote(member.quote || "");
    setEventText(member.popis);
    setCurrentImageUrl(member.fotka); // Uložíme si pôvodnú adresu fotky
    setFile(null); // Vynulujeme novo vybraný súbor
  };

  const resetForm = (target) => {
    setEditingId(null);
    setName("");
    setRole("");
    setQuote("");
    setEventText("");
    setFile(null);
    setCurrentImageUrl(null);
    if (target) target.reset();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Naozaj chcete zmazať túto členku?")) return;

    const { error } = await supabase.from("Member").delete().eq("id", id);

    if (error) {
      alert("Chyba pri mazaní: " + error.message);
    } else {
      alert("Členka bola úspešne zmazaná.");
      fetchMembers(); // Obnovíme zoznam
      if (editingId === id) resetForm();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = currentImageUrl;

    try {
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `o-nas/${fileName}`;

        const { error: uploadError } = await supabase.storage.from("NeLa-bucket").upload(filePath, file);
        if (uploadError) throw new Error("Chyba pri nahrávaní obrázka: " + uploadError.message);

        const uploadUrlResult = supabase.storage.from("NeLa-bucket").getPublicUrl(filePath);
        imageUrl = uploadUrlResult.data.publicUrl;
      }

      const rowData = { name, rola: role, quote, popis: eventText, fotka: imageUrl };

      if (editingId) {
        const { error: dbError } = await supabase.from("Member").update(rowData).eq("id", editingId);
        if (dbError) throw new Error("Chyba pri úprave v databáze: " + dbError.message);
        //console.log("Úspešne upravené pre id: ", editingId, ", dáta: ", rowData);
        alert("Záznam úspešne upravený!");
      } else {
        const { error: dbError } = await supabase.from("Member").insert([rowData]);
        if (dbError) throw new Error("Chyba pri ukladaní do databázy: " + dbError.message);
        alert("Úspešne pridaná členka do sekcie O nás!");
      }

      resetForm(e.target);
      fetchMembers();

      // const { error: dbError } = await supabase.from("Member").insert([
      //   { name, rola: role, quote, popis: eventText, fotka: imageUrl }
      // ]);

      // if (dbError) {
      //   throw new Error("Chyba pri ukladaní do databázy: " + dbError.message);
      // }

      // alert("Úspešne pridané do sekcie Členky!");

      // setName("");
      // setRole("");
      // setQuote("");
      // setEventText("");
      // setFile(null);

      // e.target.reset();
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
            {editingId ? "Upraviť členku tímu" : "Pridať novú členku"}
          </label>
          {editingId && (
            <button type="button" onClick={() => resetForm()} className="flex items-center gap-1 text-sm text-red-500 hover:underline cursor-pointer">
              <X size={16} /> Zrušiť úpravu
            </button>
          )}
        </div>

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Profilová fotka {editingId && !file ? "(Ponechá sa pôvodná, ak nevyberiete novú)" : ""}</label>
          <div className="relative flex items-center border rounded-xl px-4 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <Image className="text-gray-400 mr-2" size={18} />
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 outline-none cursor-pointer" />
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400 cursor-pointer">
          {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
          {editingId ? "Uložiť zmeny" : "Publikovať do: O nás"}
        </button>
      </form>

      <div className="space-y-4">
        <label className="text-lg font-bold text-gray-800">Aktuálne členky v systéme</label>
        {loadingMembers ? (
          <div className="flex justify-center p-4">
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        ) : (members.length === 0 ? (
          <p className="text-gray-500 text-sm">V databáze nie sú žiadne členky.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-left text-sm text-gray-500 hidden lg:table">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Fotka</th>
                  <th className="px-6 py-3">Meno</th>
                  <th className="px-6 py-3">Rola</th>
                  <th className="px-6 py-4 text-right">Akcie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {member.fotka ? (
                        <img src={member.fotka} alt={member.name} className="w-10 h-10 object-cover rounded-full bg-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">N/A</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4">{member.rola}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => handleEditClick(member)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Pencil size={16} /> Upraviť
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(member.id)} className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer">
                          <Trash2 size={16} /> Zmazať
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILNÁ VERZIA: Zobrazí sa iba na malých obrazovkách (grid lg:hidden) */}
            <div className="grid grid-cols-1 divide-y divide-gray-200 lg:hidden">
              {members.map((member) => (
                <div key={member.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {member.fotka ? (
                      <img src={member.fotka} alt={member.name} className="w-12 h-12 object-cover rounded-full bg-gray-100 flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">N/A</div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.rola}</div>
                    </div>
                  </div>

                  {/* Akčné tlačidlá vertikálne pod sebou pre lepšie klikanie na mobile */}
                  <div className="flex flex-col gap-2 text-right">
                    <button type="button" onClick={() => handleEditClick(member)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                      <Pencil size={14} /> Upraviť
                    </button>
                    <button type="button" onClick={() => handleDeleteClick(member.id)} className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 justify-end cursor-pointer">
                      <Trash2 size={14} /> Zmazať
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}