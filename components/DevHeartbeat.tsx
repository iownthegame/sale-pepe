"use client";
import { useState, useEffect } from "react";
import { Activity, Github } from "lucide-react";

export default function DevHeartbeat() {
  const [stats, setStats] = useState({
    date: "...",
    loading: true
  });

  useEffect(() => {
    async function fetchUpdate() {
      try {
        const res = await fetch("https://api.github.com/repos/iownthegame/sale-pepe");
        const data = await res.json();

        setStats({
          date: new Date(data.pushed_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          loading: false
        });
      } catch (err) {
        setStats(s => ({ ...s, loading: false }));
      }
    }
    fetchUpdate();
  }, []);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <a
          href="https://github.com/iownthegame/sale-pepe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-medium text-foreground/30 hover:text-foreground transition-colors group/git"
        >
          <Github size={14} className="group-hover/git:rotate-12 transition-transform" />
          <span className="truncate">Raw Ingredients</span>
        </a>

        <div className="flex items-center gap-2 text-[9px] font-mono text-foreground/20 shrink-0">
          <Activity
            size={12}
            className={`${stats.loading ? "animate-pulse" : "text-green-500/40"}`}
          />
          <span className="uppercase tracking-widest">{stats.date}</span>
        </div>
      </div>
    </div>
  );
}
