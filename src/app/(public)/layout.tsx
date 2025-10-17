
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar/NavBar";



export default async function PublicLayout({ children }: { children: React.ReactNode }) {


  return (
    <>
      <Navbar /> 
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
