import React from "react";

const HeroHeading: React.FC = () => {
  return (
    <h1
      className="
        relative
        w-full
        flex
        flex-col
        items-center
        text-center

        font-bold
        tracking-tight

        text-[2.1rem]
        leading-[1.05]
        mb-6

        sm:text-[2.3rem]
        sm:mb-4

        md:text-[2.6rem]
        md:mb-0

        lg:text-[2.5rem]   /* smaller than md */
      "
    >
      <span className="block whitespace-nowrap md:whitespace-normal">
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Hustle
        </span>{" "}
        <span className="text-white">
          with Purpose,
        </span>
      </span>

      <span className="block text-white font-medium tracking-[-0.01em] leading-[1.08] mt-1">
        Connect with Power
      </span>

      <div className="mt-4 h-[2px] w-16 md:w-18 bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 rounded-full" />
    </h1>
  );
};

export default HeroHeading;