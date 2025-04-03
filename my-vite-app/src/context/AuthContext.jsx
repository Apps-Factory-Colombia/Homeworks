import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Hookcito misterioso que se me olvidó crear y que ahorra importar useContext y AuthContext en cada componente que necesite usar el contexto de autenticación. fak
export const useAuth = () => {
  return useContext(AuthContext);
};
