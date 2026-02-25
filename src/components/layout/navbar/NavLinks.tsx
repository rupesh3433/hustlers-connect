import React from "react";
import type { NavItem } from "./NavMenuBar";

interface NavLinksProps {
  items: NavItem[];
}

const NavLinks: React.FC<NavLinksProps> = ({ items }) => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.path}
          className="
            relative
            text-sm
            font-medium
            text-white/70
            hover:text-white
            transition
            group
          "
        >
          {item.label}
          <span
            className="
              absolute
              -bottom-1
              left-0
              w-0
              h-0.5
              bg-gradient-to-r
              from-purple-500
              to-pink-500
              transition-all
              duration-300
              group-hover:w-full
            "
          />
        </a>
      ))}
    </div>
  );
};

export default NavLinks;