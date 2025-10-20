"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut, Edit2Icon, User2, Plug2Icon, PlusIcon, Menu, X } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";
import { useState } from "react";

export default function Sidebar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>

      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar overlay */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-black text-white border-r border-gray-700 z-20
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex flex-col
        `}
      >
        {/* Top navigation */}
        <nav className="flex-1 space-y-2 p-4 mt-14 md:mt-0">
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

          <Link
            href="/dashboard/updateProject"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
          >
            <Plug2Icon className="h-4 w-4" />
            Project Table
          </Link>

          <Link
            href="/dashboard/addProject"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
          >
            <PlusIcon className="h-4 w-4" />
            Add Project
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

      {/* Overlay to close sidebar on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
