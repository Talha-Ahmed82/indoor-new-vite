import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Heart, MessageCircle, Share2, Eye, X, Image as ImageIcon, Calendar } from "lucide-react";
import { GlassCard, PageHeader } from "../components/layout/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing-posts")({
  head: () => ({ meta: [{ title: "Marketing — IndoorGo Vendor Panel" }] }),
  component: MarketingPage,
});

const posts = [
  { id: 1, title: "🔥 Weekend Football Frenzy", caption: "Get 20% off all weekend bookings. Bring your squad!", views: 1240, likes: 218, comments: 32, shares: 14, status: "Published", color: "from-emerald-500 to-green-700" },
  { id: 2, title: "🏏 Cricket Net Mega Sale", caption: "Limited slots — 30% off net practice this week.", views: 890, likes: 142, comments: 19, shares: 8, status: "Published", color: "from-teal-500 to-emerald-700" },
  { id: 3, title: "🏸 Badminton Doubles Night", caption: "Join the Friday night doubles league. Prizes await.", views: 540, likes: 76, comments: 12, shares: 4, status: "Scheduled", color: "from-lime-500 to-green-600" },
  { id: 4, title: "⚽ New Indoor Court Open", caption: "Pristine new astro turf is now available for booking.", views: 2340, likes: 412, comments: 58, shares: 31, status: "Published", color: "from-green-600 to-teal-700" },
];

function MarketingPage() {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Marketing Posts"
        subtitle="Promote your indoor arena across the IndoorGo mobile app."
        action={
          <button onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-elegant transition">
            <Plus className="h-4 w-4" /> Create Post
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: "48", sub: "+6 this month" },
          { label: "Total Views", value: "24.8K", sub: "+12% growth" },
          { label: "Avg. Engagement", value: "8.4%", sub: "Above industry" },
          { label: "Scheduled", value: "5", sub: "Next 7 days" },
        ].map((s) => (
          <GlassCard key={s.label} className="p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-2xl font-bold font-display">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {posts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl overflow-hidden border border-border bg-card shadow-card hover:shadow-elegant transition"
          >
            <div className={`relative h-48 bg-gradient-to-br ${p.color}`}>
              <div className="absolute inset-0 bg-grid opacity-15" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur text-white">
                {p.status}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-2xl font-bold font-display drop-shadow">{p.title}</div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground line-clamp-2">{p.caption}</p>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                <Stat icon={Eye} v={p.views} />
                <Stat icon={Heart} v={p.likes} />
                <Stat icon={MessageCircle} v={p.comments} />
                <Stat icon={Share2} v={p.shares} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
              className="w-full max-w-3xl bg-card rounded-2xl shadow-elegant border border-border max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
                <h2 className="text-xl font-bold">Create Marketing Post</h2>
                <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Banner</label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition cursor-pointer">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">Upload banner image</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
                    <input placeholder="Catchy headline" className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Caption</label>
                    <textarea rows={4} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Tell users why they should book now…"
                      className="mt-2 w-full px-4 py-3 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"><Calendar className="inline h-3 w-3 mr-1" /> Schedule</label>
                    <input type="datetime-local" className="mt-2 w-full h-11 px-4 rounded-xl bg-muted/40 border border-border focus:border-primary outline-none text-sm transition" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</label>
                  <div className="mt-2 rounded-2xl overflow-hidden border border-border">
                    <div className="h-48 bg-gradient-to-br from-emerald-500 to-green-700 relative">
                      <div className="absolute inset-0 bg-grid opacity-15" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-2xl font-bold font-display">Your title here</div>
                      </div>
                    </div>
                    <div className="p-4 bg-card text-sm">{caption || "Your caption will appear here…"}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 p-6 border-t border-border">
                <button onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition">Cancel</button>
                <button onClick={() => { toast.success("Post scheduled!"); setOpen(false); }} className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-glow hover:shadow-elegant transition">Publish</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ icon: Icon, v }: { icon: React.ComponentType<{ className?: string }>; v: number }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-muted/40">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-xs font-semibold">{v.toLocaleString()}</span>
    </div>
  );
}
