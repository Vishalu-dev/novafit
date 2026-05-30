import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
} & HTMLAttributes<HTMLElement>;

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  divider = true,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-divider relative mx-auto max-w-7xl px-4 py-16 md:py-24 ${divider ? "" : "section-divider-none"} ${className}`}
      {...rest}
    >
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-nova-pulse" />
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/75">{eyebrow}</span>
            </div>
          )}
          {title && (
            <h2 className="type-section font-display font-black uppercase tracking-tight text-foreground">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base md:leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
