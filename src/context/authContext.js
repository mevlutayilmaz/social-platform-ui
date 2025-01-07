import { createContext, useState } from "react";
import { passwordLogin, logoutAuth } from "../api/auth";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(AuthService.getUsername() || null);

  const login = async (inputs) => {
    try {
      const data = await passwordLogin(inputs.username, inputs.password);
      console.log(data);
      AuthService.setToken(data);
      AuthService.setUsername(inputs.username);
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
