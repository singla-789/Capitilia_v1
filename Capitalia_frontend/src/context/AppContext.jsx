import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");   // only token is removed
  };

  return (
    <AppContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AppContext.Provider>
  );
};
