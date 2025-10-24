"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { SmNavigation } from "./SmNavigation";
import { useAuth } from "@/provider/AuthProvider";
import { Loader2 } from "lucide-react";
import NavMenu from "./NavMenu";




const Navbar = () => {


  const {user,logout, loading} = useAuth()


  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-lg bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">

        <Link href="/" className="flex-shrink-0 ">
          <Logo />
        </Link>

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-4 md:gap-6">
    {user?.email ? (
        <Button
          className="rounded-full px-5 py-2 text-sm md:text-base"
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <Button
          disabled={loading}
          className="rounded-full px-5 py-2 text-sm md:text-base flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <Link href="/login" className="block w-full text-center">
              Login
            </Link>
          )}
        </Button>
      )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <SmNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;