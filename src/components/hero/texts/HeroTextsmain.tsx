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
        text-center md:text-left
        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20
        pb-14 md:pb-20
        overflow-hidden
      "
    >
      {/* Glow Background (Non-interactive) */}
      <div className="absolute inset-0 -z-10 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-pink-500/20 blur-[140px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="w-full relative z-10">
        <HeroHeading />
      </div>

      {/* Paragraph (No flex wrapper now) */}
      <div className="w-full relative z-10">
        <HeroParagraph />
      </div>

      {/* Email Form */}
      <div className="w-full relative z-10 mt-4">
        <HeroEmailForm />
      </div>

      {/* Dynamic Count */}
      <div className="w-full relative z-10 mt-6 md:mt-4">
        <DynamicCount />
      </div>

      {/* Social Media Icons */}
      <div className="w-full relative z-10 mt-3 flex justify-center">
        <SocialMediaIcons size={24} />
      </div>
    </section>
  );
};

export default React.memo(HeroTexts);