import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Bell, Globe, Shield, FileText, LogOut, X } from "lucide-react";
import { GlassCard, PageHeader } from "../components/layout/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — IndoorGo Vendor Panel" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [notif, setNotif] = useState({ bookings: true, tournaments: true, marketing: false, payouts: true });
  const [lang, setLang] = useState("English");

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" subtitle="Customize your IndoorGo experience." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SettingCard icon={Lock} title="Change Password">
          <div className="space-y-3">
            <Field placeholder="Current password" type="password" />
            <Field placeholder="New password" type="password" />
            <Field placeholder="Confirm new password" type="password" />
            <button onClick={() => toast.success("Password updated")} className="w-full h-11 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-elegant transition">
              Update Password
            </button>
          </div>
        </SettingCard>

        <SettingCard icon={Bell} title="Notifications">
          <div className="space-y-2">
            {([
              ["bookings", "Booking updates"],
              ["tournaments", "Tournament alerts"],
              ["marketing", "Marketing tips"],
              ["payouts", "Payout notifications"],
            ] as const).map(([key, label]) => (
              <Toggle
                key={key}
                label={label}
                value={notif[key]}
                onChange={(v) => setNotif((n) => ({ ...n, [key]: v }))}
              />
            ))}
          </div>
        </SettingCard>

        <SettingCard icon={Globe} title="Language">
          <div className="grid grid-cols-2 gap-2">
            {["English", "اردو", "العربية", "Français"].map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`py-3 rounded-xl border-2 text-sm font-semibold transition ${
                  lang === l ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted"
                }`}>{l}</button>
            ))}
          </div>
        </SettingCard>

        <SettingCard icon={Shield} title="Privacy">
          <div className="space-y-2">
            <Toggle label="Show indoor in search results" value={true} onChange={() => {}} />
            <Toggle label="Allow guest reviews" value={true} onChange={() => {}} />
            <Toggle label="Share analytics with IndoorGo" value={false} onChange={() => {}} />
          </div>
        </SettingCard>

        <SettingCard icon={FileText} title="Legal">
          <div className="space-y-2 text-sm">
            <a href="#" className="block py-2.5 px-3 rounded-lg hover:bg-muted transition">Terms & Conditions</a>
            <a href="#" className="block py-2.5 px-3 rounded-lg hover:bg-muted transition">Privacy Policy</a>
            <a href="#" className="block py-2.5 px-3 rounded-lg hover:bg-muted transition">Vendor Agreement</a>
            <a href="#" className="block py-2.5 px-3 rounded-lg hover:bg-muted transition">Refund Policy</a>
          </div>
        </SettingCard>

        <SettingCard icon={LogOut} title="Account">
          <p className="text-sm text-muted-foreground mb-4">Sign out of all sessions on this device.</p>
          <button onClick={() => setLogoutOpen(true)} className="w-full h-11 rounded-xl bg-destructive/10 text-destructive font-semibold text-sm hover:bg-destructive hover:text-destructive-foreground transition">
            Logout
          </button>
        </SettingCard>
      </div>

      <AnimatePresence>
        {logoutOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLogoutOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-card rounded-2xl shadow-elegant border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Sign out?</h3>
                <button onClick={() => setLogoutOpen(false)} className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <p className="text-sm text-muted-foreground">You'll need to sign back in to access your dashboard.</p>
              <div className="mt-6 flex gap-2">
                <button onClick={() => setLogoutOpen(false)} className="flex-1 h-11 rounded-xl border border-border hover:bg-muted text-sm font-medium transition">Cancel</button>
                <button onClick={() => { toast.success("Signed out"); setLogoutOpen(false); }}
                  className="flex-1 h-11 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm hover:opacity-90 transition">Sign out</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-glow">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {children}
    </GlassCard>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" />;
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted transition text-sm">
      <span>{label}</span>
      <span className={`relative h-6 w-11 rounded-full transition ${value ? "gradient-primary" : "bg-muted-foreground/30"}`}>
        <motion.span
          animate={{ x: value ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
        />
      </span>
    </button>
  );
}
