import React from "react";
import HeroTexts from "./texts/HeroTextsmain";
import HeroProcess from "./process/HeroProcess";

const HeroSection: React.FC = () => {
  return (
    <section
      style={{ scrollSnapAlign: "start" }}
      className="
        relative
        w-full
        bg-transparent
        pt-16
        sm:pt-18
        md:pt-20
        lg:pt-24
      "
    >
      <div
        className="
          w-full
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          md:px-10
          lg:px-16
          xl:px-24
          flex
          flex-col
          items-center
        "
      >
        {/* Text Block */}
        <div className="w-full max-w-3xl">
          <HeroTexts />
        </div>

        {/* Process Block (SHIFTED UP SAFELY) */}
        <div
          className="
            w-full
            relative
            -mt-30
            md:-mt-32
            lg:-mt-32
          "
        >
          <HeroProcess />
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);