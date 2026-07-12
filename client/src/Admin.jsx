import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Loader2, PlusCircle, LogOut } from "lucide-react";

export function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Stavy pre prihlasovací formulár
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Stavy pre formulár pridávania dát
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [eventText, setEventText] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sledovanie, či je admin prihlásený
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Prihlásenie
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Chyba prihlásenia: " + error.message);
    setLoading(false);
  };

  // Odhlásenie
  const handleLogout = () => supabase.auth.signOut();

  // Odoslanie novej akcie do databázy
  const handleSubmitAction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Vložíme dáta do tabuľky Help (alebo Actions)
    const { data, error } = await supabase.from("Help").insert([
      {
        city: city,
        date: date, // formát YYYY-MM-DD z inputu typu date
        event: eventText,
        description: description,
        coords: [48.85, 17.23], // Predvolené alebo pridaj inputy pre súradnice
        images: [] // Tu neskôr prepojíš Supabase Storage bucket, zatiaľ prázdne pole
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      alert("Chyba pri ukladaní: " + error.message);
    } else {
      alert("Akcia bola úspešne pridaná!");
      // Vyčistenie formulára
      setCity("");
      setEventText("");
      setDescription("");
      setDate("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  // 1. AK POUŽÍVATEĽ NIE JE PRIHLÁSENÝ -> ZOBRAZ LOGIN FORMULÁR
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Panel</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heslo</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>
            <button type="submit" className="w-full py-3 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              Prihlásiť sa
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AK JE PRIHLÁSENÝ -> ZOBRAZ ADMIN ROZHRANIE
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pridať novú udalosť</h1>
            <p className="text-sm text-gray-500">Prihlásený ako: {session.user.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium">
            <LogOut size={16} /> Odhlásiť sa
          </button>
        </div>

        <form onSubmit={handleSubmitAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mesto / Lokácia</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="napr. Skalica" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dátum konania</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Krátky popis (Description)</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="napr. Vianočné trhy 2025" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Celý príbeh / Text udalosti (Podporuje Markdown odkazy)</label>
            <textarea value={eventText} onChange={(e) => setEventText(e.target.value)} rows={6} placeholder="Tu napíš celý text. Ak chceš odkaz, použi [Názov](https://...)" className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-sans" required />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400">
            {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
            Publikovať na web
          </button>
        </form>
      </div>
    </div>
  );
}