import { useSearchParams } from "react-router";
import useFetchApi from "../../hook/useFetchApi";
import usePaginationApi from "../../hook/usePaginationApi";
import { fetchSearchGames } from "../../utils/apiUrls";
import CardGame from "../../components/ui/CardGame";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import PaginationControls from "../../components/common/PaginationControls";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    

  const { page, setPage, url } = usePaginationApi((p) => fetchSearchGames(query, p));
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Risultati per "{query}"
      </Typography>

      <Grid container spacing={2}>
        {data?.results?.length > 0 ? (
          data.results.map((game) => (
            <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CardGame game={game} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Nessun gioco trovato.</Typography>
        )}
      </Grid>
      <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
    </Box>
  );
}
