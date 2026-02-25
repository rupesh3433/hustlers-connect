import React from "react";

interface LogoProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  text = "HustlersConnect",
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        text-lg
        md:text-xl
        font-extrabold
        tracking-tight
        cursor-pointer
        select-none
        bg-gradient-to-r
        from-blue-500
        via-purple-500
        to-red-500
        bg-clip-text
        text-transparent
        ${className}
      `}
    >
      {text}
    </div>
  );
};

export default React.memo(Logo);