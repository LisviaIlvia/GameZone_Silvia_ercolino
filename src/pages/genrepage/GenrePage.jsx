import { Typography, Grid, Box, CircularProgress, Alert } from "@mui/material";
import { useParams } from "react-router";
import useFetchApi from "../../hook/useFetchApi";
import usePaginationApi from "../../hook/usePaginationApi";
import { fetchGamesByGenre } from "../../utils/apiUrls";
import CardGame from "../../components/ui/CardGame";
import PaginationControls from "../../components/common/PaginationControls";

export default function GenrePage() {
  const { genre } = useParams();
  const { page, setPage, url } = usePaginationApi((p) =>
    fetchGamesByGenre(genre, p)
  );
  const { data, error, loading } = useFetchApi(url, true); 

  const totalPages = data?.count ? Math.ceil(data.count / 20) : 1;

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
    <Box>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
            textAlign: "center",
            mb: 3,
          }}
        >
          {genre} Games
        </Typography>
      </Grid>
      {data?.results?.map((game) => (
        <Grid
          key={game.id}
          size={{
            xs: 12, // 1 colonna sotto i 600px
            sm: 6, // 2 colonne tra 600px e 900px
            md: 4, // 3 colonne tra 900px e 1200px
            lg: 3, // 4 colonne tra 1200px e 1536px
          }}
        >
          <CardGame game={game} />
        </Grid>
      ))}
    </Grid>
      <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
    </Box>
  );
}
