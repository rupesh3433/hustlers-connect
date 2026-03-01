// src/components/layout/navbar/NavLinks.tsx

import type { NavItem } from "./NavMenuBar";

interface NavLinksProps {
  items: NavItem[];
  onItemClick: (sectionIndex: number) => void;
}

const NavLinks = ({ items, onItemClick }: NavLinksProps) => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => {
            if (typeof item.sectionIndex === "number") {
              onItemClick(item.sectionIndex);
            }
          }}
          className="
            relative
            text-sm font-medium
            text-black/70 dark:text-white/70
            hover:text-black dark:hover:text-white
            transition
            group
          "
        >
          {item.label}

          <span
            className="
              absolute -bottom-1 left-0
              w-0 h-0.5
              bg-gradient-to-r from-purple-500 to-pink-500
              transition-all duration-300
              group-hover:w-full
            "
          />
        </button>
      ))}
    </div>
  );
};

export default NavLinks;
