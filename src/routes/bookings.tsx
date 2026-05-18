import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Check, X, Clock, MapPin } from "lucide-react";
import { GlassCard, PageHeader, StatusBadge } from "../components/layout/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — IndoorGo Vendor Panel" }] }),
  component: BookingsPage,
});

type Status = "pending" | "approved" | "completed" | "cancelled";
const tabs: Status[] = ["pending", "approved", "completed", "cancelled"];

const all = [
  { id: "BK-1042", user: "Hamza Tariq", phone: "+92 300 1234567", slot: "07:00 PM – 08:00 PM", sport: "Football", court: "Court A", amount: 2500, payment: "Paid", status: "pending" as Status },
  { id: "BK-1041", user: "Sara Ahmed", phone: "+92 321 9876543", slot: "09:00 PM – 10:00 PM", sport: "Futsal", court: "Court B", amount: 1800, payment: "Paid", status: "approved" as Status },
  { id: "BK-1040", user: "Bilal Sheikh", phone: "+92 333 5556677", slot: "06:00 PM – 07:00 PM", sport: "Cricket", court: "Net 1", amount: 3200, payment: "Paid", status: "completed" as Status },
  { id: "BK-1039", user: "Ayesha Noor", phone: "+92 345 1112233", slot: "10:00 PM – 11:00 PM", sport: "Badminton", court: "Court C", amount: 1200, payment: "Refunded", status: "cancelled" as Status },
  { id: "BK-1038", user: "Usman Riaz", phone: "+92 311 4445566", slot: "08:00 PM – 09:00 PM", sport: "Football", court: "Court A", amount: 2500, payment: "Pending", status: "pending" as Status },
  { id: "BK-1037", user: "Maryam Khan", phone: "+92 322 7778899", slot: "05:00 PM – 06:00 PM", sport: "Futsal", court: "Court B", amount: 1800, payment: "Paid", status: "approved" as Status },
  { id: "BK-1036", user: "Tahir Mehmood", phone: "+92 300 9990011", slot: "11:00 AM – 12:00 PM", sport: "Cricket", court: "Net 2", amount: 3200, payment: "Paid", status: "completed" as Status },
];

function BookingsPage() {
  const [tab, setTab] = useState<Status>("pending");
  const [q, setQ] = useState("");

  const filtered = all.filter(
    (b) => b.status === tab && (b.user.toLowerCase().includes(q.toLowerCase()) || b.id.includes(q.toUpperCase())),
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Bookings" subtitle="Manage every reservation across your indoor arena." />

      <GlassCard className="p-2">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const active = t === tab;
            const count = all.filter((b) => b.status === t).length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition whitespace-nowrap ${
                  active ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl gradient-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {t} <span className={`ml-1.5 text-[11px] ${active ? "opacity-80" : "opacity-60"}`}>({count})</span>
                </span>
              </button>
            );
          })}
        </div>
      </GlassCard>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or booking ID…"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border focus:border-primary outline-none text-sm transition"
          />
        </div>
        <button className="h-11 px-4 rounded-xl bg-card border border-border hover:bg-muted transition flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {filtered.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elegant transition group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 group-hover:opacity-15 blur-2xl gradient-primary transition" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">
                    {b.user.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{b.user}</div>
                    <div className="text-xs text-muted-foreground">{b.phone} · {b.id}</div>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> {b.slot}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {b.court}</div>
                <div className="text-muted-foreground">Sport: <span className="text-foreground font-medium">{b.sport}</span></div>
                <div className="text-muted-foreground">Payment: <span className="text-foreground font-medium">{b.payment}</span></div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                <div className="text-lg font-bold">Rs {b.amount.toLocaleString()}</div>
                {b.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => toast.error("Booking rejected")}
                      className="h-9 px-3 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition flex items-center gap-1.5 text-xs font-semibold">
                      <X className="h-3.5 w-3.5" /> Reject
                    </button>
                    <button onClick={() => toast.success("Booking approved")}
                      className="h-9 px-3 rounded-lg gradient-primary text-white hover:shadow-glow transition flex items-center gap-1.5 text-xs font-semibold">
                      <Check className="h-3.5 w-3.5" /> Approve
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="lg:col-span-2 text-center py-16 text-muted-foreground">
              No bookings found.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
