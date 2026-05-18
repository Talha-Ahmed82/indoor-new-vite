// import { createFileRoute } from "@tanstack/react-router";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Play,
  BarChart3,
  Wallet,
  Megaphone,
  Activity,
  Building2,
  Clock,
  UserPlus,
  Check,
  Star,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

// export const Route = createFileRoute("/")({
//   component: LandingPage,
// });

const PRIMARY = "#1f5c46";
const SECONDARY = "#10b981";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0b1f17] overflow-x-hidden font-sans">
      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero />
      <Stats />
      <Features />
      <BracketShowcase />
      <DashboardPreview />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar({
  scrolled,
  mobileOpen,
  setMobileOpen,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const links = [
    { label: "Features", href: "#features" },
    { label: "Tournaments", href: "#tournaments" },
    { label: "Analytics", href: "#analytics" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/70 backdrop-blur-2xl border-b border-black/5 shadow-[0_4px_30px_rgba(31,92,70,0.06)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">IndoorGo</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#1f5c46]/60">
              Vendor Panel
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#0b1f17]/70 hover:text-[#1f5c46] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: SECONDARY }} />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1f5c46] hover:bg-[#1f5c46]/5 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
          >
            Get Started
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <button
          className="md:hidden h-10 w-10 rounded-xl bg-white/70 border border-black/5 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-6 mt-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-xl p-5 space-y-3"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-[#0b1f17]/80 py-2"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1f5c46] border border-[#1f5c46]/20 text-center">
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white text-center"
              style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={ref} className="relative pt-36 pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf6] via-white to-white" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.35), transparent 60%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(31,92,70,0.3), transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#1f5c46 1px, transparent 1px), linear-gradient(90deg, #1f5c46 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div style={{ y }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1f5c46]/10 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: SECONDARY }} />
            <span className="text-xs font-semibold tracking-wide text-[#1f5c46]">
              #1 PLATFORM FOR INDOOR SPORTS VENDORS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          >
            Manage Your{" "}
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
              >
                Indoor Sports
              </span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.8 }}
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
              >
                <motion.path
                  d="M2 8 Q 150 -2 298 8"
                  stroke={SECONDARY}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>{" "}
            Business Like a Pro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-[#0b1f17]/70 max-w-xl leading-relaxed"
          >
            Bookings, tournaments, earnings, analytics, marketing and player management — all in
            one powerful platform built for modern arena owners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.6)] transition-all hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
            >
              Start Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-[#1f5c46] bg-white border border-[#1f5c46]/15 hover:border-[#1f5c46]/30 hover:bg-[#1f5c46]/5 transition">
              <span className="h-9 w-9 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition"
                style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}>
                <Play className="h-4 w-4 text-white fill-white ml-0.5" />
              </span>
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center gap-6 text-sm text-[#0b1f17]/60"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-white shadow"
                  style={{
                    background: `linear-gradient(135deg, hsl(${140 + i * 20}, 50%, ${40 + i * 5}%), ${SECONDARY})`,
                  }}
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="text-xs mt-0.5">Trusted by 500+ arena owners</div>
            </div>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative h-[560px]"
    >
      {/* Glow */}
      <div
        className="absolute inset-10 rounded-[2.5rem] blur-3xl opacity-50"
        style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
      />

      {/* Main dashboard mock */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full rounded-[2rem] overflow-hidden bg-white border border-black/5 shadow-2xl"
      >
        <div className="h-12 flex items-center gap-2 px-5 border-b border-black/5 bg-gradient-to-r from-[#f8fdfa] to-white">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="ml-auto text-xs font-semibold text-[#1f5c46]/60">indoorgo.app/dashboard</div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#0b1f17]/50">Welcome back</div>
              <div className="font-display font-bold text-xl">Champions Arena</div>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
            >
              + $4,820 today
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Bookings", value: "1,284", color: SECONDARY },
              { label: "Revenue", value: "$48K", color: PRIMARY },
              { label: "Tournaments", value: "32", color: "#0ea5e9" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-[#f8fdfa] p-3 border border-black/5">
                <div className="text-[10px] text-[#0b1f17]/50 uppercase tracking-wider">{s.label}</div>
                <div className="font-display font-bold text-lg mt-0.5">{s.value}</div>
                <div className="mt-1 h-1 w-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-black/5 p-4 bg-gradient-to-br from-white to-[#f8fdfa]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Earnings Overview</div>
              <div className="text-xs text-[#0b1f17]/50">Last 7 days</div>
            </div>
            <svg viewBox="0 0 300 100" className="w-full h-24">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SECONDARY} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={SECONDARY} stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.6 }}
                d="M0,70 C40,40 70,80 110,50 C150,20 190,60 230,30 C260,10 280,25 300,15"
                fill="none"
                stroke={PRIMARY}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                d="M0,70 C40,40 70,80 110,50 C150,20 190,60 230,30 C260,10 280,25 300,15 L300,100 L0,100 Z"
                fill="url(#g1)"
              />
            </svg>
          </div>

          {/* Bookings list */}
          <div className="space-y-2">
            {[
              { name: "Futsal — Court A", time: "6:00 PM", price: "$45" },
              { name: "Cricket — Net 2", time: "7:30 PM", price: "$60" },
            ].map((b) => (
              <div key={b.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f8fdfa] border border-black/5">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
                >
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{b.name}</div>
                  <div className="text-xs text-[#0b1f17]/50">{b.time}</div>
                </div>
                <div className="text-sm font-bold text-[#1f5c46]">{b.price}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute -left-6 top-32 rounded-2xl bg-white shadow-2xl border border-black/5 p-4 w-56"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
          >
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-[#0b1f17]/50">Live Tournament</div>
            <div className="text-sm font-bold">Pro Cup 2026</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-[#0b1f17]/60">16 teams</span>
          <span className="font-semibold text-[#10b981]">● Live</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute -right-4 top-20 rounded-2xl bg-white shadow-2xl border border-black/5 p-4 w-48"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#0b1f17]/50">New Booking</span>
          <Zap className="h-4 w-4 text-amber-500" />
        </div>
        <div className="mt-1 font-display font-bold text-lg">+$120</div>
        <div className="mt-2 text-xs text-emerald-600 font-semibold">↑ 23% vs yesterday</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        className="absolute -right-6 bottom-16 rounded-2xl bg-white shadow-2xl border border-black/5 p-3 w-52"
      >
        <div className="text-xs text-[#0b1f17]/50 mb-2">Player Activity</div>
        <div className="flex items-end gap-1 h-12">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
              className="flex-1 rounded-t-sm"
              style={{ background: i === 5 ? SECONDARY : `${PRIMARY}40` }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { value: 10000, suffix: "+", label: "Bookings Managed" },
    { value: 500, suffix: "+", label: "Indoor Venues" },
    { value: 50000, suffix: "+", label: "Active Players" },
    { value: 1000000, suffix: "+", label: "Earnings Processed", prefix: "$" },
  ];
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-[2rem] p-10 md:p-14 relative overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${PRIMARY}, #0f3d2e)` }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl opacity-40"
            style={{ background: SECONDARY }}
          />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-white">
            {stats.map((s, i) => (
              <CounterCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterCard({
  value,
  suffix = "",
  prefix = "",
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = n >= 1000 ? `${(n / 1000).toFixed(n >= 1_000_000 ? 1 : 0)}${n >= 1_000_000 ? "M" : "K"}` : `${n}`;

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-white/70 font-medium">{label}</div>
    </div>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const features = [
    { icon: Calendar, title: "Booking Management", desc: "Real-time slot booking, automated confirmations, and conflict-free scheduling." },
    { icon: Trophy, title: "Tournament System", desc: "Build brackets, register teams and broadcast matches with one click." },
    { icon: Wallet, title: "Withdraw & Earnings", desc: "Track revenue, manage payouts and withdraw via JazzCash or Easypaisa." },
    { icon: Megaphone, title: "Marketing Posts", desc: "Promote events to thousands of nearby players with built-in social tools." },
    { icon: BarChart3, title: "Real-time Analytics", desc: "Beautiful dashboards with revenue, occupancy and player insights." },
    { icon: Building2, title: "Indoor Management", desc: "Manage courts, amenities, photos and operating hours seamlessly." },
    { icon: Clock, title: "Match Scheduling", desc: "Drag-and-drop scheduling and automated reminders for every match." },
    { icon: UserPlus, title: "Team Registration", desc: "Smooth onboarding for teams with player rosters and ID verification." },
  ];

  return (
    <section id="features" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Features"
          title="Everything you need to run a winning arena"
          subtitle="A complete operating system for indoor sports vendors — designed to feel as good as it performs."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-white border border-black/5 p-6 shadow-[0_4px_20px_-8px_rgba(31,92,70,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.35)] transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at top right, rgba(16,185,129,0.08), transparent 60%)" }}
              />
              <div
                className="relative h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <div className="relative font-display font-bold text-lg mt-5">{f.title}</div>
              <div className="relative text-sm text-[#0b1f17]/60 mt-2 leading-relaxed">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BRACKET ---------------- */
function BracketShowcase() {
  const matches = {
    qf: [
      { a: "Strikers FC", b: "Champions XI", sa: 3, sb: 1 },
      { a: "Royal Kings", b: "Eagles", sa: 2, sb: 4 },
      { a: "Phoenix", b: "Titans", sa: 5, sb: 2 },
      { a: "Wolves", b: "Falcons", sa: 0, sb: 3 },
    ],
    sf: [
      { a: "Strikers FC", b: "Eagles", sa: 2, sb: 1 },
      { a: "Phoenix", b: "Falcons", sa: 4, sb: 2 },
    ],
    f: [{ a: "Strikers FC", b: "Phoenix", sa: 3, sb: 2 }],
  };

  return (
    <section id="tournaments" className="relative py-28 bg-gradient-to-b from-white to-[#f0fdf6]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Tournaments"
          title="Game-style tournament brackets"
          subtitle="Inspired by the world's most loved sports games — visualize, manage and crown champions."
        />

        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#0f3d2e] via-[#1f5c46] to-[#0f3d2e] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.4), transparent 50%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.3), transparent 50%)",
            }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-white">
            <BracketColumn title="Quarter Finals" matches={matches.qf} />
            <BracketColumn title="Semi Finals" matches={matches.sf} dense />
            <BracketColumn title="Final" matches={matches.f} dense />
            <div className="flex flex-col items-center justify-center">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Champion</div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div
                  className="absolute inset-0 blur-2xl opacity-70"
                  style={{ background: `radial-gradient(circle, ${SECONDARY}, transparent 70%)` }}
                />
                <div
                  className="relative h-32 w-32 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20"
                  style={{ background: `linear-gradient(135deg, #f59e0b, #fbbf24)` }}
                >
                  <Trophy className="h-14 w-14 text-white" />
                </div>
                <div className="mt-4 text-center font-display font-bold text-xl">Strikers FC</div>
                <div className="text-center text-xs text-white/60 mt-1">Pro Cup Winner</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BracketColumn({
  title,
  matches,
  dense,
}: {
  title: string;
  matches: { a: string; b: string; sa: number; sb: number }[];
  dense?: boolean;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">{title}</div>
      <div className={`flex flex-col ${dense ? "gap-10" : "gap-3"}`}>
        {matches.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-3 hover:bg-white/10 transition"
          >
            <Row team={m.a} score={m.sa} winner={m.sa > m.sb} />
            <div className="h-px bg-white/10 my-2" />
            <Row team={m.b} score={m.sb} winner={m.sb > m.sa} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Row({ team, score, winner }: { team: string; score: number; winner: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded-md"
          style={{ background: winner ? SECONDARY : "rgba(255,255,255,0.15)" }}
        />
        <span className={`text-sm font-medium ${winner ? "text-white" : "text-white/60"}`}>{team}</span>
      </div>
      <span className={`text-sm font-bold ${winner ? "text-emerald-300" : "text-white/40"}`}>{score}</span>
    </div>
  );
}

/* ---------------- DASHBOARD PREVIEW ---------------- */
function DashboardPreview() {
  return (
    <section id="analytics" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Dashboard"
          title="Your business, beautifully visualized"
          subtitle="A premium control center built for clarity, speed and decision-making."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 relative"
        >
          <div
            className="absolute -inset-10 blur-3xl opacity-40"
            style={{ background: `radial-gradient(circle, ${SECONDARY}, transparent 70%)` }}
          />
          <div className="relative rounded-3xl bg-white border border-black/5 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[240px_1fr]">
              {/* Sidebar */}
              <div className="hidden lg:block p-5 border-r border-black/5 bg-gradient-to-b from-[#f8fdfa] to-white">
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-display font-bold">IndoorGo</span>
                </div>
                {["Dashboard", "Bookings", "Tournaments", "Marketing", "Earnings", "Settings"].map((it, i) => (
                  <div
                    key={it}
                    className={`px-3 py-2 rounded-lg text-sm font-medium mb-1 ${
                      i === 0 ? "text-white" : "text-[#0b1f17]/60 hover:bg-black/5"
                    }`}
                    style={i === 0 ? { background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` } : {}}
                  >
                    {it}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { l: "Today's Revenue", v: "$2,840", up: "+18%", i: TrendingUp },
                    { l: "New Bookings", v: "84", up: "+12%", i: Calendar },
                    { l: "Active Players", v: "1,205", up: "+24%", i: Users },
                    { l: "Tournaments", v: "12", up: "Live", i: Trophy },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl border border-black/5 p-4 bg-gradient-to-br from-white to-[#f8fdfa]">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-[#0b1f17]/50">{s.l}</div>
                        <s.i className="h-4 w-4 text-[#1f5c46]" />
                      </div>
                      <div className="font-display font-bold text-2xl mt-2">{s.v}</div>
                      <div className="text-xs font-semibold mt-1" style={{ color: SECONDARY }}>{s.up}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 rounded-2xl border border-black/5 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold">Weekly Performance</div>
                      <div className="text-xs text-[#0b1f17]/50">This week</div>
                    </div>
                    <div className="flex items-end gap-3 h-40">
                      {[55, 70, 45, 85, 65, 90, 75].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: i * 0.08 }}
                          className="flex-1 rounded-t-lg relative group"
                          style={{ background: `linear-gradient(180deg, ${SECONDARY}, ${PRIMARY})` }}
                        >
                          <div className="absolute inset-x-0 -top-6 text-center text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                            ${h * 12}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/5 p-5 bg-gradient-to-br from-[#f8fdfa] to-white">
                    <div className="font-semibold mb-4">Sport Mix</div>
                    <div className="flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e6f4ec" strokeWidth="3.5" />
                          <motion.circle
                            initial={{ strokeDasharray: "0 100" }}
                            whileInView={{ strokeDasharray: "65 100" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4 }}
                            cx="18" cy="18" r="15.9" fill="none" stroke={SECONDARY} strokeWidth="3.5" strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="font-display font-bold text-xl">65%</div>
                          <div className="text-[10px] text-[#0b1f17]/50">Futsal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { icon: Building2, title: "Create Indoor Profile", desc: "Set up your arena with photos, courts, amenities and pricing in minutes." },
    { icon: Calendar, title: "Manage Bookings & Tournaments", desc: "Accept reservations and run tournaments from one polished dashboard." },
    { icon: TrendingUp, title: "Grow Your Sports Business", desc: "Use marketing tools and analytics to scale revenue and player base." },
  ];
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#f0fdf6] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="How it works" title="Up and running in 3 simple steps" />

        <div className="mt-16 relative grid md:grid-cols-3 gap-6">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px" style={{
            background: `repeating-linear-gradient(90deg, ${SECONDARY} 0 8px, transparent 8px 16px)`,
          }} />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-2xl bg-white border border-black/5 p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="relative inline-flex">
                <div
                  className="h-20 w-20 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
                >
                  <s.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white border border-[#1f5c46]/20 flex items-center justify-center text-xs font-bold text-[#1f5c46]">
                  {i + 1}
                </div>
              </div>
              <div className="font-display font-bold text-xl mt-5">{s.title}</div>
              <div className="text-sm text-[#0b1f17]/60 mt-2 leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    { name: "Ahmed Raza", role: "Owner, Champions Arena", quote: "IndoorGo transformed how we run our futsal arena. Bookings doubled in 3 months." },
    { name: "Sara Khan", role: "Manager, Pro Sports Hub", quote: "The tournament system is genius. Our players love the bracket experience." },
    { name: "Bilal Hussain", role: "Director, Elite Indoor", quote: "Earnings tracking and instant withdraws are exactly what vendors needed." },
    { name: "Fatima Noor", role: "Owner, Court 7", quote: "Beautiful dashboard, smart marketing tools — feels like a Formula 1 of arena management." },
  ];
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Testimonials" title="Loved by arena owners worldwide" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white border border-black/5 p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex gap-0.5 text-amber-500 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm text-[#0b1f17]/80 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[#0b1f17]/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center text-white shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${PRIMARY}, #0f3d2e 50%, ${PRIMARY})` }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[800px] blur-3xl"
            style={{ background: `radial-gradient(circle, ${SECONDARY}, transparent 60%)` }}
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold tracking-wide mb-6">
              <Shield className="h-3.5 w-3.5" />
              FREE 14-DAY TRIAL — NO CARD REQUIRED
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-tight">
              Ready to Scale Your <span style={{ color: SECONDARY }}>Indoor Sports</span> Business?
            </h2>
            <p className="mt-5 text-white/70 max-w-2xl mx-auto text-lg">
              Join hundreds of arena owners using IndoorGo to manage, grow and dominate their market.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-[#1f5c46] bg-white shadow-2xl hover:-translate-y-1 transition-all"
              >
                Create Account
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
              >
                Login Now
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/60">
              {["Cancel anytime", "Premium support", "Secure payouts"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: SECONDARY }} /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0b1f17] text-white pt-20 pb-10 mt-10">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SECONDARY}, transparent)` }} />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="font-display font-bold text-lg">IndoorGo</div>
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            The premium operating system for indoor sports vendors and arena owners.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Product</div>
          <ul className="space-y-2 text-sm text-white/70">
            {["Features", "Tournaments", "Analytics", "Pricing"].map((l) => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Company</div>
          <ul className="space-y-2 text-sm text-white/70">
            {["About", "Careers", "Blog", "Press"].map((l) => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: SECONDARY }} /> hello@indoorgo.app</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: SECONDARY }} /> +92 300 1234567</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: SECONDARY }} /> Lahore, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <div>© {new Date().getFullYear()} IndoorGo. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SECTION HEADER ---------------- */
function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f5c46]/5 border border-[#1f5c46]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#1f5c46]"
      >
        <Activity className="h-3 w-3" /> {tag}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-5 font-display font-extrabold text-4xl md:text-5xl tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-[#0b1f17]/60 text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
