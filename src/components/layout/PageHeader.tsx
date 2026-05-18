import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-gradient">{title}</span>
        </h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
}

export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-card border border-border shadow-card overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: "pending" | "approved" | "completed" | "cancelled" | "rejected" | "live" | "upcoming";
  className?: string;
}) {
  const map: Record<string, string> = {
    pending: "bg-warning/15 text-warning-foreground border-warning/30",
    approved: "bg-success/15 text-success-foreground border-success/30",
    completed: "bg-primary/10 text-primary border-primary/30",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
    rejected: "bg-destructive/10 text-destructive border-destructive/30",
    live: "bg-success/20 text-success-foreground border-success/40",
    upcoming: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border capitalize",
        map[status],
        className,
      )}
    >
      {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-success pulse-glow" />}
      {status}
    </span>
  );
}
