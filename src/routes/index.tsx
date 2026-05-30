import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { heroBgUrl, titleLogoUrl } from "@/assets/images";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import Loader from "@/components/novafit/Loader";
import { SectionFlowTransition } from "@/components/novafit/SectionFlowTransition";
import Navbar from "@/components/novafit/Navbar";
import FloatingDock from "@/components/novafit/FloatingDock";
import MobileStickyCta from "@/components/novafit/MobileStickyCta";
import { MembershipProvider } from "@/components/novafit/membership-context";
import { siteConfig } from "@/lib/env";
import { getHealthClubJsonLd } from "@/lib/seo";
import {
  Hero,
  WhyChoose,
  Stats,
  Programs,
  Transformation,
  Trainers,
  Pricing,
  Gallery,
  Testimonials,
  Nutrition,
  Schedule,
  Contact,
  Footer,
} from "@/components/novafit/Sections";

const Tools = lazy(() => import("@/components/novafit/ToolsSection"));

function ToolsFallback() {
  return (
    <section className="section-divider mx-auto max-w-7xl px-4 py-16 md:py-24" aria-hidden>
      <div className="mx-auto mb-10 h-8 max-w-xs animate-pulse rounded-lg bg-muted/30" />
      <div className="grid gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted/20" />
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — ${siteConfig.tagline}` },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: `${siteConfig.name} — ${siteConfig.tagline}` },
      { property: "og:description", content: siteConfig.description },
      { property: "og:image", content: titleLogoUrl },
      { property: "og:url", content: siteConfig.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${siteConfig.name} — ${siteConfig.tagline}` },
      { name: "twitter:description", content: siteConfig.description },
      { name: "twitter:image", content: titleLogoUrl },
    ],
    links: [{ rel: "preload", as: "image", href: heroBgUrl, type: "image/webp" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(getHealthClubJsonLd()),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollToTop();

  return (
    <MembershipProvider>
      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <Loader />
        <Navbar />
        <main className="pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          <Hero />
          <SectionFlowTransition variant="hero-down" />
          <WhyChoose />
          <Stats />
          <Programs />
          <SectionFlowTransition variant="programs-transformation" />
          <Transformation />
          <SectionFlowTransition variant="transformation-down" />
          <Trainers />
          <Pricing />
          <Gallery />
          <Testimonials />
          <SectionFlowTransition variant="testimonials-cta" />
          <Suspense fallback={<ToolsFallback />}>
            <Tools />
          </Suspense>
          <Nutrition />
          <Schedule />
          <Contact />
        </main>
        <Footer />
        <FloatingDock />
        <MobileStickyCta />
      </div>
    </MembershipProvider>
  );
}
