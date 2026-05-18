import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Star, Wifi, ParkingCircle, ShowerHead, Coffee, Camera, Edit3 } from "lucide-react";
import { GlassCard, PageHeader } from "../components/layout/PageHeader";

export const Route = createFileRoute("/indoor-profile")({
  head: () => ({ meta: [{ title: "Indoor Profile — IndoorGo Vendor Panel" }] }),
  component: ProfilePage,
});

const sports = [
  { name: "Football", price: 2500, slot: "60 min" },
  { name: "Cricket", price: 3200, slot: "90 min" },
  { name: "Futsal", price: 1800, slot: "60 min" },
  { name: "Badminton", price: 1200, slot: "60 min" },
];

const amenities = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: ParkingCircle, label: "Parking" },
  { icon: ShowerHead, label: "Showers" },
  { icon: Coffee, label: "Café" },
];

const colors = [
  "from-emerald-500 to-green-700",
  "from-teal-500 to-emerald-700",
  "from-green-600 to-teal-700",
  "from-lime-500 to-green-600",
  "from-emerald-600 to-teal-800",
];

function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Indoor Profile" subtitle="Showcase your arena to thousands of players."
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-elegant transition">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </button>
        }
      />

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden gradient-hero p-8 md:p-12 text-white shadow-elegant">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-glow/30 blur-3xl animate-float" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
              <Star className="h-3 w-3 fill-current" /> 4.8 · 312 reviews
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold font-display">Champions Indoor Arena</h2>
            <p className="mt-2 text-white/80 max-w-xl">Premium multi-sport indoor facility in the heart of Lahore — built for serious athletes and weekend warriors.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> DHA Phase 5, Lahore</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4" /> +92 300 1234567</span>
              <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" /> arena@indoorgo.pk</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gallery */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Gallery</h3>
          <button className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"><Camera className="h-3 w-3" /> Upload Photos</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {colors.map((c, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }}
              className={`aspect-square rounded-xl bg-gradient-to-br ${c} relative overflow-hidden cursor-pointer`}>
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute bottom-2 left-2 text-xs font-semibold text-white/90">Court {i + 1}</div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 p-6">
          <h3 className="font-semibold text-lg mb-4">Sports & Pricing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sports.map((s) => (
              <motion.div key={s.name} whileHover={{ y: -3 }}
                className="rounded-xl p-4 bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.slot} per session</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gradient">Rs {s.price.toLocaleString()}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">per slot</div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-semibold text-lg mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((a) => (
              <div key={a.label} className="rounded-xl p-3 bg-muted/40 border border-border flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-white">
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="font-semibold text-lg mb-2">Location</h3>
        <p className="text-sm text-muted-foreground mb-4">Plot 42, Phase 5, DHA, Lahore, Pakistan</p>
        <div className="aspect-[16/6] rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 relative overflow-hidden border border-border">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full pulse-glow" />
              <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-white shadow-glow">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
