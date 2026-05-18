import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { AuthShell, AuthInput } from "../components/auth/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleOtp = (i: number, v: string) => {
    const val = v.replace(/\D/g, "").slice(-1);
    const arr = [...otp];
    arr[i] = val;
    setOtp(arr);
    if (val && i < 3) refs[i + 1].current?.focus();
  };

  const next = () => {
    if (step === 0) {
      if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email");
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(1); toast.success("OTP sent to " + email); }, 800);
    } else if (step === 1) {
      if (otp.join("").length < 4) return toast.error("Enter the 4-digit OTP");
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(2); }, 600);
    } else if (step === 2) {
      if (pw.length < 6) return toast.error("Password must be at least 6 characters");
      if (pw !== pw2) return toast.error("Passwords do not match");
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(3); }, 700);
    } else {
      navigate({ to: "/login" });
    }
  };

  const titles = ["Forgot password?", "Verify your email", "Set a new password", "All set!"];
  const subs = [
    "Enter your email and we'll send you a verification code.",
    `We sent a 4-digit code to ${email}`,
    "Choose a strong password to secure your account.",
    "Your password has been reset successfully.",
  ];

  return (
    <AuthShell title={titles[step]} subtitle={subs[step]} back="/login">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {step === 0 && (
            <div>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-wider text-white/60">Email</span>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@arena.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm text-white placeholder-white/30 transition focus:border-[#10b981] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
                </div>
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="flex justify-center gap-3">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  inputMode="numeric"
                  value={d}
                  onChange={(e) => handleOtp(i, e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Backspace" && !d && i > 0) refs[i - 1].current?.focus(); }}
                  className="h-16 w-14 rounded-xl bg-white/5 border border-white/10 text-center text-2xl font-bold text-white outline-none transition focus:border-[#10b981] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <>
              <AuthInput label="New Password" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
              <AuthInput label="Confirm Password" type="password" placeholder="••••••••" value={pw2} onChange={(e) => setPw2(e.target.value)} />
            </>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center py-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                className="h-20 w-20 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1f5c46, #10b981)" }}>
                <ShieldCheck className="h-10 w-10" />
              </motion.div>
              <p className="mt-4 text-sm text-white/70 text-center">You can now sign in with your new password.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={next}
        disabled={loading}
        className="mt-8 w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl disabled:opacity-70 transition"
        style={{ background: "linear-gradient(135deg, #1f5c46, #10b981)" }}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {step === 0 && (loading ? "Sending…" : "Send OTP")}
        {step === 1 && (loading ? "Verifying…" : "Verify Code")}
        {step === 2 && (loading ? "Updating…" : "Reset Password")}
        {step === 3 && "Go to Login"}
        {!loading && step < 3 && <ArrowRight className="h-4 w-4" />}
      </motion.button>

      {step === 1 && (
        <p className="mt-4 text-center text-sm text-white/60">
          Didn't get the code? <button onClick={() => toast.success("OTP resent")} className="text-[#10b981] hover:underline">Resend</button>
        </p>
      )}
      {step === 0 && (
        <p className="mt-6 text-center text-sm text-white/60">
          Remembered? <Link to="/login" className="text-[#10b981] hover:underline font-medium">Back to login</Link>
        </p>
      )}
    </AuthShell>
  );
}
