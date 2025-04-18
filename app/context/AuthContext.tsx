import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: null | { email: string };
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | { email: string }>(null);

  const login = (email: string, password: string) => {
    setUser({ email }); // Replace with real logic
  };

  const signup = (email: string, password: string) => {
    // setUser({ email }); // Replace with real logic
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
