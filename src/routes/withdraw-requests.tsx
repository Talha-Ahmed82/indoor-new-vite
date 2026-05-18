import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingUp, Clock, X, ArrowDownToLine } from "lucide-react";
import { GlassCard, PageHeader, StatusBadge } from "../components/layout/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/withdraw-requests")({
  head: () => ({ meta: [{ title: "Withdraw — IndoorGo Vendor Panel" }] }),
  component: WithdrawPage,
});

const history = [
  { id: "WD-204", date: "Dec 04, 2025", method: "JazzCash", account: "0300•••4567", amount: 25000, status: "approved" as const },
  { id: "WD-203", date: "Nov 28, 2025", method: "Easypaisa", account: "0345•••1122", amount: 18000, status: "approved" as const },
  { id: "WD-202", date: "Nov 18, 2025", method: "Bank · HBL", account: "PK36•••8810", amount: 50000, status: "pending" as const },
  { id: "WD-201", date: "Nov 02, 2025", method: "JazzCash", account: "0300•••4567", amount: 12500, status: "rejected" as const },
];

function WithdrawPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader title="Wallet & Withdrawals" subtitle="Track earnings and withdraw to your preferred account."
        action={
          <button onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-elegant transition">
            <ArrowDownToLine className="h-4 w-4" /> Request Withdraw
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div whileHover={{ y: -4 }} className="relative rounded-2xl p-6 overflow-hidden gradient-hero text-white shadow-elegant">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest opacity-80">Current Balance</div>
            <div className="mt-3 text-4xl font-bold font-display">Rs 124,800</div>
            <div className="mt-2 text-xs opacity-80">Available to withdraw</div>
            <Wallet className="absolute right-0 top-0 h-8 w-8 opacity-60" />
          </div>
        </motion.div>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Withdrawn</div>
              <div className="mt-3 text-3xl font-bold font-display">Rs 487,200</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-success-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> 24 successful payouts
              </div>
            </div>
            <div className="h-11 w-11 rounded-xl bg-success/15 flex items-center justify-center text-success-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Pending</div>
              <div className="mt-3 text-3xl font-bold font-display">Rs 50,000</div>
              <div className="mt-2 text-xs text-muted-foreground">1 request awaiting approval</div>
            </div>
            <div className="h-11 w-11 rounded-xl bg-warning/15 flex items-center justify-center text-warning-foreground">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="font-semibold text-lg mb-4">Withdrawal History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">ID</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Method</th>
                <th className="py-3 pr-4">Account</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b border-border/60 hover:bg-muted/30 transition">
                  <td className="py-3 pr-4 font-medium">{h.id}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{h.date}</td>
                  <td className="py-3 pr-4">{h.method}</td>
                  <td className="py-3 pr-4 font-mono text-xs">{h.account}</td>
                  <td className="py-3 pr-4 font-semibold">Rs {h.amount.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={h.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-card rounded-2xl shadow-elegant border border-border"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold">Request Withdrawal</h2>
                <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); toast.success("Withdraw request submitted"); setOpen(false); }} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Method</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {["JazzCash", "Easypaisa", "Bank"].map((m) => (
                      <label key={m} className="cursor-pointer">
                        <input type="radio" name="method" defaultChecked={m === "JazzCash"} className="peer sr-only" />
                        <div className="text-center py-3 rounded-xl border-2 border-border peer-checked:border-primary peer-checked:bg-primary/5 text-sm font-semibold transition">
                          {m}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Title</label>
                  <input className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" placeholder="Ali Khan" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Number</label>
                  <input className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" placeholder="03001234567" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount (Rs)</label>
                  <input type="number" className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" placeholder="25000" />
                  <p className="mt-1 text-xs text-muted-foreground">Available: Rs 124,800</p>
                </div>
                <button type="submit" className="w-full h-12 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-elegant transition">Submit Request</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
