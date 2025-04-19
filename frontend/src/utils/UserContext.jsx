import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser({ email: decodedToken.sub, role: decodedToken.role });
        }
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    const decodedToken = jwtDecode(token);
    setUser({ email: decodedToken.sub, role: decodedToken.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
