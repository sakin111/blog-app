"use client";

import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
    </div>
  );
}
