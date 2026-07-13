import React, { useState } from "react";
import { supabase } from "./../supabaseClient.js";

export function Login({ setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Chyba prihlásenia: " + error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-100 px-4">
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
          <button type="submit" className="w-full py-3 bg-[#81007f] text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
            Prihlásiť sa
          </button>
        </form>
      </div>
    </div>
  );
}