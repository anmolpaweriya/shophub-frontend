// user-context.tsx
"use client";

import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./auth-context";

export enum USER_ROLE {
  CUSTOMER = "CUSTOMER",
  VENDOR = "VENDOR",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "VENDOR";
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  refetchUser: () => void;
  isFetchingUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth();

  const {
    data: user,
    isFetching,
    refetch,
  } = useQuery<User>({
    queryKey: ["user-details", accessToken],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_SERVICE_API_URL}/users/details`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response?.data?.data;
    },
    enabled: !!accessToken,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        refetchUser: () => refetch(),
        isFetchingUser: isFetching,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
