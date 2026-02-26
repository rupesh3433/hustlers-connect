// src/components/layout/Footer.tsx

import React, { useMemo } from "react";
import type { NavItem } from "../layout/navbar/NavMenuBar";
import type { FooterColumnData } from "../layout/footer/FooterColumns";
import LeftSideItems from "../layout/footer/LeftSideItems";
import FooterColumns from "../layout/footer/FooterColumns";
import FooterBottomCTA from "../layout/footer/FooterBottomCTA";

const COMPANY_LINKS: Readonly<NavItem[]> = [
  { label: "About",   path: "#about"   },
  { label: "Careers", path: "#careers" },
  { label: "Contact", path: "#contact" },
] as const;

const PRODUCT_LINKS: Readonly<NavItem[]> = [
  { label: "Projects",  path: "#projects"  },
  { label: "Services",  path: "#services"  },
] as const;

const LEGAL_LINKS: Readonly<NavItem[]> = [
  { label: "Terms",   path: "#terms"   },
  { label: "Privacy", path: "#privacy" },
  { label: "Cookies", path: "#cookies" },
] as const;

const FOOTER_COLUMNS: Readonly<FooterColumnData[]> = [
  { title: "Company",  links: COMPANY_LINKS  },
  { title: "Products", links: PRODUCT_LINKS  },
  { title: "Legal",    links: LEGAL_LINKS    },
] as const;

const Footer: React.FC = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    // ✅ bg-transparent — ThemeBackground handles all background theming
    // Only the top gradient bar keeps its Blue→Purple→Red accent colours
    <footer className="relative w-full h-full flex flex-col justify-center" style={{ background: "transparent" }}>

      {/* Blue → Purple → Red gradient bar — PRESERVED */}
      <div className="h-0.5 w-full bg-linear-to-r from-blue-600 via-purple-600 to-red-500 flex-shrink-0" />

      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-y-0 md:gap-x-16 lg:gap-x-24">
          <div className="md:col-span-2">
            <LeftSideItems
              description="Building scalable digital systems, intelligent products, and high-impact experiences."
            />
          </div>
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