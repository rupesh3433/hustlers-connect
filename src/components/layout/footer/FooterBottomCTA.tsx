// src/components/layout/FooterBottomCTA.tsx

import React from "react";
import type { NavItem } from "../navbar/NavMenuBar";

interface FooterBottomCTAProps {
  year: number;
  brandName: string;
  legalLinks: readonly NavItem[];
}

const FooterBottomCTA: React.FC<
  FooterBottomCTAProps
> = ({ year, brandName, legalLinks }) => {
  return (
    <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500 text-center md:text-left">
      <p>
        © {year} {brandName}. All rights reserved.
      </p>

      <div className="flex flex-wrap justify-center md:justify-end gap-5">
        {legalLinks.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className="hover:text-white transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(FooterBottomCTA);