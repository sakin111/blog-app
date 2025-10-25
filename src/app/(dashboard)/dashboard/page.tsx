import DashboardHome from "@/components/shared/DashboardHome";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Dashboard page",
  description:
    "only user with the admin background can control this route",
};


export default async function DashboardPage() {


  
  return (
    <div >
   <DashboardHome/>
    </div>
  );
}
