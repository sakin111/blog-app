// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/provider/AuthProvider";
// import { useRouter, usePathname } from "next/navigation";

// export const useProtectedRoute = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
   
//     if (!loading) {
//       setIsChecking(false);

//       const isDashboardRoute = pathname?.startsWith("/dashboard");
      
//       if (!user && isDashboardRoute) {
//         router.push("/login");
//       }
//     }
//   }, [loading, user, router, pathname]);

//   return { user, loading: loading || isChecking };
// };