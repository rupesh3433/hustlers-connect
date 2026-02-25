// src/components/hero/texts/HeroTexts.tsx

import React from "react";
import HeroHeading from "./HeroHeading";
import HeroParagraph from "./HeroParagraph";
import HeroEmailForm from "./HeroEmailForm";
import SocialMediaIcons from "../../shared/SocialMediaIcons";
import DynamicCount from "./DynamicCount";

const HeroTexts: React.FC = () => {
  return (
    <section
      className="
        relative
        w-full
        flex
        flex-col
        items-center
        text-center
        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20
        overflow-hidden
      "
    >
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-pink-500/20 blur-[140px] rounded-full" />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-3xl
          flex
          flex-col
          items-center
          space-y-4
          md:space-y-5
        "
      >
        <HeroHeading />

        <HeroParagraph />

        <HeroEmailForm />

        <DynamicCount />

        <div className="flex justify-center">
          <SocialMediaIcons size={24} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroTexts);