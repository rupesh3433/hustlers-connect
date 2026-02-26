// src/components/indexcomponents/HeroSection.tsx

import React from "react";
import HeroTexts from "../hero/texts/HeroTextsmain";
import HeroProcess from "../hero/process/HeroProcess";

const HeroSection: React.FC = () => {
  return (
    // ✅ bg-transparent — ThemeBackground handles all background theming
    <section
      className="
        relative
        w-full
        h-full
        bg-transparent
        pt-16
        sm:pt-18
        md:pt-20
        lg:pt-14
        overflow-visible
      "
    >
      <div
        className="
          w-full
          max-w-350
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
        <div className="w-full max-w-3xl">
          <HeroTexts />
        </div>

        <div className="w-full relative -mt-30 md:-mt-32 lg:-mt-32">
          <HeroProcess />
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);