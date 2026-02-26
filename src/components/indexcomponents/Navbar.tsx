import React, { useEffect, useState } from "react";
import NavLinks from "../layout/navbar/NavLinks";
import NavMenuBar from "../layout/navbar/NavMenuBar";
import type { NavItem } from "../layout/navbar/NavMenuBar";
import Logo from "../shared/Logo";
import RightSideItems from "../layout/navbar/RightSideItems";

interface NavbarProps {
  onNavigate: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
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
    { label: "Home", path: "#" },
    { label: "Services", path: "#" },
    { label: "Contact", path: "#" },
  ];

  const handleItemClick = (label: string) => {
    if (label === "Home") onNavigate(0);
    if (label === "Services") onNavigate(1);
    if (label === "Contact") onNavigate(2);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0
        h-16 md:h-20
        z-[10000]
        transition-all duration-500
        text-[color:var(--text-primary)]
        ${
          scrolled
            ? `
              bg-[color:var(--bg-primary)]/80
              backdrop-blur-md
              border-b
              border-black/10 dark:border-white/10
            `
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between relative">
        <Logo />

        <NavLinks
          items={navItems}
          onItemClick={handleItemClick}
        />

        <RightSideItems
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
        />
      </div>

      <NavMenuBar
        navItems={navItems}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onItemClick={(label) => {
          handleItemClick(label);
          setMobileOpen(false);
        }}
      />
    </nav>
  );
};

export default Navbar;