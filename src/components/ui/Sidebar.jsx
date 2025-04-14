import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GenresDropdown from "./GenresDropdown";
import { Link } from "react-router";

export default function Sidebar({ open, onClose, drawerWidth = 220 }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isDarkMode = theme.palette.mode === "dark";

  const content = (
    <Box
      sx={{
        width: drawerWidth,
        p: 2,
        height: "100%",
      }}
    >
      {/* Generi */}
      <Box sx={{ my: 2 }}>
        <GenresDropdown />
      </Box>

      {/* Piattaforme */}
      <Box sx={{ my: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: isDarkMode
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          }}
        >
          Piattaforme
        </Typography>

        <List sx={{ color: theme.palette.text.primary }}>
          <ListItemButton
            component={Link}
            to="/work-in-progress"
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemText
              primary="PC"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/work-in-progress"
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemText
              primary="PlayStation"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/work-in-progress"
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemText
              primary="Xbox"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/work-in-progress"
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemText
              primary="Nintendo"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  if (!isDesktop) {
    // Mobile drawer
    return (
      <Drawer
        anchor="left"
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  // Desktop sidebar
  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: "fixed",
        top: "64px",
        left: 0,
        height: "calc(100% - 64px)",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {content}
    </Box>
  );
}
