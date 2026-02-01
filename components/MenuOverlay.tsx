"use client";
import { Utensils, ShoppingBasket, X, Sofa, Terminal } from "lucide-react";
import Link from "next/link";
import DevHeartbeat from "./DevHeartbeat";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const menuItems = [
    { name: "Recipes", href: "/", icon: <Utensils size={20} /> },
    { name: "Grocery list", href: "/grocery", icon: <ShoppingBasket size={20} /> },
    { name: "About us", href: "/about", icon: <Sofa size={20} /> },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-screen w-screen bg-background border-l border-foreground/10 p-8 pt-24 transition-transform duration-500 ease-out shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 p-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <nav className="space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 text-xl font-medium text-foreground/70 hover:text-foreground transition-all group"
            >
              <span className="text-foreground/30 group-hover:text-foreground group-hover:scale-110 transition-all">
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Added pb-24 to ensure the dev section sits comfortably
          above your TabBar
        */}
        <div className="mt-auto pb-24 space-y-6">
          <div className="border-t border-foreground/10 pt-6">
            {/* Heading Replacement */}
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20 mb-4">
              Back of House
            </h4>

            <div className="space-y-4">
              <DevHeartbeat />

              {/* Secret Dev Link */}
              <Link
                href="/dev"
                onClick={onClose}
                className="flex items-center gap-3 text-xs font-medium text-foreground/30 hover:text-foreground transition-colors group/dev"
              >
                <Terminal size={14} />
                <span>Test Kitchen</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
