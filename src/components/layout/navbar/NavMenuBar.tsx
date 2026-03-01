// src/components/layout/navbar/NavMenuBar.tsx

import ButtonCustom from "../../shared/ButtonCustom";
import { ArrowRight } from "lucide-react";

export interface NavItem {
  label: string;
  sectionIndex: number;
}

interface NavMenuBarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (sectionIndex: number) => void;
  onContactClick: () => void;
}

const NavMenuBar = ({
  navItems,
  isOpen,
  onClose,
  onItemClick,
  onContactClick,
}: NavMenuBarProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Click-outside overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[9998]"
        onClick={onClose}
      />

      {/* Dropdown panel */}
      <div
        className="
          lg:hidden
          absolute
          top-16 md:top-20
          left-4 right-4
          z-[9999]
          rounded-2xl
          px-6 py-6
          flex flex-col gap-6
          transition-all duration-300
          backdrop-blur-sm
          bg-white/15 dark:bg-white/5
          border border-black/10 dark:border-white/10
          shadow-xl
        "
      >
        {/* Nav links */}
        <div className="flex flex-col gap-5">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                onItemClick(item.sectionIndex);
                onClose();
              }}
              className="
                text-left text-lg font-medium
                transition-colors duration-300
                text-[color:var(--text-primary)]/70
                hover:text-[color:var(--text-primary)]
              "
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Contact Us CTA */}
        <ButtonCustom
          size="medium"
          background="grey"
          className="gap-2 mt-2"
          onClick={onContactClick}
        >
          <span>Contact Us</span>
          <ArrowRight size={16} />
        </ButtonCustom>
      </div>
    </>
  );
};

export default NavMenuBar;