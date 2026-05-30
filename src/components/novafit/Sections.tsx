import { motion, useScroll, useTransform, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";
import {
  FaDumbbell, FaBolt, FaHeartPulse, FaPersonRunning, FaUserShield, FaAppleWhole,
  FaClock, FaLocationDot, FaArrowRight, FaStar, FaCheck, FaFire, FaInstagram, FaWhatsapp,
} from "react-icons/fa6";
import { GiMuscleUp, GiWeightLiftingUp, GiMeditation, GiKnifeFork } from "react-icons/gi";
import heroBg from "@/assets/images/backgrounds/hero-bg.webp";
import transformationBg from "@/assets/images/backgrounds/transformation-bg.webp";
import ctaBg from "@/assets/images/backgrounds/cta-bg.webp";
import {
  titleLogo,
  programImages,
  trainerImages,
  galleryImages,
  testimonialAvatars,
} from "@/assets/images";
import { resolveImageSrc } from "@/lib/resolve-image-src";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SectionBackgroundImage } from "@/components/novafit/SectionBackgroundImage";
import { PremiumCard } from "@/components/novafit/PremiumCard";
import { useMembership } from "@/components/novafit/membership-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useHeroMouseEffects } from "@/hooks/use-hero-mouse-effects";
import { useHeroTouchGlow } from "@/hooks/use-hero-touch-glow";
import { useSectionInteractionGlow } from "@/hooks/use-section-interaction-glow";
import { siteConfig } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Section } from "@/components/novafit/Section";

const SPRING = { type: "spring" as const, stiffness: 280, damping: 30, mass: 0.85 };

