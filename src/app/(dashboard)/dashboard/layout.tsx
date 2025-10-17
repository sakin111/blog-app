import Sidebar from "@/components/shared/SideBar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />
   <div className="ml-64 flex-1 bg-gray-100 p-6 overflow-y-auto">
       {children}
   </div>
    </main>
  );
}