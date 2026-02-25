import React from "react";
import ButtonCustom from "../../shared/ButtonCustom";
import { ArrowRight } from "lucide-react";

interface RightSideItemsProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

const RightSideItems: React.FC<RightSideItemsProps> = ({
  mobileOpen,
  onToggleMobile,
}) => {
  return (
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
        onClick={onToggleMobile}
        className="
          lg:hidden
          p-2
          text-white
          focus:outline-none
          focus:ring-0
        "
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
  );
};

export default RightSideItems;