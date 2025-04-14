import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Link } from "react-router";
import GenresDropdown from "../ui/GenresDropdown";

export default function MobileDrawerMenu({
  open,
  onClose,
  signOut,
  session,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === "dark";

  if (!isMobile) return null;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          top: `68px`,
          height: `calc(100% - 68px)`,
        },
      }}
    >
      <Box sx={{ width: 240, p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main }}
        >
          Menù
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List sx={{ color: theme.palette.text.secondary }}>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>
          {session ? (
            <>
              <ListItemButton component={Link} to="/profile">
                <ListItemText primary="Profilo" />
              </ListItemButton>
              <ListItemButton component={Link} to="/settings">
                <ListItemText primary="Settings" />
              </ListItemButton>
              <ListItemButton onClick={signOut}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </>
          )}
        </List>

        <Divider sx={{ my: 2 }} />
        <GenresDropdown />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main }}>
          Piattaforme
        </Typography>
        <List sx={{ color: theme.palette.text.secondary }}>
          <ListItemButton component={Link} to="/work-in-progress">
            <ListItemText primary="PC" />
          </ListItemButton>
          <ListItemButton component={Link} to="/work-in-progress">
            <ListItemText primary="PlayStation" />
          </ListItemButton>
          <ListItemButton component={Link} to="/work-in-progress">
            <ListItemText primary="Xbox" />
          </ListItemButton>
          <ListItemButton component={Link} to="/work-in-progress">
            <ListItemText primary="Nintendo" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
