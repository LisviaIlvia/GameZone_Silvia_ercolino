import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default,          
        py: 5,
        mt: "auto",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* COLONNA 1: CHI SIAMO */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6"  fontWeight="bold" gutterBottom sx={{color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main}}>
              Chi siamo
            </Typography>
            <Typography variant="body2">
              GameZone è la tua piattaforma di riferimento per le ultime novità
              sui videogiochi.
            </Typography>
          </Grid>

          {/* COLONNA 2: LINK UTILI */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main}}>
              Link Utili
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                href="/about"
                underline="none"
                sx={{
                  color: "inherit",
                  mb: 1,
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                Chi siamo
              </Link>
              <Link
                href="/contact"
                underline="none"
                sx={{
                  color: "inherit",
                  mb: 1,
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                Contatti
              </Link>
              <Link href="/privacy" underline="none" sx={{
                    color: "inherit",
                    mb: 1,
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                  }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* COLONNA 3: SOCIAL MEDIA */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main}}>
              Seguici su
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://x.com"
                target="_blank"
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <XIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* COLONNA 4: CONTATTI */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main}}>
              Contattaci
            </Typography>
            <Typography variant="body2">Email: support@gamezone.com</Typography>
            <Typography variant="body2">Telefono: +39 123 456 7890</Typography>
          </Grid>
        </Grid>

        {/* COPYRIGHT */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} GameZone - Tutti i diritti riservati.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
