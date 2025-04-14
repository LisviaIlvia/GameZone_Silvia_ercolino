import { useState } from "react";
import { Link } from "react-router";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Collapse,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useFetchApi from "../../hook/useFetchApi";
import { fetchAllGenres } from "../../utils/apiUrls";

export default function GenresDropdown() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { error, data } = useFetchApi(fetchAllGenres());

  const toggleOpen = () => setOpen(!open);

  if (!data && !error) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Errore: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Toggle header */}
      <ListItemButton onClick={toggleOpen} sx={{ pl: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
            color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main,
          }}
        >
          Generi
        </Typography>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      {/* Elenco generi */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            maxHeight: 300,
            overflowY: "auto",
            pr: 1,
          }}
        >
          <List disablePadding>
            {data?.results?.map((genre) => (
              <ListItemButton
                key={genre.id}
                component={Link}
                to={`/games/${genre.slug}`}
                sx={{
                  pl: 2,
                  borderRadius: 1,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.secondary.main
                  },
                }}
              >
                {genre.name}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Collapse>
    </Box>
  );
}
