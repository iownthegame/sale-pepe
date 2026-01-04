"use client";
import { Menu, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 backdrop-blur-md grid grid-cols-3 items-center px-6 z-50">

      {/* Left Slot (Empty for now, or place for a Back button) */}
      <div className="flex justify-start">
        {!isHome && (
          <Link href="/" className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-black hover:text-gray-500">
            <ChevronLeft size={24} />
          </Link>
        )}
      </div>

      {/* Center Slot (The Logo) */}
      <div className="flex justify-center">
        <Link href="/">
          <span className="text-xl font-bold tracking-tighter whitespace-nowrap">
            sale<span className="font-light opacity-70">pepe</span>
          </span>
        </Link>
      </div>

      {/* Right Slot (Menu Button) */}
      <div className="flex justify-end">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
