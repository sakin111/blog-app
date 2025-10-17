"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut, Edit2Icon, User2 } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";



export default function Sidebar() {


const {logout}= useAuth()

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-black text-white fixed left-0 top-0  ">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/createBlogs"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Create Blog
        </Link>
        <Link
          href="/dashboard/blogTable"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Edit2Icon className="h-4 w-4" />
          Edit Blogs
        </Link>
        <Link
          href="/dashboard/updateProfile"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <User2 className="h-4 w-4" />
          Update Profile
        </Link>
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">

          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
  
      </div>
    </aside>
  );
}