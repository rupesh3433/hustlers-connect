import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import NavMenuBar from "./NavMenuBar";
import type { NavItem } from "./NavMenuBar";
import Logo from "../../shared/Logo";
import RightSideItems from "./RightSideItems";

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

  const toggleMobileMenu = (): void => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = (): void => {
    setMobileOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0
        z-[9999]
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/5 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      <div className="w-full min-h-16 md:min-h-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between py-3">
        <Logo />

        <NavLinks items={navItems} />

        <RightSideItems
          mobileOpen={mobileOpen}
          onToggleMobile={toggleMobileMenu}
        />
      </div>

      <NavMenuBar
        navItems={navItems}
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
      />
    </nav>
  );
};

export default Navbar;