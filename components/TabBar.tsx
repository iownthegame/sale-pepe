"use client"; // This is required to use hooks like usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookSearch, CookingPot, BookMarked, ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TabBar() {
  const pathname = usePathname();

  // Define our tabs in an array to keep the code clean
  const tabs = [
    { name: "Home", href: "/", icon: CookingPot },
    { name: "Search", href: "/search", icon: BookSearch },
    { name: "Saved", href: "/saved", icon: BookMarked },
    // { name: "Grocery", href: "/grocery", icon: ShoppingBasket },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 border-t border-white/10 bg-background pb-0 z-50">
      <div className="flex h-full items-center justify-around px-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname === `${tab.href}/`;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-200",
                isActive ? "text-foreground" : "text-gray-500"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium uppercase tracking-widest">
                {tab.name}
              </span>
              {/* Optional: Small dot indicator for active tab */}
              {/* {isActive && (
                <div className="absolute bottom-2 w-1 h-1 bg-foreground rounded-full" />
              )} */}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
