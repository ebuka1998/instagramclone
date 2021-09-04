import { useState, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("instagramToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("instagramToken"));

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("instagramToken");
      } else {
        setUser(decodedToken);
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("instagramToken", userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("instagramToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
