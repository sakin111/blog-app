import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar/NavBar";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}