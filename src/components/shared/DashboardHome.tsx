"use client";

import { useAuth } from "@/provider/AuthProvider";


export default function DashboardHome() {
  const { user, loading } = useAuth();



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">
        Welcome, {user?.name || "Guest"}
      </h1>
      <p>Role: {user?.role || "N/A"}</p>
    </div>
  );
}
