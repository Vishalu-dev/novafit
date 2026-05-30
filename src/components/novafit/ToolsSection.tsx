import { useMemo, useState } from "react";
import { Section } from "@/components/novafit/Section";

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input
        {...props}
        className="focus-ring w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
      />
    </label>
  );
}

function Select({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <select
        {...props}
        className="focus-ring w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function BMI() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const bmi = useMemo(() => {
    const hm = Number(h) / 100;
    const kg = Number(w);
    if (!hm || !kg) return null;
    return +(kg / (hm * hm)).toFixed(1);
  }, [h, w]);
  const status =
    bmi == null ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Optimal" : bmi < 30 ? "Overweight" : "Obese";
  return (
    <div className="rounded-2xl glass-strong p-6 md:p-8">
      <h3 className="font-display text-xl font-bold uppercase">BMI Calculator</h3>
      <p className="mt-1 text-xs text-muted-foreground">Body Mass Index — your starting benchmark.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field label="Height (cm)" type="number" min={0} value={h} onChange={(e) => setH(e.target.value)} placeholder="175" />
        <Field label="Weight (kg)" type="number" min={0} value={w} onChange={(e) => setW(e.target.value)} placeholder="72" />
      </div>
      <div className="mt-6 rounded-xl bg-background/40 p-5 text-center">
        <div className="font-display text-5xl font-black text-gradient-silver">{bmi ?? "—"}</div>
        <div className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">{status || "Enter values"}</div>
      </div>
    </div>
  );
}

function CalorieTracker() {
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [a, setA] = useState("");
  const [goal, setGoal] = useState("Maintain");
  const out = useMemo(() => {
    const kg = Number(w);
    const cm = Number(h);
    const age = Number(a);
    if (!kg || !cm || !age) return null;
    const bmr = 10 * kg + 6.25 * cm - 5 * age + 5;
    const tdee = bmr * 1.55;
    const cal = goal === "Cut" ? tdee - 500 : goal === "Bulk" ? tdee + 400 : tdee;
    return { cal: Math.round(cal), protein: Math.round(kg * 2), water: Math.round(kg * 35) };
  }, [w, h, a, goal]);
  return (
    <div className="rounded-2xl glass-strong p-6 md:p-8">
      <h3 className="font-display text-xl font-bold uppercase">Macro Tracker</h3>
      <p className="mt-1 text-xs text-muted-foreground">Daily calories, protein & hydration targets.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field label="Weight (kg)" type="number" min={0} value={w} onChange={(e) => setW(e.target.value)} placeholder="72" />
        <Field label="Height (cm)" type="number" min={0} value={h} onChange={(e) => setH(e.target.value)} placeholder="175" />
        <Field label="Age" type="number" min={0} value={a} onChange={(e) => setA(e.target.value)} placeholder="27" />
        <Select label="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} options={["Maintain", "Cut", "Bulk"]} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { l: "Calories", v: out?.cal, u: "kcal" },
          { l: "Protein", v: out?.protein, u: "g" },
          { l: "Water", v: out?.water, u: "ml" },
        ].map((m) => (
          <div key={m.l} className="rounded-xl bg-background/40 p-3 text-center">
            <div className="font-display text-2xl font-black text-gradient-silver">{m.v ?? "—"}</div>
            <div className="font-display text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {m.l} · {m.u}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIRecco() {
  const [goal, setGoal] = useState("Muscle Gain");
  const [level, setLevel] = useState("Beginner");
  const plans = {
    "Weight Loss": {
      workout: "5x HIIT + 3x Full-Body Strength weekly",
      diet: "High-protein cutting macros, calorie deficit",
      protein: "1.8g per kg bodyweight",
    },
    "Muscle Gain": {
      workout: "5x Hypertrophy split + 2x conditioning",
      diet: "Lean bulk with 300-400 kcal surplus",
      protein: "2.0g per kg bodyweight",
    },
    Endurance: {
      workout: "4x Conditioning + 2x Strength + 1x Mobility",
      diet: "Balanced macros, carb-forward pre-training",
      protein: "1.6g per kg bodyweight",
    },
  } as const;
  const p = plans[goal as keyof typeof plans];
  return (
    <div className="rounded-2xl glass-strong p-6 md:p-8">
      <h3 className="font-display text-xl font-bold uppercase">AI Fitness Match</h3>
      <p className="mt-1 text-xs text-muted-foreground">Smart plan based on your goal and level.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Select label="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} options={["Weight Loss", "Muscle Gain", "Endurance"]} />
        <Select label="Level" value={level} onChange={(e) => setLevel(e.target.value)} options={["Beginner", "Intermediate", "Advanced"]} />
      </div>
      <div className="mt-6 space-y-2">
        {[
          { l: "Workout", v: p.workout },
          { l: "Diet", v: p.diet },
          { l: "Protein", v: p.protein },
          { l: "Level", v: level },
        ].map((row) => (
          <div key={row.l} className="flex items-start justify-between gap-3 rounded-xl bg-background/40 p-3">
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">{row.l}</span>
            <span className="text-right text-xs text-foreground/90">{row.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ToolsSection() {
  return (
    <Section id="tools" eyebrow="Smart Tools" title="Plan With Precision" subtitle="Free calculators trusted by our member community.">
      <div className="grid gap-5 lg:grid-cols-3">
        <BMI />
        <CalorieTracker />
        <AIRecco />
      </div>
    </Section>
  );
}
