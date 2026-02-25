import React from "react";

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
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  background?: ButtonBackground;
  fullWidth?: boolean;
  isLoading?: boolean;
}

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
  ...props
}) => {
  /* =======================================================
     BASE STYLES
  ======================================================== */
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";

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
    blue:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",

    red:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",

    green:
      "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",

    yellow:
      "bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-400",

    white:
      "bg-white hover:bg-gray-100 text-black focus:ring-gray-300",

    black:
      "bg-black hover:bg-neutral-800 text-white focus:ring-neutral-600",

    grey:
      "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",

    mybuttontheme:
      "bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 text-white shadow-lg hover:scale-[1.05] active:scale-[0.96] focus:ring-purple-500",

    midnightflare:
      "bg-gradient-to-r from-[#1E3A8A] via-[#7C3AED] to-[#991B1B] text-white shadow-lg hover:scale-[1.05] active:scale-[0.96] focus:ring-[#7C3AED]",
  };

  /* =======================================================
     VARIANTS
  ======================================================== */
  const variantStyles: Record<ButtonVariant, string> = {
    solid: "",

    outline:
      "bg-transparent border border-current hover:bg-white/10",

    ghost:
      "bg-transparent hover:bg-white/10",
  };

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

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${backgroundStyles[background]}
        ${variantStyles[variant]}
        ${widthStyles}
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