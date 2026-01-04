import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 backdrop-blur-md flex items-center justify-between px-6 z-50">
      <span className="text-xl font-bold tracking-tighter">
        sale<span className="font-light opacity-70">pepe</span>
      </span>
      {/* <button className="p-2">
        <Menu size={24} />
      </button> */}
    </nav>
  );
}
