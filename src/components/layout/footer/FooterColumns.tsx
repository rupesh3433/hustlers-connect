// src/components/layout/FooterColumns.tsx

import React from "react";
import type { NavItem } from "../navbar/NavMenuBar";

export interface FooterColumnData {
  title: string;
  links: readonly NavItem[];
}

interface FooterColumnsProps {
  columns: readonly FooterColumnData[];
}

const FooterColumns: React.FC<FooterColumnsProps> = ({
  columns,
}) => {
  if (!columns || columns.length === 0) return null;

  const validColumns = columns.filter(
    (column) => column.links && column.links.length > 0
  );

  if (validColumns.length === 0) return null;

  return (
    <div
      className="
        mt-10
        sm:mt-0
        w-full
        grid
        grid-cols-3
        gap-x-10
        gap-y-12
      "
    >
      {validColumns.map((column) => {
        const extendedLinks: NavItem[] = [
          ...column.links,
          { label: "Blog", path: "#blog" },
          { label: "Resources", path: "#resources" },
          { label: "Support", path: "#support" },
        ];

        return (
          <nav
            key={column.title}
            aria-label={`Footer ${column.title}`}
            className="min-w-0"
          >
            <h3 className="text-white font-semibold text-base md:text-lg">
              {column.title}
            </h3>

            <ul className="mt-5 space-y-3">
              {extendedLinks.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  <a
                    href={item.path}
                    className="
                      text-gray-400
                      hover:text-white
                      transition-colors
                      duration-200
                      text-sm md:text-base
                      block
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        );
      })}
    </div>
  );
};

export default React.memo(FooterColumns);