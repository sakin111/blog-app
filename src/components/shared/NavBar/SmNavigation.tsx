"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import { NavMenu } from "./NavMenu";

export const SmNavigation = () => {
  return (

    <div className="block lg:hidden md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[85%] sm:w-[70%] bg-white shadow-xl border-r border-gray-200 flex flex-col"
        >

          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4 px-4">
            <Logo />
          </div>


          <nav className="flex-1 overflow-y-auto">
            <NavMenu
              orientation="vertical"
              className="flex flex-col gap-4 font-medium text-gray-700 mx-7"
            />
          </nav>

        </SheetContent>
      </Sheet>
    </div>
  );
};
