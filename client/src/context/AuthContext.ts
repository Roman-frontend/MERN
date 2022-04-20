import { createContext } from "react";

function login(jwtToken: string, id: string) {}

function logout() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login,
  logout,
  isAuthenticated: false,
});
