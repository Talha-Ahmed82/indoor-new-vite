import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trophy, Users, Calendar, Upload, X } from "lucide-react";
import { GlassCard, PageHeader, StatusBadge } from "../components/layout/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/tournaments")({
  head: () => ({ meta: [{ title: "Tournaments — IndoorGo Vendor Panel" }] }),
  component: TournamentsPage,
});

const initialTournaments = [
  { id: 1, name: "Lahore Premier Cup", sport: "Football", teams: 16, registered: 12, prize: 250000, fee: 5000, start: "Dec 15", status: "live" as const, color: "from-emerald-500 to-green-700" },
  { id: 2, name: "Cricket Champions League", sport: "Cricket", teams: 8, registered: 8, prize: 150000, fee: 3500, start: "Dec 22", status: "upcoming" as const, color: "from-green-600 to-teal-700" },
  { id: 3, name: "Futsal Frenzy", sport: "Futsal", teams: 12, registered: 7, prize: 80000, fee: 2000, start: "Jan 05", status: "upcoming" as const, color: "from-teal-500 to-emerald-700" },
  { id: 4, name: "Smash Masters Open", sport: "Badminton", teams: 24, registered: 18, prize: 50000, fee: 1500, start: "Jan 12", status: "upcoming" as const, color: "from-lime-500 to-green-600" },
];

function TournamentsPage() {
  const [open, setOpen] = useState(false);
  const [list] = useState(initialTournaments);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tournaments"
        subtitle="Run premium tournaments with brackets, prizes and live registrations."
        action={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-elegant transition"
          >
            <Plus className="h-4 w-4" /> Create Tournament
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elegant transition"
          >
            <div className={`relative h-32 bg-gradient-to-br ${t.color} overflow-hidden`}>
              <div className="absolute inset-0 bg-grid opacity-20" />
              <Trophy className="absolute -right-4 -bottom-4 h-32 w-32 text-white/15 animate-float" />
              <div className="relative p-4 flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur">
                  {t.sport}
                </span>
                <StatusBadge status={t.status} className="!bg-white/20 !text-white !border-white/30 backdrop-blur" />
              </div>
            </div>
            <div className="p-5 bg-card">
              <h3 className="font-bold text-lg">{t.name}</h3>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {t.registered}/{t.teams} teams</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {t.start}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${(t.registered / t.teams) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full gradient-primary"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg p-2.5 bg-muted/50">
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Prize Pool</div>
                  <div className="font-bold text-gradient">Rs {t.prize.toLocaleString()}</div>
                </div>
                <div className="rounded-lg p-2.5 bg-muted/50">
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Entry Fee</div>
                  <div className="font-bold">Rs {t.fee.toLocaleString()}</div>
                </div>
              </div>

              <button className="mt-4 w-full h-10 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
                View Bracket
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bracket preview */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-lg">Live Bracket — Lahore Premier Cup</h3>
            <p className="text-xs text-muted-foreground">Quarterfinals · Semifinals · Final</p>
          </div>
          <StatusBadge status="live" />
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-8 min-w-[700px]">
            {[
              ["Green Wolves", "Red Phoenix", "Blue Sharks", "Yellow Tigers"],
              ["Green Wolves", "Blue Sharks"],
              ["Green Wolves"],
            ].map((round, ri) => (
              <div key={ri} className="flex flex-col justify-around gap-4">
                {round.map((team, ti) => (
                  <motion.div
                    key={team + ti}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ri * 0.2 + ti * 0.1 }}
                    className={`relative rounded-xl p-3 border ${ri === 2 ? "gradient-primary text-white border-transparent shadow-glow" : "bg-muted/40 border-border"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${ri === 2 ? "bg-white/20" : "gradient-primary text-white"}`}>
                        {team[0]}
                      </div>
                      <span className="text-sm font-semibold">{team}</span>
                      {ri === 2 && <Trophy className="h-4 w-4 ml-auto" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Create modal */}
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
              className="w-full max-w-2xl bg-card rounded-2xl shadow-elegant border border-border max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
                <h2 className="text-xl font-bold">Create Tournament</h2>
                <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); toast.success("Tournament created!"); setOpen(false); }}
                className="p-6 space-y-5"
              >
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Banner</label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Drop your banner image here</p>
                    <p className="text-xs text-muted-foreground">or click to browse · JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <Field label="Tournament Name" placeholder="e.g. Lahore Premier Cup" />
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Sport" options={["Football", "Cricket", "Futsal", "Badminton"]} />
                  <Field label="Max Teams" placeholder="16" type="number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Start Date" type="date" />
                  <Field label="End Date" type="date" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Entry Fee" placeholder="Rs" type="number" />
                  <Field label="Winner Prize" placeholder="Rs" type="number" />
                  <Field label="Runner-up Prize" placeholder="Rs" type="number" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
                  <textarea rows={3} placeholder="Tell players what makes this tournament special…"
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-glow hover:shadow-elegant transition">Create Tournament</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" />
    </div>
  );
}
function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <select className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
