// src/components/hero/texts/HeroEmailForm.tsx

import { useState } from "react";
import ButtonCustom from "../../shared/ButtonCustom";
import CustomInputField from "../../shared/CustomInputField";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HeroEmailForm = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showErrorPlaceholder, setShowErrorPlaceholder] =
    useState<boolean>(false);

  const validateEmail = (value: string): boolean => {
    const trimmed = value.trim();

    if (!trimmed || !emailRegex.test(trimmed)) {
      setHasError(true);
      setShowErrorPlaceholder(true);
      return false;
    }

    setHasError(false);
    setShowErrorPlaceholder(false);
    return true;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validateEmail(email)) return;

    setIsLoading(true);

    try {
      await new Promise<void>((resolve) =>
        setTimeout(() => resolve(), 1200)
      );

      setEmail("");
      setHasError(false);
      setShowErrorPlaceholder(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-50 w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md relative z-50"
      >
        <div
          className="
            w-full
            rounded-2xl
            overflow-hidden
            shadow-xl
            backdrop-blur-lg
            transition-all
            duration-300
            focus-within:scale-[1.01]
            relative
            z-50
            border border-white/10
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12), rgba(239,68,68,0.10))",
          }}
        >
          <div className="flex items-center gap-2 px-0 py-0">
            <div className="flex-1">
              <CustomInputField
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (hasError) {
                    setHasError(false);
                    setShowErrorPlaceholder(false);
                  }
                }}
                onFocus={() => {
                  if (showErrorPlaceholder) {
                    setShowErrorPlaceholder(false);
                  }
                }}
                placeholder={
                  showErrorPlaceholder
                    ? "Invalid Email Format! Click here to re-enter."
                    : "Enter your work email"
                }
                disabled={isLoading}
                variant="glass"
                inputSize="sm"
                fullWidth
                containerClassName="w-full"
                inputClassName={`
                  border-0
                  bg-transparent
                  focus:ring-0
                  focus:outline-none
                  focus:border-transparent
                  !py-2
                  px-0
                  cursor-text
                  ${
                    showErrorPlaceholder
                      ? "placeholder:text-red-500 text-red-500"
                      : ""
                  }
                `}
              />
            </div>

            <div className="shrink-0">
              <ButtonCustom
                type="submit"
                size="small"
                background="midnightflare"
                isLoading={isLoading}
                disabled={isLoading}
                className="
                  px-0
                  h-[36px]
                  text-xs
                  whitespace-nowrap
                  border-0
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  active:outline-none
                  active:ring-0
                "
              >
                Get Access
              </ButtonCustom>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroEmailForm;