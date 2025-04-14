import { useContext, useState } from "react";
import { Link } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ThemeContext from "../../context/theme/ThemeContext";
import SessionContext from "../../context/session/SessionContext";
import gameZone from "../../assets/game-zone.png";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import MobileDrawerMenu from "./MobileDrawerMenu";

export default function Navbar() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleColorMode } = useContext(ThemeContext);
  const { session } = useContext(SessionContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    else alert("Signed out 👋");
  };

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: isDarkMode
          ? theme.palette.background.paper
          : theme.palette.primary.main,
        height: "68px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + Titolo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link to="/">
            <img src={gameZone} alt="Game Zone" style={{ height: "50px" }} />
          </Link>
          {!isMobile && (
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              GameZone
            </Typography>
          )}
        </Box>

        {/* SearchBar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexGrow: 1,
            mx: 2          
          }}
        >
          <SearchBar />
        </Box>

        {/* Menu Desktop o Mobile */}
        {isMobile ? (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Home
            </Button>
            {session ? (
              <>
                <Button
                  component={Link}
                  to="/profile"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Profile
                </Button>
                <Button
                  component={Link}
                  to="/settings"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Settings
                </Button>
                <Button
                  onClick={signOut}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Toggle tema */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggleColorMode} sx={{ color: theme.palette.primary.contrastText }}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer Mobile */}
      {isMobile && (
        <MobileDrawerMenu
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          signOut={signOut}
          isDarkMode={isDarkMode}
          session={session}
          user={session?.user}
        />
      )}
    </AppBar>
  );
}
