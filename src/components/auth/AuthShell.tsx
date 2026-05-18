import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  back = "/",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  back?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1f17] text-white flex">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #10b981, transparent 60%)" }} />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #1f5c46, transparent 60%)" }} />
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="relative z-10 w-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-3xl p-8 md:p-10 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
        >
          <Link to={back as any} className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition mb-6">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1f5c46, #10b981)" }}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-none">IndoorGo</div>
              <div className="text-[11px] text-white/50 uppercase tracking-widest mt-1">Vendor Panel</div>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-white/60">{subtitle}</p>}

          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

export function AuthInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-white/60">{label}</span>
      <input
        {...props}
        className="mt-2 w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm text-white placeholder-white/30 transition focus:border-[#10b981] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
      />
    </label>
  );
}