function circularOffset(slideIndex: number, activeIndex: number, count: number) {
  let diff = slideIndex - activeIndex;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

/* ---------- HERO ---------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const touchGlowRef = useRef<HTMLDivElement>(null);
  const bgMouseRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { openMembership } = useMembership();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 80 : 140]);
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const particleCount = reducedMotion ? 0 : isMobile ? 4 : 10;
  const dustCount = reducedMotion ? 0 : isMobile ? 5 : 8;

  useHeroMouseEffects(ref, glowRef, bgMouseRef, {
    enabled: !isMobile && !reducedMotion,
  });
  useHeroTouchGlow(ref, touchGlowRef, isMobile && !reducedMotion);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="NOVAFIT hero"
      className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden pt-24 pb-36 md:pb-28 lg:pb-24"
    >
      <div className="absolute inset-0 z-0 min-h-[100dvh]">
        <motion.div className="absolute inset-0 min-h-[100dvh] will-change-transform" style={{ y: bgScrollY }}>
          <div ref={bgMouseRef} className="absolute inset-0 min-h-[100dvh]">
            <SectionBackgroundImage
              src={heroBg}
              priority
              imageOpacity={1}
              overlayClassName="from-background/70 via-background/55 to-background/95"
            />
          </div>
        </motion.div>
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,oklch(0.62_0.24_22/0.22),transparent_70%)]"
          aria-hidden
        />
        <div className="absolute inset-0 grid-bg opacity-[0.18]" aria-hidden />
        <div className="hero-light-rays" aria-hidden />
        <div
          ref={glowRef}
          className="hero-mouse-glow hidden md:block"
          aria-hidden
        />
        <div
          ref={touchGlowRef}
          className="hero-touch-glow md:hidden"
          aria-hidden
        />
        <div
          className="hero-ambient-glow absolute left-1/2 top-[18%] h-[70vmin] w-[70vmin] rounded-full bg-primary/20 blur-[90px]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-background via-background/85 to-transparent" aria-hidden />
        {Array.from({ length: dustCount }).map((_, i) => (
          <span
            key={`dust-${i}`}
            className="hero-dust"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${i * 0.7}s`,
            }}
            aria-hidden
          />
        ))}
        {Array.from({ length: particleCount }).map((_, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 61) % 100}%`,
              animationDelay: `${i * 0.45}s`,
              opacity: 0.2 + (i % 4) * 0.08,
            }}
            aria-hidden
          />
        ))}
      </div>

      <motion.div style={{ y: contentY, opacity }} className="relative z-10 mx-auto max-w-5xl px-4 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2"
        >
          <FaFire className="text-primary" />
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.3em]">
            Now Open · Pune Flagship
          </span>
        </motion.div>

        <motion.img
          src={resolveImageSrc(titleLogo)}
          alt="NOVAFIT"
          width={320}
          height={96}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-20 w-auto object-contain sm:h-24 md:h-28 lg:h-32"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="type-hero mt-6 font-display font-black uppercase tracking-tight md:mt-8"
        >
          <span className="text-gradient-silver">Forge Your</span>
          <br />
          <span className="text-gradient-neon">Ultimate Physique</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base md:leading-relaxed"
        >
          Premium fitness experience built for serious transformation. Elite trainers, intelligent programming, world-class facility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative z-20 mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center"
        >
          <button
            type="button"
            onClick={openMembership}
            aria-label="Join NOVAFIT membership"
            className="focus-ring group relative overflow-hidden rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground neon-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              Join Now <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </button>
          <a
            href="#programs"
            className="focus-ring rounded-full glass px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            Explore Programs
          </a>
        </motion.div>
      </motion.div>

      {/* scroll indicator — desktop only (mobile uses bottom nav) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 md:bottom-10 md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- WHY CHOOSE ---------- */
export function WhyChoose() {
  const items = [
    { icon: GiWeightLiftingUp, t: "Premium Equipment", d: "Imported Hammer Strength, Eleiko & Technogym lineup." },
    { icon: FaUserShield, t: "Certified Trainers", d: "ACE, NASM & ISSA certified elite coaching staff." },
    { icon: FaAppleWhole, t: "Personalized Nutrition", d: "Macros, meals & supplementation built for your goal." },
    { icon: FaClock, t: "24/7 Access", d: "Train on your schedule. Members get round-the-clock entry." },
    { icon: FaBolt, t: "Smart Programming", d: "Data-driven splits engineered for measurable progress." },
    { icon: FaHeartPulse, t: "Luxury Environment", d: "Climate-controlled floors, recovery lounge, spa-grade locker rooms." },
  ];
  return (
    <Section id="why" divider={false} eyebrow="Why NOVAFIT" title="Built Different" subtitle="A facility engineered around progress, performance, and prestige.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:neon-border"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
            <div className="relative">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary text-2xl ring-1 ring-primary/30">
                <it.icon />
              </div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wide">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- STATS ---------- */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && ref.current) {
        const c = new CountUp(ref.current, end, { duration: 2.2, suffix });
        c.start();
        io.disconnect();
      }
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
export function Stats() {
  const items = [
    { v: 10000, s: "+", l: "Members" },
    { v: 50, s: "+", l: "Elite Trainers" },
    { v: 15, s: "+", l: "Years Experience" },
    { v: 24, s: "/7", l: "Access" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12">
        <div className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-5xl font-black text-gradient-silver md:text-6xl">
                <Counter end={it.v} suffix={it.s} />
              </div>
              <div className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{it.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROGRAMS ---------- */
export function Programs() {
  const programs = [
    { icon: GiWeightLiftingUp, t: "Strength Training", d: "Compound-focused progressive overload.", img: programImages[0] },
    { icon: FaBolt, t: "HIIT", d: "High-intensity intervals for explosive conditioning.", img: programImages[1] },
    { icon: GiMeditation, t: "Yoga & Mobility", d: "Recovery, flexibility, mind-muscle connection.", img: programImages[2] },
    { icon: GiMuscleUp, t: "CrossFit", d: "Functional movements at high intensity.", img: programImages[3] },
    { icon: FaPersonRunning, t: "Cardio Zone", d: "Stairmaster, sled, assault bikes, sprint track.", img: programImages[4] },
    { icon: FaDumbbell, t: "Personal Training", d: "One-on-one elite coaching tailored to you.", img: programImages[5] },
  ];
  return (
    <Section id="programs" eyebrow="Programs" title="Train Like A Pro" subtitle="Six precision-engineered programs to crush every goal.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <PremiumCard
              as="a"
              href="#pricing"
              aria-label={`Learn more about ${p.t}`}
              className="block overflow-hidden rounded-2xl silver-border bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-56 overflow-hidden bg-surface">
                <OptimizedImage
                  src={p.img}
                  alt={`${p.t} program at NOVAFIT`}
                  fill
                  width={800}
                  height={450}
                  cinematic
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl glass-strong text-primary text-2xl">
                  <p.icon aria-hidden />
                </div>
              </div>
              <div className="relative p-6">
                <h3 className="font-display text-xl font-bold uppercase tracking-wide">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                <div className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-primary">
                  Learn More <FaArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- TRANSFORMATION ---------- */
export function Transformation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxRange = isMobile ? 20 : 40;
  const bgY = useTransform(scrollYProgress, [0, 1], [-parallaxRange, parallaxRange]);

  useSectionInteractionGlow(sectionRef, glowRef, {
    enabled: !reducedMotion,
    mouse: !isMobile,
    touch: isMobile,
  });

  const stages = [
    { t: "Beginner", w: "Weeks 1-4", d: "Form mastery, baseline conditioning, mobility prep." },
    { t: "Intermediate", w: "Weeks 5-12", d: "Progressive overload, hypertrophy phase, macro tuning." },
    { t: "Advanced", w: "Weeks 13+", d: "Peak performance, contest-ready aesthetics, elite output." },
  ];
  const cardReveal = (i: number) => ({
    duration: 0.6,
    delay: i * 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <div ref={sectionRef} className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 h-full w-screen max-w-[100vw] -translate-x-1/2"
        aria-hidden
      >
        <SectionBackgroundImage
          src={transformationBg}
          imageOpacity={0.35}
          overlayMode="transformation"
          parallaxY={reducedMotion ? undefined : bgY}
        />
        <div ref={glowRef} className="section-interaction-glow" aria-hidden />
      </div>
      <Section
        id="journey"
        eyebrow="Your Path"
        title="Transformation Journey"
        subtitle="A structured blueprint from day one to peak form."
        className="relative z-10"
        divider
      >
      {/* Mobile: stacked premium cards */}
      <div className="mx-auto flex max-w-md flex-col gap-4 md:hidden">
        {stages.map((s, i) => (
          <motion.article
            key={s.t}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={cardReveal(i)}
            className="flex flex-col items-center rounded-2xl border border-white/10 bg-surface/75 px-5 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-6 sm:py-6"
          >
            <div
              className="timeline-step-pulse mb-4 grid h-9 min-w-9 shrink-0 place-items-center rounded-full bg-primary px-3 text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.24_22/0.45)]"
              style={{ animationDelay: `${i * 0.35}s` }}
              aria-hidden
            >
              <span className="font-display text-[11px] font-bold tracking-wide">{i + 1}</span>
            </div>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">{s.w}</p>
            <h3 className="mt-2 font-display text-2xl font-black uppercase leading-snug tracking-tight text-foreground sm:text-[1.65rem]">
              {s.t}
            </h3>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </motion.article>
        ))}
      </div>

      {/* Desktop: timeline */}
      <div className="relative hidden md:block">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2">
          <div className="timeline-glow-line absolute inset-0 w-px" aria-hidden />
          <div
            className="absolute inset-0 w-px bg-primary/30 blur-[3px]"
            style={{ boxShadow: "0 0 12px oklch(0.62 0.24 22 / 0.55)" }}
            aria-hidden
          />
        </div>
        <div className="space-y-8">
          {stages.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={cardReveal(i)}
              className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`rounded-2xl glass p-8 backdrop-blur-md ${i % 2 ? "md:text-right" : ""}`}>
                <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">{s.w}</div>
                <h3 className="mt-2 font-display text-3xl font-black uppercase">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
              <div />
              <div
                className="timeline-step-pulse absolute left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground neon-glow"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <span className="font-display text-xs font-bold">{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </Section>
    </div>
  );
}

/* ---------- TRAINERS ---------- */
export function Trainers() {
  const trainers = [
    { name: "Arjun Rana", role: "Strength Coach", img: trainerImages[0] },
    { name: "Kavya Sharma", role: "HIIT Specialist", img: trainerImages[1] },
    { name: "Rohit Verma", role: "Powerlifting", img: trainerImages[2] },
    { name: "Priya Iyer", role: "Yoga & Mobility", img: trainerImages[3] },
  ];
  return (
    <Section id="trainers" eyebrow="Coaches" title="Meet The Elite" subtitle="World-class certified trainers ready to push you past your limits.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
          >
            <PremiumCard className="overflow-hidden rounded-2xl silver-border shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <OptimizedImage
                  src={t.img}
                  alt={`${t.name}, ${t.role} at NOVAFIT`}
                  fill
                  width={600}
                  height={800}
                  cinematic
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">{t.role}</div>
                  <h3 className="mt-1 font-display text-xl font-bold uppercase">{t.name}</h3>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- PRICING ---------- */
export function Pricing() {
  const plans = [
    { n: "Starter", p: 999, period: "1 Month", f: ["Full gym access", "Locker access", "Group classes"], pop: false },
    { n: "Performance", p: 4999, period: "6 Months", f: ["Everything in Starter", "1 PT session/week", "Nutrition plan", "Recovery lounge"], pop: true },
    { n: "Elite", p: 9999, period: "12 Months", f: ["Everything in Performance", "Unlimited PT", "Custom programming", "Spa access", "Priority booking"], pop: false },
  ];
  return (
    <Section id="pricing" eyebrow="Membership" title="Pick Your Edge" subtitle="Transparent pricing. No commitments hidden in fine print.">
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <PremiumCard
              className={cn(
                "relative rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.3)]",
                p.pop ? "glass-strong neon-border" : "glass",
              )}
            >
            {p.pop && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground neon-glow">
                Most Popular
              </div>
            )}
            <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">{p.period}</div>
            <h3 className="mt-2 font-display text-2xl font-black uppercase">{p.n}</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-black text-gradient-silver">₹{p.p.toLocaleString("en-IN")}</span>
            </div>
            <ul className="mt-8 space-y-3">
              {p.f.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                    <FaCheck className="text-[10px]" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={cn(
                "focus-ring mt-8 block rounded-full px-6 py-3 text-center font-display text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02]",
                p.pop ? "bg-primary text-primary-foreground neon-glow" : "glass-strong text-foreground",
              )}
            >
              Choose {p.n}
            </a>
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- GALLERY ---------- */
export function Gallery() {
  return (
    <Section id="gallery" eyebrow="Gallery" title="Inside The Arena" subtitle="A cinematic look at the NOVAFIT floor.">
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {galleryImages.map((src, i) => (
          <motion.div
            key={`gallery-${i}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl silver-border"
          >
            <div className="relative aspect-[4/3] w-full bg-surface">
              <OptimizedImage
                src={src}
                alt={`NOVAFIT gym gallery ${i + 1}`}
                fill
                width={900}
                height={675}
                cinematic
                className="transition-transform duration-700 hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- TESTIMONIALS ---------- */
type TestimonialItem = {
  n: string;
  r: string;
  q: string;
  img: string;
};

function TestimonialCard({ t, active }: { t: TestimonialItem; active: boolean }) {
  return (
    <div className="relative w-full will-change-transform">
      {active && (
        <div
          className="pointer-events-none absolute -bottom-3 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-full bg-primary/35 blur-2xl"
          aria-hidden
        />
      )}
      <PremiumCard
        className={cn(
          "relative rounded-2xl glass-strong p-6 md:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.28)]",
          active && "shadow-[0_0_48px_oklch(0.62_0.24_22/0.22)]",
        )}
      >
        <div className="flex items-center gap-1 text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className="text-sm" />
          ))}
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/90">&ldquo;{t.q}&rdquo;</p>
        <div className="mt-6 flex items-center gap-3">
          <OptimizedImage
            src={t.img}
            alt={t.n}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-primary/40"
          />
          <div className="min-w-0 text-left">
            <div className="font-display text-sm font-bold uppercase tracking-wide">{t.n}</div>
            <div className="text-xs text-muted-foreground">{t.r}</div>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
}

function TestimonialsCarousel({ tests }: { tests: TestimonialItem[] }) {
  const count = tests.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMobile = useIsMobile();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(advance, 4000);
    return () => window.clearInterval(id);
  }, [paused, advance]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !isMobile) return;
    const measure = () => setSlideWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setPaused(false);
    const threshold = 48;
    if (info.offset.x < -threshold) goTo(index + 1);
    else if (info.offset.x > threshold) goTo(index - 1);
  };

  if (isMobile) {
    const trackX = slideWidth ? -index * slideWidth : 0;
    const dragMax = slideWidth ? -(count - 1) * slideWidth : 0;

    return (
      <div className="mx-auto w-full max-w-lg">
        <div ref={viewportRef} className="overflow-hidden touch-pan-y">
          <motion.div
            className="flex cursor-grab active:cursor-grabbing will-change-transform"
            drag={slideWidth ? "x" : false}
            dragElastic={0.12}
            dragMomentum={false}
            dragConstraints={{ left: dragMax, right: 0 }}
            onDragStart={() => setPaused(true)}
            onDragEnd={handleDragEnd}
            animate={{ x: trackX }}
            transition={SPRING}
          >
            {tests.map((t) => (
              <div key={t.n} className="w-full min-w-full shrink-0 px-1">
                <TestimonialCard t={t} active />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
          {tests.map((t, i) => (
            <button
              key={t.n}
              type="button"
              role="tab"
              aria-label={`Show testimonial from ${t.n}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "focus-ring h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/45 hover:bg-muted-foreground/70",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  const slideStep = 340;

  return (
    <div
      className="relative mx-auto max-w-5xl select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto h-[min(320px,auto)] min-h-[280px] w-full overflow-hidden">
        {tests.map((t, i) => {
          const offset = circularOffset(i, index, count);
          if (Math.abs(offset) > 1) return null;
          const active = offset === 0;
          return (
            <motion.div
              key={t.n}
              className="absolute left-1/2 top-0 w-[min(400px,calc(100%-2rem))] max-w-md"
              initial={false}
              animate={{
                x: `calc(-50% + ${offset * slideStep}px)`,
                scale: active ? 1 : 0.88,
                opacity: active ? 1 : 0.58,
                filter: active ? "blur(0px)" : "blur(4px)",
                zIndex: active ? 20 : 10 - Math.abs(offset),
              }}
              transition={SPRING}
              style={{ pointerEvents: active ? "auto" : "none" }}
            >
              <TestimonialCard t={t} active={active} />
            </motion.div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
        {tests.map((t, i) => (
          <button
            key={t.n}
            type="button"
            role="tab"
            aria-label={`Show testimonial from ${t.n}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
            className={cn(
              "focus-ring h-2 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/45 hover:bg-muted-foreground/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const tests: TestimonialItem[] = [
    { n: "Aditya M.", r: "Member · 2 years", q: "NOVAFIT changed my life. The equipment, the coaches, the energy — nothing else in the city compares.", img: testimonialAvatars[0] },
    { n: "Sneha R.", r: "Member · 1 year", q: "I've trained at premium gyms across India. This is on another level. Worth every rupee.", img: testimonialAvatars[1] },
    { n: "Vikram S.", r: "Member · 3 years", q: "Lost 22kg in 8 months with their nutrition program. The coaches truly care about results.", img: testimonialAvatars[2] },
    { n: "Meera J.", r: "Member · 6 months", q: "The 24/7 access is a game changer. I can train at 5am or midnight — the facility is always pristine.", img: testimonialAvatars[3] },
  ];
  return (
    <Section id="testimonials" eyebrow="Voices" title="What Members Say" aria-label="Member testimonials">
      <TestimonialsCarousel tests={tests} />
    </Section>
  );
}

/* ---------- NUTRITION ---------- */
export function Nutrition() {
  const plans = [
    { t: "Lean Bulk", k: "2800 kcal", c: "High protein, moderate carbs. Engineered muscle growth.", i: <GiMuscleUp /> },
    { t: "Cutting", k: "1800 kcal", c: "Aggressive fat loss while preserving muscle mass.", i: <FaFire /> },
    { t: "Vegetarian", k: "2400 kcal", c: "Paneer, lentils, whey, tofu — full plant-forward protein.", i: <GiKnifeFork /> },
    { t: "High Protein", k: "2600 kcal", c: "200g+ protein daily for serious physique builders.", i: <FaAppleWhole /> },
  ];
  return (
    <Section id="nutrition" eyebrow="Nutrition" title="Eat To Win" subtitle="Curated meal plans by our in-house sports nutritionists.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <PremiumCard className="rounded-2xl glass p-6 shadow-[0_10px_32px_rgba(0,0,0,0.28)]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary text-2xl ring-1 ring-primary/30">{p.i}</div>
              <h3 className="font-display text-lg font-bold uppercase">{p.t}</h3>
              <div className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">{p.k}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.c}</p>
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- SCHEDULE ---------- */
export function Schedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const slots = [
    { t: "06:00", classes: ["Strength", "HIIT", "Strength", "HIIT", "Strength", "Open"] },
    { t: "08:00", classes: ["Yoga", "Cardio", "Yoga", "Cardio", "Yoga", "CrossFit"] },
    { t: "17:00", classes: ["CrossFit", "Strength", "HIIT", "Strength", "CrossFit", "HIIT"] },
    { t: "19:00", classes: ["HIIT", "Yoga", "Strength", "Yoga", "Open", "Open"] },
  ];
  return (
    <Section id="schedule" eyebrow="Weekly" title="Class Schedule">
      <div className="overflow-x-auto rounded-2xl glass-strong p-2 scrollbar-hide">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Time</th>
              {days.map((d) => (
                <th key={d} className="p-3 text-center font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((s) => (
              <tr key={s.t} className="border-t border-white/5">
                <td className="p-3 font-display text-sm font-bold text-primary">{s.t}</td>
                {s.classes.map((c, i) => (
                  <td key={i} className="p-2 text-center">
                    <span className={`inline-block w-full rounded-lg px-2 py-2 text-xs font-medium ${c === "Open" ? "bg-white/5 text-muted-foreground" : "bg-primary/10 text-foreground ring-1 ring-primary/30"}`}>
                      {c}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ---------- CONTACT + MAP ---------- */
export function Contact() {
  const { openMembership } = useMembership();
  return (
    <Section id="contact" eyebrow="Visit" title="Find The Floor" subtitle="Come tour the facility. First session on us.">
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-2xl glass-strong p-6 neon-border">
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30"><FaLocationDot /></div>
                <div>
                  <div className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Address</div>
                  <div className="mt-1 text-sm">NOVAFIT Flagship · Koregaon Park, Pune 411001</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30"><FaClock /></div>
                <div>
                  <div className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Hours</div>
                  <div className="mt-1 text-sm">Members 24/7 · Reception 6am – 11pm</div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Koregaon+Park+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring block rounded-full bg-primary px-6 py-3 text-center font-display text-xs font-bold uppercase tracking-widest text-primary-foreground neon-glow"
              >
                Get Directions
              </a>
              <button
                type="button"
                onClick={openMembership}
                className="mt-3 block w-full rounded-full glass px-6 py-3 text-center font-display text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-white/8"
              >
                Book Free Tour
              </button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl glass-strong neon-border lg:col-span-3">
          <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[220px] rounded-xl glass-dock p-4 md:left-5 md:top-5">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">Flagship</p>
            <p className="mt-1 text-sm font-medium text-foreground">Koregaon Park, Pune</p>
            <p className="mt-1 text-xs text-muted-foreground">Open 24/7 for members</p>
          </div>
          <iframe
            title="NOVAFIT Location"
            src="https://www.google.com/maps?q=Koregaon+Park,+Pune&output=embed"
            className="h-[min(420px,55vh)] w-full grayscale-[50%] contrast-110 brightness-90 md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  const { openMembership } = useMembership();
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaBgY = useTransform(scrollYProgress, [0, 1], [isMobile ? -8 : -12, isMobile ? 8 : 12]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative mt-12 border-t border-primary/20 bg-background/80 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <div
          ref={ctaRef}
          className="relative mb-10 isolate min-h-[160px] overflow-hidden rounded-2xl md:min-h-[140px]"
        >
          <SectionBackgroundImage
            src={ctaBg}
            imageOpacity={0.44}
            overlayMode="cta"
            parallaxY={reducedMotion ? undefined : ctaBgY}
          />
          {!reducedMotion && <div className="cta-breathing-glow" aria-hidden />}
          {isMobile && !reducedMotion && <div className="cta-ambient-mobile" aria-hidden />}
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
            <div className="rounded-xl bg-background/25 px-1 py-0.5 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
              <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground">Ready to transform?</p>
              <p className="mt-1 text-sm text-muted-foreground">Book a free consultation — built for elite athletes.</p>
            </div>
            <button
              type="button"
              onClick={openMembership}
              aria-label="Start your NOVAFIT journey"
              className="cta-btn-sweep focus-ring shrink-0 rounded-full bg-primary px-8 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground neon-glow transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Start Your Journey</span>
            </button>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <OptimizedImage src={titleLogo} alt="NOVAFIT" width={160} height={40} lazy={false} className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium futuristic gym engineered for serious athletes.
            </p>
            <p className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/90">
              Built for elite athletes
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOVAFIT on Instagram"
                className="grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-colors hover:text-[#E1306C]"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-colors hover:text-[#25D366]"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
          <div>
            <div className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground">Explore</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {["Programs", "Trainers", "Pricing", "Gallery", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Koregaon Park, Pune 411001</li>
              <li>
                <a href={`tel:${siteConfig.contactPhone}`} className="hover:text-primary">
                  {siteConfig.contactPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-primary">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground">Newsletter</div>
            <p className="mt-2 text-sm text-muted-foreground">Training tips & member exclusives.</p>
            {subscribed ? (
              <p className="mt-4 text-sm text-primary">You&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-primary/60"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-primary px-4 py-2.5 font-display text-[10px] font-bold uppercase tracking-widest text-primary-foreground"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NOVAFIT · Forge your ultimate physique.
      </div>
    </footer>
  );
}