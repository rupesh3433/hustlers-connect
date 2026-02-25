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

        text-[1.9rem]
        leading-[1.05]

        sm:text-[2.4rem]
        md:text-[2.9rem]
        lg:text-[2.8rem]
        xl:text-[3rem]
      "
    >
      {/* First Line */}
      <span className="block whitespace-nowrap md:whitespace-normal">
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Hustle
        </span>{" "}
        <span className="text-white">
          with Purpose,
        </span>
      </span>

      {/* Second Line */}
      <span className="block text-white font-medium tracking-[-0.01em]">
        Connect with Power
      </span>

      {/* Accent Line */}
      <div className="mt-4 h-[3px] w-16 md:w-20 bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 rounded-full" />
    </h1>
  );
};

export default HeroHeading;