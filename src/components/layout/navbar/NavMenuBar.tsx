// src/components/layout/navbar/NavMenuBar.tsx

import React from "react";
import ButtonCustom from "../../shared/ButtonCustom";
import { ArrowRight } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
}

interface NavMenuBarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (label: string) => void;
}

const NavMenuBar: React.FC<NavMenuBarProps> = ({
  navItems,
  isOpen,
  onClose,
  onItemClick,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Soft backdrop (not full dark screen) */}
      <div
        className="lg:hidden fixed inset-0 z-[9998]"
        onClick={onClose}
      />

      {/* Glass Dropdown */}
      <div
        className="
          lg:hidden
          absolute
          top-16 md:top-20
          left-4
          right-4
          z-[9999]
          bg-[#0b0b12]/80
          backdrop-blur-md
          border border-white/10
          rounded-2xl
          shadow-xl
          px-6
          py-6
          flex flex-col
          gap-6
        "
      >
        <div className="flex flex-col gap-5">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                onItemClick(item.label);
                onClose();
              }}
              className="
                text-left
                text-white/70
                hover:text-white
                transition-colors
                duration-300
                text-lg
                font-medium
              "
            >
              {item.label}
            </button>
          ))}
        </div>

        <ButtonCustom
          size="medium"
          background="grey"
          className="gap-2 mt-2"
          onClick={onClose}
        >
          <span>Sign In</span>
          <ArrowRight size={16} />
        </ButtonCustom>
      </div>
    </>
  );
};

export default NavMenuBar;