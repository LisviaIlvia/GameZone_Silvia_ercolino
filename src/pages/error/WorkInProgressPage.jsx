import { Box, Typography, Link as MuiLink, useTheme } from "@mui/material";
import { Link } from "react-router";

export default function ErrorPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "5rem" }}>
        🚧
      </Typography>
      <Typography
        variant="h5"
        sx={{ mt: 2, mb: 4, color: theme.palette.primary.main }}
      >
        Oops! Lavori in corso...
      </Typography>
      <MuiLink
        component={Link}
        to="/"
        underline="hover"
        sx={{ color: theme.palette.secondary.main }}
      >
        ← Torna alla Home
      </MuiLink>
    </Box>
  );
}
