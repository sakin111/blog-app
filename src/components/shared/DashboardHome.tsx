"use client";

import { useAuth } from "@/provider/AuthProvider";
import { Card, CardContent, CardHeader } from "../ui/card";


export default function DashboardHome() {
  const { user, loading } = useAuth();



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
 <Card>
  <CardHeader>WELCOME TO THE DASHBOARD</CardHeader>
  <CardContent>
     {user.name}
     {user.email}
  </CardContent>
 </Card>
  );
}
