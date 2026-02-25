import React, { useEffect, useState } from "react";
import ButtonCustom from "../shared/ButtonCustom";
import { ArrowRight } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/5 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      <div className="w-full min-h-16 md:min-h-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between py-3">

        {/* Logo */}
        <div className="text-lg md:text-xl font-bold text-white tracking-tight">
          HustlersConnect
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="relative text-sm font-medium text-white/70 hover:text-white transition group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Desktop Sign In */}
          <div className="hidden lg:block">
            <ButtonCustom
              size="medium"
              background="grey"
              className="group gap-2"
            >
              <span>Sign In</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </ButtonCustom>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/5 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 py-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white transition text-base font-medium"
            >
              {item.label}
            </a>
          ))}

          <ButtonCustom
            size="medium"
            background="grey"
            className="gap-2"
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </ButtonCustom>
        </div>
      )}
    </nav>
  );
};

export default Navbar;