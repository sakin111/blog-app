import Sidebar from "@/components/shared/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">

      <aside className="w-full md:w-64 flex-shrink-0 bg-white shadow-md">
        <Sidebar />
      </aside>


      <div className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-8 min-h-screen overflow-y-auto">
        {children}
      </div>
    </main>
  );
}
