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
}

const NavMenuBar: React.FC<NavMenuBarProps> = ({
  navItems,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        lg:hidden
        relative
        z-[9999]
        bg-white/5
        backdrop-blur-md
        border-t border-white/10
        px-4 sm:px-6
        py-6
        flex flex-col
        gap-5
      "
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.path}
          onClick={onClose}
          className="
            text-white/70
            hover:text-white
            transition
            text-base
            font-medium
          "
        >
          {item.label}
        </a>
      ))}

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
  );
};

export default NavMenuBar;