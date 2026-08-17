import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import { Loader2, LogOut, Heart, Users, Eye } from "lucide-react";

// Import rozdelených komponentov
import { Login } from "./admin/login.jsx";
import { AdminPomohliSme } from "./admin/admin_pomohli-sme.jsx";
import { AdminMembers } from "./admin/admin_members.jsx";
import { AdminVideliSteNas } from "./admin/admin_videli-ste-nas.jsx";

export function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#/admin");

  // 1. Správa relácie (Session) zo Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // Ak už sme prihlásení a prídeme na čisté #/admin, až teraz ho presmerujeme
      if (session && window.location.hash === "#/admin") {
        window.location.hash = "#/admin/pomohli-sme";
      }
      
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // Kľúčový moment: Ak nastane udalosť prihlásenia (SIGNED_IN) a sme na #/admin, skočíme na prvú podsekciu
      if (_event === "SIGNED_IN" && window.location.hash === "#/admin") {
        window.location.hash = "#/admin/pomohli-sme";
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Sledovanie zmien hashu pre prepínanie záložiek (iba ak sme prihlásení)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogout = () => {
    supabase.auth.signOut();
    // Po odhlásení vrátime URL späť na čistý admin panel
    window.location.hash = "#/admin";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  // Ak neexistuje relácia, bezpečne renderujeme Login na adrese #/admin
  if (!session) {
    return <Login setLoading={setLoading} />;
  }

  const menuItems = [
    { id: "#/admin/clenky", label: "Členky", icon: <Users size={18} /> },
    { id: "#/admin/pomohli-sme", label: "Pomohli sme", icon: <Heart size={18} /> },
    { id: "#/admin/videli-ste-nas", label: "Videli ste nás", icon: <Eye size={18} /> },
  ];

  const renderForm = () => {
    switch (currentHash) {
      case "#/admin/pomohli-sme":
        return <AdminPomohliSme />;
      case "#/admin/clenky":
        return <AdminMembers />;
      case "#/admin/videli-ste-nas":
        return <AdminVideliSteNas />;
      default:
        // Ochrana, ak by sme predsa len boli na čistom #/admin (sekundu po logine)
        return <AdminPomohliSme />;
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 p-2 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-start">
        
        {/* AKTÍVNY FORMULÁR */}
        <div className="flex-1 w-full bg-white rounded-3xl shadow-xl p-3 md:p-8 border border-gray-100 order-2 md:order-1">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-2 mb-8 border-b pb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Správa sekcie: {menuItems.find(item => item.id === currentHash)?.label || "Pomohli sme"}
              </h1>
              <p className="text-sm text-gray-500">Prihlásený: {session.user.email}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center self-start sm:self-auto gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium cursor-pointer">
              <LogOut size={16} /> Odhlásiť sa
            </button>
          </div>

          {renderForm()}
        </div>

        {/* PRAVÉ BOČNÉ MENU */}
        <div className="w-full md:w-64 bg-white rounded-3xl shadow-xl p-5 border border-gray-100 flex flex-col gap-2 order-1 md:order-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Vyberte sekciu
          </p>
          {menuItems.map((item) => {
            const isActive = currentHash === item.id;
            return (
              <a
                key={item.id}
                href={item.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#81007f] text-white shadow-md shadow-purple-200 translate-x-1"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}