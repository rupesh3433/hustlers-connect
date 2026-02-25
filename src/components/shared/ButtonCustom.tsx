import React, { useCallback, useRef, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type ButtonVariant = "solid" | "outline" | "ghost";

type ButtonSize =
  | "small"
  | "medium"
  | "large"
  | "larger"
  | "largest";

type ButtonBackground =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "white"
  | "black"
  | "grey"
  | "mybuttontheme"
  | "midnightflare";

interface ButtonCustomProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  background?: ButtonBackground;
  fullWidth?: boolean;
  isLoading?: boolean;

  /* Enhanced Controls */
  enableRipple?: boolean;
  enablePressAnimation?: boolean;
  enableFocusRing?: boolean;

  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
}

/* =========================================================
   COMPONENT
========================================================= */

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  children,
  variant = "solid",
  size = "medium",
  background = "blue",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",

  enableRipple = false,
  enablePressAnimation = true,
  enableFocusRing = false,

  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isDisabled = disabled || isLoading;

  /* =======================================================
     BASE STYLES (NO RING, NO OUTLINE BY DEFAULT)
  ======================================================== */

  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    gap-2
    font-semibold
    rounded-full
    transition-all
    duration-200
    ease-out
    whitespace-nowrap
    outline-none
    border-0
    focus:outline-none
    focus:ring-0
    active:outline-none
    active:ring-0
    disabled:opacity-60
    disabled:cursor-not-allowed
  `;

  /* =======================================================
     SIZE SYSTEM
  ======================================================== */

  const sizeStyles: Record<ButtonSize, string> = {
    small: "px-3 py-1 text-[10px] leading-tight sm:text-xs",
    medium: "px-4 py-2 text-sm sm:text-base",
    large: "px-8 py-3.5 text-base sm:text-lg",
    larger: "px-10 py-4 text-lg sm:text-xl",
    largest: "px-12 py-5 text-xl sm:text-2xl md:text-3xl",
  };

  /* =======================================================
     BACKGROUND SYSTEM
  ======================================================== */

  const backgroundStyles: Record<ButtonBackground, string> = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    yellow: "bg-yellow-400 hover:bg-yellow-500 text-black",
    white: "bg-white hover:bg-gray-100 text-black",
    black: "bg-black hover:bg-neutral-800 text-white",
    grey: "bg-gray-600 hover:bg-gray-700 text-white",
    mybuttontheme:
      "bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 text-white shadow-lg",
    midnightflare:
      "bg-gradient-to-r from-[#1E3A8A] via-[#7C3AED] to-[#991B1B] text-white shadow-lg",
  };

  /* =======================================================
     VARIANT SYSTEM
  ======================================================== */

  const variantStyles: Record<ButtonVariant, string> = {
    solid: "",
    outline: "bg-transparent border border-current hover:bg-white/10",
    ghost: "bg-transparent hover:bg-white/10",
  };

  /* =======================================================
     OPTIONAL FOCUS RING
  ======================================================== */

  const focusRingStyles = enableFocusRing
    ? "focus:ring-2 focus:ring-white/50"
    : "";

  /* =======================================================
     WIDTH
  ======================================================== */

  const widthStyles = fullWidth ? "w-full" : "w-auto";

  /* =======================================================
     SPINNER SIZE
  ======================================================== */

  const spinnerSizeMap: Record<ButtonSize, string> = {
    small: "h-3 w-3 border-2",
    medium: "h-4 w-4 border-2",
    large: "h-5 w-5 border-2",
    larger: "h-6 w-6 border-[3px]",
    largest: "h-7 w-7 border-[3px]",
  };

  /* =======================================================
     CLICK HANDLER
  ======================================================== */

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      if (enablePressAnimation) {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 120);
      }

      if (onClick) {
        await onClick(event);
      }
    },
    [enablePressAnimation, isDisabled, onClick]
  );

  /* =======================================================
     RIPPLE EFFECT
  ======================================================== */

  const handleRipple = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (!enableRipple || !buttonRef.current) return;

    const button = buttonRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.className =
      "absolute bg-white/30 rounded-full animate-ping pointer-events-none";

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 400);
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={isDisabled}
      onClick={(e) => {
        handleRipple(e);
        handleClick(e);
      }}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${backgroundStyles[background]}
        ${variantStyles[variant]}
        ${focusRingStyles}
        ${widthStyles}
        ${enablePressAnimation && isPressed ? "scale-95" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className={`animate-spin rounded-full border-current border-t-transparent ${spinnerSizeMap[size]}`}
          />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonCustom;