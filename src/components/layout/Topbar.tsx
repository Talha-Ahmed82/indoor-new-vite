import { Bell, Search, Wallet, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { clearAuth, getAuth, type AuthUser } from "../../lib/auth";
import { toast } from "sonner";

export function Topbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const sync = () => setUser(getAuth());
    sync();
    window.addEventListener("indoorgo-auth-change", sync);
    return () => window.removeEventListener("indoorgo-auth-change", sync);
  }, []);

  const initials = (user?.ownerName || "Vendor")
    .split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const logout = () => {
    clearAuth();
    toast.success("Logged out");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="flex items-center gap-4 px-4 md:px-8 h-16">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search bookings, tournaments, users…"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm transition"
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="hidden sm:flex items-center gap-2 rounded-xl px-3 py-2 gradient-primary text-white shadow-glow text-sm font-semibold"
        >
          <Wallet className="h-4 w-4" />
          <span className="opacity-80 text-xs font-medium">Earnings</span>
          <span>Rs 248,500</span>
        </motion.div>

        <button className="relative h-10 w-10 rounded-xl border border-border bg-card hover:bg-muted transition flex items-center justify-center">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive pulse-glow" />
        </button>

        <div className="flex items-center gap-3 rounded-xl pr-3 pl-1 py-1 border border-border bg-card">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold overflow-hidden">
            {user?.logo ? <img src={user.logo} alt="" className="h-full w-full object-cover" /> : initials}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold leading-none">{user?.ownerName || "Vendor"}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{user?.indoorName || "IndoorGo"}</div>
          </div>
        </div>

        <button onClick={logout} title="Logout" className="h-10 w-10 rounded-xl border border-border bg-card hover:bg-destructive hover:text-white transition flex items-center justify-center">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
