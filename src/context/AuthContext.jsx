"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (active) {
          setUser(data?.user || null);
        }
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSession();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (data) => {
    const { data: sessionData, error } = await authClient.signIn.email(data);
    if (error) throw new Error(error.message);
    setUser(sessionData.user);
    return sessionData.user;
  }, []);

  const register = useCallback(async (data) => {
    const { data: sessionData, error } = await authClient.signUp.email(data);
    if (error) throw new Error(error.message);
    setUser(sessionData.user);
    return sessionData.user;
  }, []);

  const google = useCallback(async () => {
    const { data: sessionData, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) throw new Error(error.message);
    if (sessionData?.user) setUser(sessionData.user);
    return sessionData?.user;
  }, []);

  const logout = useCallback(async () => {
    const { error } = await authClient.signOut();
    if (error) throw new Error(error.message);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, google, logout }),
    [user, loading, login, register, google, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);