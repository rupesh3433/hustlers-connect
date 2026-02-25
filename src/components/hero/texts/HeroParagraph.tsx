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
        max-w-3xl lg:max-w-4xl
        mx-auto

        text-[1rem]
        sm:text-[1.05rem]
        md:text-[1.1rem]

        leading-[1.6]
        text-white/70

        my-4
      "
    >
      {text}
    </p>
  );
};

export default HeroParagraph;