"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SPLASH_KEY = "sale-pepe-last-visit";
const COOLDOWN_HOURS = 4;

function shouldShowSplash() {
  const last = localStorage.getItem(SPLASH_KEY);
  return !last || Date.now() - Number(last) > COOLDOWN_HOURS * 60 * 60 * 1000;
}

export default function IntroSplash() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (pathname !== "/") return;
    if (shownRef.current) return;
    if (!shouldShowSplash()) return;
    shownRef.current = true;
    setTimeout(() => {
      setFading(false);
      setVisible(true);
    }, 0);
    const fadeTimer = setTimeout(() => setFading(true), 1500);
    const hideTimer = setTimeout(() => {
      localStorage.setItem(SPLASH_KEY, String(Date.now()));
      setVisible(false);
    }, 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      shownRef.current = false;
      setVisible(false);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"} animate-[fadein_0.6s_ease-out]`}
    >
      <div className="relative w-64 h-64 overflow-hidden">
        <Image
          src="/images/intro.jpg"
          alt=""
          fill
          className="object-cover animate-[kenburns_3.5s_ease-out_forwards]"
          priority
        />
      </div>
    </div>
  );
}
