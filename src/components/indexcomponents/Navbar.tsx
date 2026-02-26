import React, { useEffect, useState } from "react";
import NavLinks from "../layout/navbar/NavLinks";
import NavMenuBar from "../layout/navbar/NavMenuBar";
import type { NavItem } from "../layout/navbar/NavMenuBar";
import Logo from "../shared/Logo";
import RightSideItems from "../layout/navbar/RightSideItems";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/" },
    { label: "Features", path: "/" },
    { label: "Pages", path: "/" },
    { label: "News", path: "/" },
    { label: "Contact", path: "/" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0
        h-16 md:h-20
        z-[9999]
        transition-all duration-500
        backdrop-blur-sm
        ${
          scrolled
            ? "bg-white/[0.03] border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between">
        <Logo />
        <NavLinks items={navItems} />
        <RightSideItems
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
        />
      </div>

      <NavMenuBar
        navItems={navItems}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </nav>
  );
};

export default Navbar;