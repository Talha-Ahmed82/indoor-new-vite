import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Trophy,
  Megaphone,
  Wallet,
  Building2,
  Settings,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/tournaments", label: "Tournaments", icon: Trophy },
  { to: "/marketing-posts", label: "Marketing Posts", icon: Megaphone },
  { to: "/withdraw-requests", label: "Withdraw Requests", icon: Wallet },
  { to: "/indoor-profile", label: "Indoor Profile", icon: Building2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 264 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="sticky top-0 h-screen shrink-0 z-30 hidden md:flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle at 30% 0%, rgba(16,185,129,0.25), transparent 60%)" }} />

      <div className="relative flex items-center gap-3 px-5 py-6">
        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-display font-bold text-lg leading-none">IndoorGo</div>
            <div className="text-[11px] text-sidebar-foreground/60 uppercase tracking-widest mt-1">Vendor Panel</div>
          </div>
        )}
      </div>

      <nav className="relative flex-1 px-3 space-y-1">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-primary-glow/30 to-transparent text-white shadow-glow"
                  : "text-sidebar-foreground/70 hover:text-white hover:bg-sidebar-accent"
              )}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r gradient-primary"
                />
              )}
              <Icon className={cn("h-5 w-5 shrink-0 transition", active && "text-primary-glow")} />
              {!collapsed && <span className="truncate">{it.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-primary-glow pulse-glow" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="relative p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white transition"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
