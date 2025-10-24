/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, QueryObserverResult, useQuery, useQueryClient } from "@tanstack/react-query";
import baseApi from "@/utils/axios";
import { useRouter } from "next/navigation";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<QueryObserverResult<User | null, Error>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <InnerAuthProvider router={router}>{children}</InnerAuthProvider>
    </QueryClientProvider>
  );
};

const InnerAuthProvider = ({ children, router }: { children: ReactNode; router: ReturnType<typeof useRouter> }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store", 
        });

        if (!res.ok) {
          console.log("User fetch failed:", res.status, res.statusText);
          
          if (res.status === 401 || res.status === 403 || res.status === 404) {
            return null;
          }
          
          throw new Error(`Failed to fetch user: ${res.status}`);
        }

        const data = await res.json();
        console.log("User data fetched successfully:", data.data);
        
        return data.data as User;
      } catch (error) {
        console.error("User fetch error:", error);
        return null;
      }
    },
    staleTime: 0,
    retry: false, 
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const logout = async () => {
    try {
      await baseApi.post("/auth/logout", {}, { withCredentials: true });

      queryClient.clear();

      queryClient.setQueryData(["user"], null);
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      queryClient.setQueryData(["user"], null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: isLoading,
        refetchUser: refetch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;