import React from "react";
import HeroHeading from "./HeroHeading";
import HeroParagraph from "./HeroParagraph";
import HeroEmailForm from "./HeroEmailForm";

const HeroTexts: React.FC = () => {
  return (
    <section
      className="
        relative
        w-full
        flex
        flex-col

        /* Remove items-center */
        text-center

        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20
        gap-0
        pb-14 md:pb-20
        overflow-hidden
      "
    >
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-pink-500/20 blur-[140px] rounded-full" />
      </div>

      {/* Wrap each block */}
      <div className="w-full flex justify-center">
        <HeroHeading />
      </div>

      <div className="w-full flex justify-center">
        <HeroParagraph />
      </div>

      <div className="w-full flex justify-center">
        <HeroEmailForm />
      </div>
    </section>
  );
};

export default HeroTexts;