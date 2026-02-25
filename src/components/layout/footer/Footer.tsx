// src/components/layout/Footer.tsx

import React, { useMemo } from "react";
import FooterColumns from "./FooterColumns";
import type { FooterColumnData } from "./FooterColumns";
import FooterBottomCTA from "./FooterBottomCTA";
import type { NavItem } from "../navbar/NavMenuBar";
import LeftSideItems from "./LeftSideItems";

const COMPANY_LINKS: Readonly<NavItem[]> = [
  { label: "About", path: "#about" },
  { label: "Careers", path: "#careers" },
  { label: "Contact", path: "#contact" },
] as const;

const PRODUCT_LINKS: Readonly<NavItem[]> = [
  { label: "Projects", path: "#projects" },
  { label: "Services", path: "#services" },
] as const;

const LEGAL_LINKS: Readonly<NavItem[]> = [
  { label: "Terms", path: "#terms" },
  { label: "Privacy", path: "#privacy" },
  { label: "Cookies", path: "#cookies" },
] as const;

const FOOTER_COLUMNS: Readonly<FooterColumnData[]> = [
  { title: "Company", links: COMPANY_LINKS },
  { title: "Products", links: PRODUCT_LINKS },
  { title: "Legal", links: LEGAL_LINKS },
] as const;

const Footer: React.FC = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="relative w-full bg-[#0B0F19] text-gray-300"
      style={{ scrollSnapAlign: 'start' }} // added for scroll snap
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-500" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-y-0 md:gap-x-16 lg:gap-x-24">

          {/* Left Side */}
          <div className="md:col-span-2">
            <LeftSideItems
              description="Building scalable digital systems, intelligent products, and high-impact experiences."
            />
          </div>

          {/* Right Columns */}
          <div className="md:col-span-2">
            <FooterColumns columns={FOOTER_COLUMNS} />
          </div>

        </div>

        <FooterBottomCTA
          year={currentYear}
          brandName="HustlersConnect"
          legalLinks={LEGAL_LINKS}
        />
      </div>
    </footer>
  );
};

export default React.memo(Footer);