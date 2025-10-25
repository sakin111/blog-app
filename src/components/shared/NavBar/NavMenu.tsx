"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/provider/AuthProvider";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => {
 const { user, loading } = useAuth() 

return(
    <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start font-medium">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/blogs">Blogs</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/about">About</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/project">Project</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    {
    user?.email && (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/dashboard">Dashboard</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )}    </NavigationMenuList>
  </NavigationMenu>
)

}


