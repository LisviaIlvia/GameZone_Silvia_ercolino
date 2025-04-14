import { createContext } from "react";

const AuthContext = createContext({
  session: null,
  user: null,
});

export default AuthContext;
