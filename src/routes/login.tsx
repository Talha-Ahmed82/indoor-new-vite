import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { AuthShell } from "../components/auth/AuthShell";
import { setAuth, getAuth } from "../lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const existing = getAuth();
      setAuth({
        email,
        ownerName: existing?.ownerName || email.split("@")[0],
        indoorName: existing?.indoorName || "My Arena",
        phone: existing?.phone,
        category: existing?.category,
        city: existing?.city,
      });
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    }, 900);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Login to manage your indoor arena.">
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">Email</span>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@arena.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm text-white placeholder-white/30 transition focus:border-[#10b981] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
              />
            </div>
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">Password</span>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/5 border border-white/10 outline-none text-sm text-white placeholder-white/30 transition focus:border-[#10b981] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-white/70">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded accent-[#10b981]" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-[#10b981] hover:underline">Forgot password?</Link>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl disabled:opacity-70 transition"
          style={{ background: "linear-gradient(135deg, #1f5c46, #10b981)" }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Signing in…" : "Login"}
        </motion.button>

        <p className="text-center text-sm text-white/60">
          New here? <Link to="/signup" className="text-[#10b981] hover:underline font-medium">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
