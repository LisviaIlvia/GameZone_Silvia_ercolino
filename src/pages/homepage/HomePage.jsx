import { Box, Typography, Grid, CircularProgress, Alert, useTheme} from "@mui/material";
import CardGame from "../../components/ui/CardGame";
import useFetchApi from "../../hook/useFetchApi";
import usePaginationApi from "../../hook/usePaginationApi";
import { fetchGamesByPage} from "../../utils/apiUrls";
import zeldaImage from "../../assets/zelda-image.jpg";
import PaginationControls from "../../components/common/PaginationControls"


export default function HomePage() {
  const { page, setPage, url } = usePaginationApi(fetchGamesByPage);
  const { data, error } = useFetchApi(url);
  const theme = useTheme();
  const resultsPerPage = 20;
  const totalPages = data?.count ? Math.ceil(data.count / resultsPerPage) : 1;

  return (
    <Box sx={{
      px: 3,
      py: 5,
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
      minHeight: "100vh",
    }}>
      {/* Sezione Hero */}
      <Box sx={{ position: "relative", mb: 2 }}>
        <Box
          component="img"
          src={zeldaImage}
          alt="Zelda"
          sx={{
            width: "100%",
            height: "auto", 
            borderRadius: "8px",
            display: "block", 
          }}
        />
        <Box
         sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textShadow: "0 0 5px rgba(0,0,0,0.7)",
          bgcolor: "rgba(0,0,0,0.3)",
          borderRadius: "8px",
        }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
              textAlign: "center",
            }}
          >
            Dai un’occhiata alle ultime novità
          </Typography>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Errore: {error}
        </Alert>
      )}

      {!data && !error && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {data && data.results && (
        <Grid container spacing={3}>
          {data.results.map((game) => (
            <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CardGame game={game} />
            </Grid>
          ))}
        </Grid>
      )}  
      <PaginationControls page={page} setPage={setPage} totalPages={totalPages}/>
    </Box>
  );
}
