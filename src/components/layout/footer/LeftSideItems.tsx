// src/components/layout/LeftSideItems.tsx

import React from "react";
import Logo from "../../shared/Logo";
import SocialMediaIcons from "../../shared/SocialMediaIcons";

interface LeftSideItemsProps {
  description: string;
}

const LeftSideItems: React.FC<LeftSideItemsProps> = ({
  description,
}) => {
  if (!description) return null;

  return (
    <div
      className="
        w-full
        flex flex-col
        items-center
        md:items-start
        text-center
        md:text-left
        md:pr-20
      "
    >
      {/* Logo */}
      <div className="mb-6">
        <Logo />
      </div>

      {/* Description */}
      <p
        className="
          text-base
          md:text-lg
          text-gray-400
          leading-relaxed
          md:leading-loose
          max-w-[30rem]
          md:max-w-none
        "
      >
        {description}
      </p>

      {/* Social Icons */}
      <SocialMediaIcons
        className="
          mt-8
          justify-center
          md:justify-start
        "
      />
    </div>
  );
};

export default React.memo(LeftSideItems);