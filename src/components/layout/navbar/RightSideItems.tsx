import React from "react";
import ButtonCustom from "../../shared/ButtonCustom";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../../shared/ThemeContext";

interface RightSideItemsProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

const RightSideItems: React.FC<RightSideItemsProps> = ({
  mobileOpen,
  onToggleMobile,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-4 md:gap-6">
      
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="
          relative
          w-10 h-10
          flex items-center justify-center
          rounded-full
          border
          transition-all duration-300
          bg-gray-100 dark:bg-white/10
          border-black/10 dark:border-white/20
          text-gray-800 dark:text-white
          hover:scale-105
        "
      >
        <div className="relative w-5 h-5">
          <Sun
            size={18}
            className={`
              absolute inset-0
              transition-all duration-300
              ${theme === "dark"
                ? "opacity-0 rotate-90 scale-75"
                : "opacity-100 rotate-0 scale-100"}
            `}
          />
          <Moon
            size={18}
            className={`
              absolute inset-0
              transition-all duration-300
              ${theme === "dark"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"}
            `}
          />
        </div>
      </button>

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

      {/* Hamburger / Close */}
      <button
        onClick={onToggleMobile}
        aria-label="Menu"
        className="lg:hidden group focus:outline-none focus:ring-0"
      >
        <div
          className={`
            w-9 h-9
            flex items-center justify-center
            rounded-full
            transition-all duration-300
            ${
              mobileOpen
                ? "bg-red-600 text-white scale-105"
                : "bg-transparent text-gray-800 dark:text-white"
            }
          `}
        >
          <svg
            className={`
              w-5 h-5
              transition-transform duration-500 ease-out
              ${
                mobileOpen
                  ? "rotate-[720deg]"         // 2 quick spins when opening
                  : "group-hover:rotate-[360deg]"  // 1 spin on hover
              }
            `}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </div>
      </button>
    </div>
  );
};

export default RightSideItems;