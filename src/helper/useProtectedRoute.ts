"use client";
import { useEffect } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

export const useProtectedRoute = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  return { user, loading };
};
