import { Pagination, Box } from "@mui/material";

export default function PaginationControls({ page, setPage, totalPages }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        mt: 10,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        color="primary"
      />
    </Box>
  );
}
