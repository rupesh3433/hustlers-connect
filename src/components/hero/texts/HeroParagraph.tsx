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
        max-w-[70rem]
        mx-auto
        text-center

        text-[0.85rem]
        leading-[1.3]
        tracking-[0.01em]

        text-[color:var(--text-primary)]/70
      "
    >
      {text}
    </p>
  );
};

export default React.memo(HeroParagraph);