import { useContext } from "react";
import SessionContext from "../../context/session/SessionContext";
import FavoritesContext from "../../context/favorites/FavoritesContext";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: theme.palette.text.primary }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Ciao, {session?.user.user_metadata?.first_name} 👋
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Giochi preferiti
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {favorites.length === 0 ? (
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Nessun gioco tra i preferiti al momento.
          </Typography>
        ) : (
          <List>
            {favorites.map((game) => (
              <Box key={game.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFavorite(game.game_id)}
                      sx={{
                        color: theme.palette.primary.main,
                        "&:hover": {
                          color: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <FaTrashAlt />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Link to={`/games/${game.game_slug}/${game.game_id}`}>
                      <Avatar
                        src={game.game_image}
                        variant="rounded"
                        sx={{
                          width: 56,
                          height: 56,
                          mr: 3,
                          border: `2px solid ${theme.palette.primary.main}`,
                        }}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText primary={game.game_name} />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
