import Routing from "./routes/Routing";
import ThemeProvider from "./context/theme/ThemeProvider";
import SessionProvider from "./context/session/SessionProvider";
import FavoritesProvider from "./context/favorites/FavoritesProvider";

function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <FavoritesProvider>
          <Routing />
        </FavoritesProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
