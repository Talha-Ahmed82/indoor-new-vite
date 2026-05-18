import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Upload, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { AuthShell, AuthInput } from "../components/auth/AuthShell";
import { setAuth } from "../lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const CATEGORIES = ["Cricket", "Football", "Badminton", "Snooker", "Padel", "Basketball"];

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    indoorName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    category: "",
    logo: "",
  });

  const update = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const validateStep = () => {
    if (step === 0) {
      if (!data.indoorName || !data.ownerName) return "Please fill in your indoor and owner name";
    }
    if (step === 1) {
      if (!data.email || !data.phone) return "Please fill email and phone";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Enter a valid email";
    }
    if (step === 2) {
      if (data.password.length < 6) return "Password must be at least 6 characters";
      if (data.password !== data.confirm) return "Passwords do not match";
    }
    if (step === 3) {
      if (!data.category) return "Pick a sports category";
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) return toast.error(err);
    if (step < 3) setStep(step + 1);
    else submit();
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setAuth({
        indoorName: data.indoorName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        category: data.category,
        logo: data.logo,
      });
      toast.success("Account created! Welcome to IndoorGo.");
      navigate({ to: "/dashboard" });
    }, 1000);
  };

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("logo", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <AuthShell title="Create your account" subtitle="Join 320+ arenas growing with IndoorGo.">
      {/* stepper */}
      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10">
            <motion.div
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1f5c46, #10b981)" }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {step === 0 && (
            <>
              <AuthInput label="Indoor Name" placeholder="Champion Arena" value={data.indoorName} onChange={(e) => update("indoorName", e.target.value)} />
              <AuthInput label="Owner Name" placeholder="Ali Khan" value={data.ownerName} onChange={(e) => update("ownerName", e.target.value)} />
            </>
          )}
          {step === 1 && (
            <>
              <AuthInput label="Email" type="email" placeholder="you@arena.com" value={data.email} onChange={(e) => update("email", e.target.value)} />
              <AuthInput label="Phone Number" placeholder="+92 300 1234567" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
            </>
          )}
          {step === 2 && (
            <>
              <AuthInput label="Password" type="password" placeholder="••••••••" value={data.password} onChange={(e) => update("password", e.target.value)} />
              <AuthInput label="Confirm Password" type="password" placeholder="••••••••" value={data.confirm} onChange={(e) => update("confirm", e.target.value)} />
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/60">Sports Category</span>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {CATEGORIES.map((c) => {
                    const active = data.category === c;
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => update("category", c)}
                        className="px-3 py-3 rounded-xl border text-sm font-medium transition"
                        style={{
                          borderColor: active ? "#10b981" : "rgba(255,255,255,0.1)",
                          background: active ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
                        }}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/60">Indoor Logo</span>
                <label className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/15 bg-white/5 cursor-pointer hover:bg-white/10 transition">
                  {data.logo ? (
                    <img src={data.logo} alt="logo" className="h-10 w-10 rounded-lg object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Upload className="h-4 w-4 text-white/60" />
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-medium">{data.logo ? "Logo uploaded" : "Upload logo"}</div>
                    <div className="text-xs text-white/50">PNG or JPG · up to 2MB</div>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={onLogo} />
                  {data.logo && <Check className="ml-auto h-4 w-4 text-[#10b981]" />}
                </label>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="h-12 px-5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-sm font-medium flex items-center gap-2 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={next}
          disabled={loading}
          className="flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl disabled:opacity-70 transition"
          style={{ background: "linear-gradient(135deg, #1f5c46, #10b981)" }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {step < 3 ? "Continue" : loading ? "Creating account…" : "Create Account"}
          {!loading && step < 3 && <ArrowRight className="h-4 w-4" />}
        </motion.button>
      </div>

      <p className="mt-6 text-center text-sm text-white/60">
        Already have an account? <Link to="/login" className="text-[#10b981] hover:underline font-medium">Login</Link>
      </p>
    </AuthShell>
  );
}
