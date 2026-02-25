import React from "react";
import HeroTexts from "./texts/HeroTextsmain";
import HeroProcess from "./process/HeroProcess";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-transparent mt-2 pt-22 md:pt-20 px-6 md:px-12">
      <div className="w-full max-w-6xl mx-auto relative">

        <HeroTexts />

        <div className="relative -mt-20 md:-mt-38">
          <HeroProcess />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;