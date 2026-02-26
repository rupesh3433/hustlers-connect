import React from "react";

const HeroHeading: React.FC = () => {
  return (
    <h1
      className="
        w-full
        text-center
        font-bold
        tracking-tight
        leading-[1.02]

        text-[1.6rem]
        sm:text-[1.85rem]
        md:text-[2.2rem]
        lg:text-[2.6rem]
        xl:text-[2.8rem]
      "
    >
      {/* Line 1 */}
      <span className="block whitespace-nowrap">
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Hustle
        </span>{" "}
        <span className="text-[color:var(--text-primary)]">
          with Purpose,
        </span>
      </span>

      {/* Line 2 */}
      <span className="block text-[color:var(--text-primary)] font-medium tracking-[-0.015em] whitespace-nowrap">
        Connect with Power
      </span>

      {/* Decorative Line */}
      <span
        className="
          block
          h-[2px]
          w-18
          mx-auto
          mt-2
          bg-gradient-to-r
          from-purple-400
          via-violet-400
          to-pink-400
          rounded-full
        "
      />
    </h1>
  );
};

export default React.memo(HeroHeading);