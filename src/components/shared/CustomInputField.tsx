// CustomInputField.tsx

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type FocusEvent,
} from "react";

type InputVariant = "default" | "glass" | "underline";
type InputSize = "sm" | "md" | "lg";

interface CustomInputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: InputVariant;
  inputSize?: InputSize;
  fullWidth?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

type ClassValue = string | false | undefined;

const mergeClasses = (...classes: ClassValue[]): string => {
  return classes.filter((cls): cls is string => typeof cls === "string" && cls.length > 0).join(" ");
};

const SIZE_STYLES: Record<
  InputSize,
  {
    container: string;
    input: string;
    label: string;
    helper: string;
    icon: string;
  }
> = {
  sm: {
    container: "gap-1",
    input: "px-3 py-2 text-sm rounded-lg",
    label: "text-xs font-medium",
    helper: "text-xs",
    icon: "h-4 w-4",
  },
  md: {
    container: "gap-1.5",
    input: "px-4 py-2.5 text-sm sm:text-base rounded-xl",
    label: "text-sm font-semibold",
    helper: "text-xs sm:text-sm",
    icon: "h-5 w-5",
  },
  lg: {
    container: "gap-2",
    input: "px-5 py-3 text-base sm:text-lg rounded-2xl",
    label: "text-base font-semibold",
    helper: "text-sm",
    icon: "h-6 w-6",
  },
};

const VARIANT_STYLES: Record<
  InputVariant,
  {
    base: string;
    focus: string;
    error: string;
  }
> = {
  default: {
    base:
      "bg-white/90 border border-slate-300 shadow-sm backdrop-blur-sm",
    focus:
      "focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20",
    error:
      "border-red-500 focus:border-red-500 focus:ring-red-500/20",
  },
  glass: {
    base:
      "bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg text-white placeholder:text-white/60",
    focus:
      "focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30",
    error:
      "border-red-400 focus:border-red-400 focus:ring-red-400/30",
  },
  underline: {
    base:
      "bg-transparent border-0 border-b-2 border-slate-300 rounded-none px-0",
    focus:
      "focus:border-purple-500 focus:ring-0",
    error:
      "border-red-500 focus:border-red-500 focus:ring-0",
  },
};

const CustomInputField = forwardRef<HTMLInputElement, CustomInputFieldProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "md",
      fullWidth = true,
      disabled = false,
      required = false,
      containerClassName,
      inputClassName,
      id,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const sizeStyle = SIZE_STYLES[inputSize];
    const variantStyle = VARIANT_STYLES[variant];

    const [isFocused, setIsFocused] = useState(false);
    const hasError = Boolean(error);
    const isUnderline = variant === "underline";

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <div
        className={mergeClasses(
          "flex flex-col",
          sizeStyle.container,
          fullWidth ? "w-full" : undefined,
          containerClassName
        )}
      >
        {label ? (
          <label
            htmlFor={inputId}
            className={mergeClasses(
              sizeStyle.label,
              hasError
                ? "text-red-600"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            {label}
            {required ? (
              <span className="ml-1 text-red-500">*</span>
            ) : undefined}
          </label>
        ) : undefined}

        <div className="relative flex items-center">
          {leftIcon ? (
            <div
              className={mergeClasses(
                "absolute left-3 flex items-center justify-center pointer-events-none text-slate-400",
                sizeStyle.icon,
                disabled ? "opacity-50" : undefined
              )}
            >
              {leftIcon}
            </div>
          ) : undefined}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={mergeClasses(
              "w-full outline-none transition-all duration-200 ease-in-out",
              sizeStyle.input,
              variantStyle.base,
              !isUnderline ? "rounded-xl" : undefined,
              leftIcon && !isUnderline ? "pl-10" : undefined,
              rightIcon && !isUnderline ? "pr-10" : undefined,
              disabled
                ? "opacity-60 cursor-not-allowed bg-slate-100"
                : undefined,
              hasError
                ? variantStyle.error
                : variantStyle.focus,
              isFocused ? "ring-offset-0" : undefined,
              inputClassName
            )}
            {...rest}
          />

          {rightIcon ? (
            <div
              className={mergeClasses(
                "absolute right-3 flex items-center justify-center text-slate-400",
                sizeStyle.icon,
                disabled ? "opacity-50" : undefined
              )}
            >
              {rightIcon}
            </div>
          ) : undefined}
        </div>

        {hasError ? (
          <p
            className={mergeClasses(
              sizeStyle.helper,
              "text-red-600 font-medium"
            )}
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            className={mergeClasses(
              sizeStyle.helper,
              "text-slate-500 dark:text-slate-400"
            )}
          >
            {helperText}
          </p>
        ) : undefined}
      </div>
    );
  }
);

CustomInputField.displayName = "CustomInputField";

export default CustomInputField;