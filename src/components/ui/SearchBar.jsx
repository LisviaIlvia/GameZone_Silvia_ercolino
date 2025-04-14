import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  InputBase,
  IconButton,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(false);
  const theme = useTheme();

  const handleSearch = (event) => {
    event.preventDefault();
    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${search}`);
      setAriaInvalid(false);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "20px",
        padding: "2px 10px",
        width: "100%",
        maxWidth: { xs: "100%", sm: "400px", md: "600px" },
        border: ariaInvalid ? `2px solid ${theme.palette.error.main}` : "2px solid transparent",
        transition: "border 0.3s ease, box-shadow 0.3s ease",
        boxShadow: ariaInvalid ? `0 0 0 3px ${theme.palette.error.main}33` : "none",
        "&:focus-within": {
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}88`,
        },
      }}
      
    >
      <InputBase
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cerca giochi..."
        aria-invalid={ariaInvalid ? "true" : "false"}
        sx={{
          color: theme.palette.text.primary,
          width: "100%",
          fontSize: "0.95rem",
        }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
    </Box>
  );
}
