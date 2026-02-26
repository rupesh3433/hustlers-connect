import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

interface DynamicCountProps {
  duration?: number;
  className?: string;
}

const STATS: ReadonlyArray<{
  label: string;
  target: number;
}> = [
  { label: "Views", target: 500_000_000 },
  { label: "Followers", target: 4_000_000 },
];

const format = (n: number): string => {
  return `${Math.floor(n / 1_000_000)}M+`;
};

const useInViewOnce = <T extends HTMLElement>(
  ref: React.RefObject<T | null>
): boolean => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, visible]);

  return visible;
};

interface AnimatedCounterProps {
  target: number;
  duration: number;
  start: boolean;
}

const AnimatedCounter: React.FC<
  AnimatedCounterProps
> = ({ target, duration, start }) => {
  const [count, setCount] = useState<number>(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed =
        timestamp - startTimeRef.current;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(target * eased));

      if (progress < 1) {
        frameRef.current =
          requestAnimationFrame(tick);
      }
    };

    frameRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, target, duration]);

  return <>{format(count)}</>;
};

const DynamicCount: React.FC<
  DynamicCountProps
> = ({
  duration = 1600,
  className = "",
}) => {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const inView = useInViewOnce(
    containerRef
  );

  const statsContent = useMemo(() => {
    return STATS.map((stat, index) => (
      <React.Fragment key={stat.label}>
        <div className="flex flex-col items-center gap-1">
          <span
            className="
              text-[clamp(20px,2.2vw,22px)]
              font-bold
              leading-[1]
              bg-gradient-to-r
              from-[#4f8eff]
              via-[#b44fff]
              to-[#ff3b6b]
              bg-clip-text
              text-transparent
            "
          >
            <AnimatedCounter
              target={stat.target}
              duration={duration}
              start={inView}
            />
          </span>

          <span
            className="
              text-[9px]
              uppercase
              tracking-wide
              leading-[1.1]
              text-white/30
            "
          >
            {stat.label}
          </span>
        </div>

        {index < STATS.length - 1 && (
          <div className="w-px h-5 bg-white/10" />
        )}
      </React.Fragment>
    ));
  }, [duration, inView]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center text-center gap-1 ${className}`}
    >
      <p className="text-[10px] font-bold text-white/35 tracking-[0.35em] leading-[1.1] uppercase">
        Generating...
      </p>

      <div className="flex items-center justify-center gap-2.5">
        {statsContent}
      </div>
    </div>
  );
};

export default React.memo(DynamicCount);