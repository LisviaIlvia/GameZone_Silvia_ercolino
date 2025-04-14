import * as React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  useMediaQuery,
  Rating,
  useTheme
} from "@mui/material";
import { Link } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LazyLoadGameImage from "../common/LazyLoadGameImage";
import PlatformIcons from "../common/PlatformIcons";
import { useState, useContext } from "react";
import ToggleFavorite from "../common/ToggleFavorite";
import SessionContext from "../../context/session/SessionContext";

export default function CardGame({ game }) {
  const { session } = useContext(SessionContext);
  const theme = useTheme();
  const isTouchDevice = useMediaQuery(theme.breakpoints.down("md"));
  const [hovered, setHovered] = useState(false); // Stato per il mouse hover
  const [expanded, setExpanded] = useState(false);

  const genres = game.genres?.map((genre) => genre.name).join(", ") || "N/A";

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: hovered ? 6 : 3,
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "all 0.3s ease-in-out",
      }}
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => !isTouchDevice && setHovered(false)}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {game.name[0]}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon sx={{ color: theme.palette.text.secondary }} />
          </IconButton>
        }
        title={
          <Link
            to={`/games/${game.slug}/${game.id}`}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: theme.palette.text.primary,
              "&:hover": {
                    color: theme.palette.secondary.main,
                  },
            }}
          >
            {game.name}
          </Link>
        }
        subheader={`Released: ${game.released}`}
        sx={{ color: theme.palette.text.secondary }}
      />

      <LazyLoadGameImage
        src={game.background_image || "/segna-posto.jpg"}
        alt={game.name}
        sx={{
          height: 180,
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {genres}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {session && <ToggleFavorite data={game} />}
        {isTouchDevice && (
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{ ml: "auto", color: theme.palette.text.secondary }}
          >
            <ExpandMoreIcon
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </IconButton>
        )}
      </CardActions>

      <Collapse
        in={isTouchDevice ? expanded : hovered}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {game.platforms?.length > 0 ? (
              <PlatformIcons platforms={game.platforms} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nessuna piattaforma disponibile
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Rating
              name="half-rating-read"
              defaultValue={game.rating}
              precision={0.5}
              readOnly
            />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
