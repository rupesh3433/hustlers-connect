import React from "react";
import HeroTexts from "./texts/HeroTextsmain";
import HeroProcess from "./process/HeroProcess";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-transparent mt-0 pt-20 md:pt-20 px-6 md:px-12">
      <div className="w-full max-w-6xl mx-auto relative">

        <HeroTexts />

        <div className="relative -mt-45 md:-mt-52">
          <HeroProcess />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;