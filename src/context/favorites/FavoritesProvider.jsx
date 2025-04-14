import { useContext, useState, useCallback, useEffect } from "react";
import SessionContext from "../session/SessionContext";
import FavoritesContext from "./FavoritesContext";
import supabase from "../../supabase/supabase-client";

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { session } = useContext(SessionContext);

  const getFavorites = useCallback(async () => {
    let { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session?.user.id);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(favourites);
    }
  }, [session]);

  const addFavorites = async (game) => {
   const {error} = await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      if (error) {
        console.error(error);
      } else {
        await getFavorites();
      }
  };

  const removeFavorite = async (game_id) => {
    const {error} = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", game_id)
      .eq("user_id", session?.user.id);
      if (error) {
        console.error(error);
      } else {
        await getFavorites();
      }
  };

  useEffect(() => {
    if (session) {
      getFavorites();
    }
    const favorites = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      if (favorites) {
        supabase.removeChannel(favorites);
      }
    };
  }, [getFavorites, session]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, addFavorites, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
