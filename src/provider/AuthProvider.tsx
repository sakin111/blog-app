

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

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <InnerAuthProvider router={router}>{children}</InnerAuthProvider>
    </QueryClientProvider>
  );
};

const InnerAuthProvider = ({ children, router }: { children: ReactNode; router: ReturnType<typeof useRouter> }) => {
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await baseApi.get("/user/me", { withCredentials: true }); 
      return res.data.data as User;
    },
  staleTime: 0, 
  retry: false,
  initialData: null, 
  });



const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await baseApi.post("/auth/logout");
       queryClient.clear();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: isLoading,
        refetchUser:refetch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
