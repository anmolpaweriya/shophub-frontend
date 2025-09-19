// auth-context.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUserData } from "./user-context";

const queryClient = new QueryClient();

interface AuthContextType {
  accessToken: string | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
}

export type UserRole = "CUSTOMER" | "VENDOR";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProviderChild({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/auth/sign-in`,
      {
        email: email.trim(),
        password,
      }
    );

    const { accessToken } = response.data.data;
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
  };

  const signup = useCallback(
    async (email: string, password: string, name: string, role: UserRole) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/auth/sign-up`,
          {
            email,
            password,
            name,
            role,
          }
        );

        const { accessToken } = response.data.data;
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Signup failed",
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, login, signup, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderChild>
        <UserProvider>{children}</UserProvider>
      </AuthProviderChild>
    </QueryClientProvider>
  );
}
