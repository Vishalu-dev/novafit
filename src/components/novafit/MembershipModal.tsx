import { useState } from "react";
import { sanitizeEmail, sanitizePhoneDigits, sanitizeText } from "@/lib/sanitize";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MembershipModal({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("Performance");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPlan("Performance");
    setError("");
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleanName = sanitizeText(name, 80);
    const cleanEmail = sanitizeEmail(email);
    const digits = sanitizePhoneDigits(phone);
    if (!cleanName) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return setError("Please enter a valid email.");
    if (!/^\d{10}$/.test(digits.slice(-10)))
      return setError("Please enter a valid 10-digit phone number.");
    setSent(true);
    setTimeout(() => {
      onOpenChange(false);
      reset();
    }, 1400);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="glass-strong max-w-md border-white/10 bg-surface/95 sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold uppercase tracking-wide">
            Book Your Consultation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Free tour & fitness assessment. Our team will reach out within 24 hours.
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <p className="py-6 text-center font-display text-sm font-semibold uppercase tracking-widest text-primary">
            Request received — we&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
            <Field label="Phone" type="tel" value={phone} onChange={setPhone} placeholder="10-digit mobile" />
            <label className="block">
              <span className="mb-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Interested plan
              </span>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary/60"
              >
                {["Starter", "Performance", "Elite"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            {error && <p className="text-sm text-primary">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02] neon-glow"
            >
              Request Consultation
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
      />
    </label>
  );
}
