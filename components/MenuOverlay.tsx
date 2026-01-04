"use client";
import { Utensils, ShoppingBasket, X, Sofa } from "lucide-react";
import Link from "next/link";

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
      {/* Backdrop Blur Layer */}
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer Panel - Added h-screen and flex-col */}
      <div
        className={`absolute right-0 top-0 h-screen w-[280px] bg-background border-l border-foreground/10 p-8 pt-24 transition-transform duration-500 ease-out shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 p-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content Container - Crucial: h-full and flex-col allow mt-auto to work */}
        <div className="flex flex-col h-full">
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

          {/* Footer - mt-auto now pushes this to the very bottom */}
          <div className="mt-auto pb-8 pt-12 border-t border-foreground/5">
            <p className="text-xs text-foreground/50 leading-relaxed italic font-light">
              Secret family recipes, <br /> curated for your kitchen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
