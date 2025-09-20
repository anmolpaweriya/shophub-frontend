// user-context.tsx
"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ContextType {
  categories: any[];
  refetchUser: () => void;
  isFetchingCategories: boolean;
  products: any[];
  refetchProducts: () => void;
  isFetchingProducts: boolean;
}

const Context = createContext<ContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const {
    data: categories,
    isFetching,
    refetch,
  } = useQuery<any[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/shop/categories`
      );
      return response?.data?.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: products,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/shop/products`
      );
      return response?.data?.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Context.Provider
      value={{
        categories: categories ?? [],
        refetchUser: () => refetch(),
        isFetchingCategories: isFetching,
        products: products ?? [],
        refetchProducts,
        isFetchingProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCategoriesData() {
  const c = useContext(Context);
  if (!c) {
    throw new Error(
      "useCategoriesData must be used within a CategoriesProvider"
    );
  }
  return c;
}
