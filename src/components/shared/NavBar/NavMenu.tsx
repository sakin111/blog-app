// components/navigation/NavMenu.tsx
import Link from "next/link";
import { getUser } from "@/action/useProfile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavMenuProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default async function NavMenu({
  orientation = "horizontal",
  className = "",
}: NavMenuProps) {
  const user = await getUser();

  const isVertical = orientation === "vertical";

  return (
    <NavigationMenu
      className={`${className} ${isVertical ? "flex-col items-start" : ""}`}
    >
      <NavigationMenuList
        className={`gap-6 font-medium ${
          isVertical ? "flex-col items-start space-y-3" : "flex-row"
        }`}
      >
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/blogs" className="hover:text-primary transition-colors">
              Blogs
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/project" className="hover:text-primary transition-colors">
              Project
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        {user?.email && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
