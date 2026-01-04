"use client";
import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 backdrop-blur-md grid grid-cols-3 items-center px-6 z-50">

      <div className="flex justify-start">
        {!isHome && (
          <Link href="/" className="p-2 -ml-2 rounded-full transition-colors text-forground/60 hover:text-foreground">
            <ChevronLeft size={24} />
          </Link>
        )}
      </div>

      <div className="flex justify-center">
        <Link href="/">
          <span className="text-xl font-bold tracking-tighter whitespace-nowrap">
            sale<span className="font-light opacity-70">pepe</span>
          </span>
        </Link>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
        >
          <Menu size={24} />
        </button>
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav >
  );
}
