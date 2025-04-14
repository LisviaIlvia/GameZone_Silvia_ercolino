import { useState, useEffect, useCallback } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "./SessionContext";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        setProfile(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // FUNZIONE che può essere richiamata anche da altri componenti
  const fetchProfile = useCallback(async () => {
    if (session?.user?.id) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!error) {
        setProfile(data);
      } else {
        console.error("Errore nel caricamento del profilo:", error);
      }
    }
  }, [session]);

  // Carica il profilo al login
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <SessionContext.Provider value={{ session, profile, refreshProfile: fetchProfile }}>
      {children}
    </SessionContext.Provider>
  );
}
