import { useState, useEffect } from "react";
import { getUser, logout } from "../services/authService";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getUser();
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const signIn = (userData: AuthUser) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await logout();
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};