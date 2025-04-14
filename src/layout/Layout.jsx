import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet} from "react-router";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";

export default function Layout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const drawerWidth = 220;


  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>

        {isDesktop && <Sidebar open drawerWidth={drawerWidth} />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { md: `${drawerWidth}px`, xs: 0 },
            p: 2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
