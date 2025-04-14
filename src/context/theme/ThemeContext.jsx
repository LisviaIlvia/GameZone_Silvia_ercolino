import { createContext } from "react";

const ThemeContext = createContext({
  mode: "light",
  toggleColorMode: () => {}

})

export default ThemeContext;

