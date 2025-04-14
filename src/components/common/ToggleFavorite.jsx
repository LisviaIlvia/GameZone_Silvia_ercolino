import { useContext } from "react";
import FavoritesContext from "../../context/favorites/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Box } from "@mui/material";

export default function ToggleFavorite({ data }) {
const {favorites, addFavorites, removeFavorite} = useContext(FavoritesContext);

  const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

  const handleClick = () => {
    if (isFavorite()) {
      removeFavorite(data.id);
    } else {
      addFavorites(data);
    }
  };

  return (
    <Box>
      <button
        onClick={handleClick}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "4px",
          transition: "transform 0.2s ease-in-out",
        }}
        aria-label={isFavorite() ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      >
        {isFavorite() ? (
          <FaHeart style={{ color: "red", fontSize: "20px" }} />
        ) : (
          <FaRegHeart style={{ color: "gray", fontSize: "20px" }} />
        )}
      </button>
    </Box>
  );
}
