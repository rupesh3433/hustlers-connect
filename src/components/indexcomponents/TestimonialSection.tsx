// src/components/indexcomponents/TestimonialSection.tsx

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../shared/ThemeContext";

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  story: string;
};

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
  speed?: number; // seconds — lower = faster
}

// ─────────────────────────────────────────────────────────────────────────────
//  Default data
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    role: "Startup Founder",
    company: "ScaleX Labs",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    story:
      "Working with this platform transformed our workflow completely. The performance and execution quality exceeded every expectation we brought to the table.",
  },
  {
    id: "2",
    name: "Riya Patel",
    role: "Product Designer",
    company: "Designify",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    story:
      "The clarity in communication and execution speed made everything seamless. Highly professional and deeply committed to results that actually matter.",
  },
  {
    id: "3",
    name: "Karan Mehta",
    role: "CTO",
    company: "NextGen AI",
    avatarUrl: "https://i.pravatar.cc/150?img=45",
    story:
      "Technically sharp, reliable, and forward-thinking. One of the most structured and scalable implementations our team has ever worked with.",
  },
  {
    id: "4",
    name: "Sneha Kapoor",
    role: "Marketing Lead",
    company: "BrandLift",
    avatarUrl: "https://i.pravatar.cc/150?img=24",
    story:
      "Exceptional collaboration and execution at every step. Delivered measurable growth across all campaigns with zero compromise on quality.",
  },
  {
    id: "5",
    name: "Dev Nair",
    role: "Engineering Manager",
    company: "Cloudstack",
    avatarUrl: "https://i.pravatar.cc/150?img=57",
    story:
      "Reliability and quality are rare to find together. This platform delivered both, every single sprint without fail.",
  },
  {
    id: "6",
    name: "Priya Iyer",
    role: "UX Researcher",
    company: "Humanize",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    story:
      "The attention to detail in every deliverable was remarkable. Felt like working with a team that truly understood our users.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Star rating — purely decorative, adds visual richness to cards
// ─────────────────────────────────────────────────────────────────────────────

const StarRating = ({ theme }: { theme: "light" | "dark" }) => (
  <div className="flex gap-0.5 mb-4" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1L8.545 5.09H13L9.545 7.82L10.818 12L7 9.45L3.182 12L4.455 7.82L1 5.09H5.455L7 1Z"
          fill={theme === "dark" ? "rgba(250,204,21,0.9)" : "rgba(202,138,4,0.85)"}
        />
      </svg>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Quote icon
// ─────────────────────────────────────────────────────────────────────────────

const QuoteIcon = ({ theme }: { theme: "light" | "dark" }) => (
  <svg
    width="28"
    height="22"
    viewBox="0 0 28 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="mb-4 opacity-30 flex-shrink-0"
  >
    <path
      d="M0 22V13.52C0 9.973 0.773 7.04 2.32 4.72C3.893 2.4 6.107 0.773 8.96 0L11.04 2.72C9.44 3.227 8.107 4.12 7.04 5.4C5.973 6.653 5.373 8.173 5.24 9.96H11.04V22H0ZM16.96 22V13.52C16.96 9.973 17.733 7.04 19.28 4.72C20.853 2.4 23.067 0.773 25.92 0L28 2.72C26.4 3.227 25.067 4.12 24 5.4C22.933 6.653 22.333 8.173 22.2 9.96H28V22H16.96Z"
      fill={theme === "dark" ? "rgba(139,92,246,1)" : "rgba(99,102,241,1)"}
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Single card
// ─────────────────────────────────────────────────────────────────────────────

const TestimonialCard = ({
  testimonial,
  theme,
}: {
  testimonial: Testimonial;
  theme: "light" | "dark";
}) => {
  return (
    <article
      className={[
        "relative min-w-[256px] w-[256px] h-[420px]",
        "flex flex-col justify-between",
        "rounded-3xl border p-6",
        "select-none flex-shrink-0",
        // Glassmorphism — light
        "bg-white/60 border-neutral-200/80",
        // Glassmorphism — dark
        "dark:bg-white/[0.04] dark:border-white/[0.08]",
        "backdrop-blur-xl",
        // Subtle inner glow on hover
        "transition-shadow duration-300",
        "shadow-sm hover:shadow-md",
        "dark:shadow-none dark:hover:shadow-[0_4px_32px_rgba(139,92,246,0.12)]",
      ].join(" ")}
    >
      {/* Top: quote + stars + story */}
      <div className="flex flex-col">
        <QuoteIcon theme={theme} />
        <StarRating theme={theme} />

        <p
          className={[
            "text-[13.5px] leading-[1.75] font-normal",
            "text-neutral-700 dark:text-neutral-300",
            "line-clamp-[8]",
          ].join(" ")}
        >
          {testimonial.story}
        </p>
      </div>

      {/* Bottom: divider + avatar + meta */}
      <div className="mt-5">
        <div className="w-full h-px bg-neutral-200 dark:bg-white/10 mb-5" />

        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatarUrl}
            alt={`${testimonial.name}, ${testimonial.role}${testimonial.company ? ` at ${testimonial.company}` : ""}`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-white/10 flex-shrink-0"
            loading="lazy"
            decoding="async"
          />

          <div className="min-w-0">
            <p className="font-semibold text-[14px] leading-snug text-neutral-900 dark:text-neutral-100 truncate">
              {testimonial.name}
            </p>
            <p className="text-[12px] leading-snug text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
              {testimonial.role}
              {testimonial.company ? (
                <span className="text-neutral-400 dark:text-neutral-500">
                  {" "}· {testimonial.company}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Marquee row
// ─────────────────────────────────────────────────────────────────────────────

const MarqueeRow = ({
  items,
  speed,
  reverse,
  isPaused,
  theme,
}: {
  items: Testimonial[];
  speed: number;
  reverse: boolean;
  isPaused: boolean;
  theme: "light" | "dark";
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-5 w-max"
        animate={
          shouldReduceMotion || isPaused
            ? false
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{ willChange: "transform" }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} theme={theme} />
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Section heading with decorative accent line
// ─────────────────────────────────────────────────────────────────────────────

const SectionHeading = ({ theme }: { theme: "light" | "dark" }) => (
  <div className="text-center mb-12 px-4">

    {/* Title */}
    <h2
      className={[
        "text-3xl md:text-4xl font-bold leading-tight",
        "text-neutral-900 dark:text-neutral-100",
      ].join(" ")}
    >
      Our Clients{" "}
      <span
        className={
          theme === "dark"
            ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400"
            : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500"
        }
      >
        Story
      </span>
    </h2>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────────────────────────────────────

const TestimonialSection = ({
  testimonials,
  speed = 38,
}: TestimonialSectionProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Resolve safe list
  const safeList = useMemo<Testimonial[]>(() => {
    const list =
      Array.isArray(testimonials) && testimonials.length > 0
        ? testimonials
        : DEFAULT_TESTIMONIALS;
    // Need at least 2 copies to guarantee seamless loop
    return [...list, ...list];
  }, [testimonials]);

  // Split into two offset rows for visual depth
  const rowA = useMemo<Testimonial[]>(() => {
    // Even-indexed items  (rotated so each row starts differently)
    const base = safeList.filter((_, i) => i % 2 === 0);
    return [...base, ...base];
  }, [safeList]);

  const rowB = useMemo<Testimonial[]>(() => {
    const base = safeList.filter((_, i) => i % 2 !== 0);
    return [...base, ...base];
  }, [safeList]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-full flex flex-col justify-center overflow-hidden"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <SectionHeading theme={theme} />

      {/* ── Marquee rows ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 overflow-hidden">
        {/* Row A — scrolls left */}
        <MarqueeRow
          items={rowA}
          speed={speed}
          reverse={false}
          isPaused={isPaused}
          theme={theme}
        />

        {/* Row B — scrolls right (reverse) for depth */}
        <MarqueeRow
          items={rowB}
          speed={speed * 1.2}
          reverse
          isPaused={isPaused}
          theme={theme}
        />
      </div>

      {/* ── Edge fade overlays ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10",
          theme === "dark"
            ? "bg-gradient-to-r from-[#010106] to-transparent"
            : "bg-gradient-to-r from-[#eef0f8] to-transparent",
        ].join(" ")}
      />
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10",
          theme === "dark"
            ? "bg-gradient-to-l from-[#010106] to-transparent"
            : "bg-gradient-to-l from-[#eef0f8] to-transparent",
        ].join(" ")}
      />
    </section>
  );
};

export default TestimonialSection;