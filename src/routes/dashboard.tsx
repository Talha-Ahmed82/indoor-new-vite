import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  CalendarCheck, Wallet, Users, Trophy, ArrowUpRight, ArrowDownRight, Clock,
} from "lucide-react";
import { GlassCard, PageHeader, StatusBadge } from "../components/layout/PageHeader";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — IndoorGo Vendor Panel" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Total Bookings", value: "1,284", change: 12.4, up: true, icon: CalendarCheck },
  { label: "Total Earnings", value: "Rs 248,500", change: 8.1, up: true, icon: Wallet },
  { label: "Total Users", value: "642", change: 4.6, up: true, icon: Users },
  { label: "Total Tournaments", value: "28", change: -2.3, up: false, icon: Trophy },
];

const earnings = [
  { m: "Jan", v: 18 }, { m: "Feb", v: 24 }, { m: "Mar", v: 31 }, { m: "Apr", v: 28 },
  { m: "May", v: 42 }, { m: "Jun", v: 38 }, { m: "Jul", v: 55 }, { m: "Aug", v: 61 },
  { m: "Sep", v: 49 }, { m: "Oct", v: 72 }, { m: "Nov", v: 80 }, { m: "Dec", v: 95 },
];

const bookingsData = [
  { d: "Mon", v: 24 }, { d: "Tue", v: 32 }, { d: "Wed", v: 28 }, { d: "Thu", v: 41 },
  { d: "Fri", v: 56 }, { d: "Sat", v: 72 }, { d: "Sun", v: 65 },
];

const tournamentPie = [
  { name: "Football", value: 45, color: "#1f5c46" },
  { name: "Cricket", value: 25, color: "#10b981" },
  { name: "Futsal", value: 20, color: "#34d399" },
  { name: "Badminton", value: 10, color: "#a7f3d0" },
];

const recentBookings = [
  { user: "Hamza Tariq", slot: "07:00 PM – 08:00 PM", sport: "Football", amount: "Rs 2,500", status: "approved" as const },
  { user: "Sara Ahmed", slot: "09:00 PM – 10:00 PM", sport: "Futsal", amount: "Rs 1,800", status: "pending" as const },
  { user: "Bilal Sheikh", slot: "06:00 PM – 07:00 PM", sport: "Cricket", amount: "Rs 3,200", status: "completed" as const },
  { user: "Ayesha Noor", slot: "10:00 PM – 11:00 PM", sport: "Badminton", amount: "Rs 1,200", status: "cancelled" as const },
];

const upcoming = [
  { team: "Lahore Strikers vs Karachi Kings", time: "Today · 7:00 PM", sport: "Cricket" },
  { team: "Green Wolves vs Red Phoenix", time: "Tomorrow · 9:00 PM", sport: "Football" },
  { team: "Smashers vs Aces", time: "Sat · 6:30 PM", sport: "Badminton" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Ali 👋"
        subtitle="Here's what's happening across your indoor arena today."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 shadow-card transition-shadow hover:shadow-elegant"
          >
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-20 blur-2xl gradient-primary group-hover:opacity-40 transition" />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className="mt-3 text-3xl font-bold font-display">{s.value}</div>
                <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${s.up ? "text-success-foreground" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {Math.abs(s.change)}% <span className="text-muted-foreground font-normal">vs last month</span>
                </div>
              </div>
              <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center text-white shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Earnings Overview</h3>
              <p className="text-xs text-muted-foreground">Last 12 months · in thousands</p>
            </div>
            <div className="text-2xl font-bold text-gradient">Rs 248.5K</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={earnings}>
              <defs>
                <linearGradient id="ea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,92,70,0.08)" />
              <XAxis dataKey="m" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,.12)" }} />
              <Area type="monotone" dataKey="v" stroke="#1f5c46" strokeWidth={2.5} fill="url(#ea)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-semibold text-lg">Tournament Mix</h3>
          <p className="text-xs text-muted-foreground mb-2">Participation by sport</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={tournamentPie} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4}>
                {tournamentPie.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {tournamentPie.map((t) => (
              <div key={t.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                <span className="text-muted-foreground">{t.name}</span>
                <span className="ml-auto font-semibold">{t.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bookings bar + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 p-6">
          <h3 className="font-semibold text-lg mb-4">Weekly Bookings</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bookingsData}>
              <defs>
                <linearGradient id="bb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#1f5c46" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,92,70,0.08)" />
              <XAxis dataKey="d" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
              <Bar dataKey="v" fill="url(#bb)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-semibold text-lg mb-4">Upcoming Matches</h3>
          <div className="space-y-3">
            {upcoming.map((u) => (
              <motion.div
                key={u.team}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted transition"
              >
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-white shrink-0">
                  <Trophy className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{u.team}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                    <Clock className="h-3 w-3" /> {u.time} · {u.sport}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent bookings */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Recent Bookings</h3>
          <a href="/bookings" className="text-xs font-semibold text-primary hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">User</th>
                <th className="py-3 pr-4">Slot</th>
                <th className="py-3 pr-4">Sport</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.user} className="border-b border-border/60 hover:bg-muted/30 transition">
                  <td className="py-3 pr-4 font-medium">{b.user}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{b.slot}</td>
                  <td className="py-3 pr-4">{b.sport}</td>
                  <td className="py-3 pr-4 font-semibold">{b.amount}</td>
                  <td className="py-3"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
