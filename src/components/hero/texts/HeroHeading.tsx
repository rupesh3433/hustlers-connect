import React from "react";

const HeroHeading: React.FC = () => {
  return (
    <h1
      className="
        w-full
        text-center
        font-bold
        tracking-tight
        text-[2.1rem]
        leading-[1.05]

        sm:text-[2.3rem]
        md:text-[2.6rem]
        lg:text-[2.5rem]
      "
    >
      <span className="block">
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Hustle
        </span>{" "}
        <span className="text-white">
          with Purpose,
        </span>
      </span>

      <span
        className="
          block
          text-white
          font-medium
          tracking-[-0.01em]
          leading-[1.05]
        "
      >
        Connect with Power
      </span>

      <span
        className="
          block
          h-[2px]
          w-16
          mx-auto
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