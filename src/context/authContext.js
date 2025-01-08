import { createContext, useState } from "react";
import { passwordLogin, logoutAuth } from "../api/auth";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser() || null);

  const login = async (inputs) => {
    try {
      const data = await passwordLogin(inputs.username, inputs.password);
      AuthService.setToken(data.token);
      setCurrentUser(data.user);
      AuthService.setCurrentUser(data.user);  
      window.location.href = "/";
    } catch (error) {
      
    }
  };

  const logout = async () => {
    await logoutAuth();
    setCurrentUser(null);
    AuthService.logout();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
