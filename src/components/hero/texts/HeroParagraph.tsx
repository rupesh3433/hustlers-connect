// src/components/hero/texts/HeroParagraph.tsx

import React from "react";

interface HeroParagraphProps {
  text?: string;
}

const HeroParagraph: React.FC<HeroParagraphProps> = ({
  text = "We help brands scale with high-impact web development, AI-powered automation, performance marketing, and content systems engineered for measurable growth.",
}) => {
  return (
    <p
      className="
        w-full
        max-w-[42rem]
        mx-auto
        text-center

        text-[1rem]
        sm:text-[1.05rem]
        md:text-[1.1rem]

        leading-[1.5]
        tracking-[0.01em]

        text-white/70
      "
    >
      {text}
    </p>
  );
};

export default React.memo(HeroParagraph);