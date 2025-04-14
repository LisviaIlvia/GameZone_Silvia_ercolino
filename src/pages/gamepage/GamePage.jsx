import { useParams } from "react-router";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import LazyLoadGameImage from "../../components/common/LazyLoadGameImage";
import Rating from "@mui/material/Rating";
import PlatformIcons from "../../components/common/PlatformIcons";
import useFetchApi from "../../hook/useFetchApi";
import { fetchGameDetails } from "../../utils/apiUrls";
import ToggleFavorite from "../../components/common/ToggleFavorite";
import SessionContext from "../../context/session/SessionContext";
import { useContext } from "react";
import Chatbox from "../../components/chat/Chatbox";

export default function GamePage() {
  const { session } = useContext(SessionContext);
  const { id } = useParams();
  const theme = useTheme();


  const { data, error } = useFetchApi(fetchGameDetails(id));

  if (!data && !error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Errore: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          height: { xs: 300, md: 450 },
          mb: 4,
          boxShadow: 4,
        }}
      >
        <LazyLoadGameImage
          component="img"
          src={data.background_image || "/segna-posto.jpg"}
          alt={data.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "0 0 8px rgba(0,0,0,0.6)",
              px: 2,
            }}
          >
            {data.name}
          </Typography>
        </Box>
      </Box>

      {/* Info Section */}
      <Grid container spacing={4}>
        <Grid>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              mb: 4,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, textTransform: "uppercase", fontWeight: 600, color: theme.palette.primary.light }}
            >
              Data di rilascio: {data.released}
            </Typography>

            <Typography
              component="div"
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.8,
                fontSize: "1rem",
                color: theme.palette.text.secondary,
              }}
            >
              {data.description_raw || "Descrizione non disponibile."}
            </Typography>

            {/* Rating e piattaforme */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Rating
              name="half-rating-read"
              defaultValue={data.rating}
              precision={0.5}
              readOnly
            />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.platforms && data.platforms?.length > 0 ? (
                  <PlatformIcons platforms={data.platforms} />
                ) : (
                  <Typography>Nessuna piattaforma disponibile</Typography>
                )}
              </Box>
              {session && <ToggleFavorite data={data} />}
            </Box>
          </Paper>
        </Grid>
      
          <Paper sx={{ mt: 4, p: 2, borderRadius: 3 }}>
            <Chatbox data={data} />
          </Paper>
        
      </Grid>
    </Box>
  );
}
