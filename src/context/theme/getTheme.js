import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#7C3AED",       // Viola tech
        light: "#A78BFA",      // Lilla chiaro
        dark: "#4C1D95",       // Viola intenso
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#22D3EE",       // Ciano neon
        contrastText: "#000000",
      },
      background: {
        default: mode === "dark" ? "#0f0f1a" : "#f3f4f6", 
        paper: mode === "dark" ? "#1e1e2f" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e0e0e0" : "#1e1e1e",
        secondary: mode === "dark" ? "#a1a1aa" : "#4b5563",
      },
    },
  });

export default getTheme;
