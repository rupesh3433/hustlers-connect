// src/components/hero/texts/HeroEmailForm.tsx

import { useState } from "react";
import ButtonCustom from "../../shared/ButtonCustom";
import CustomInputField from "../../shared/CustomInputField";

const emailRegex: RegExp =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HeroEmailForm = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorPlaceholder, setShowErrorPlaceholder] =
    useState<boolean>(false);

  const validateEmail = (value: string): boolean => {
    const trimmed = value.trim();

    if (!trimmed || !emailRegex.test(trimmed)) {
      setShowErrorPlaceholder(true);
      return false;
    }

    setShowErrorPlaceholder(false);
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validateEmail(email)) return;

    setIsLoading(true);

    try {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1200)
      );

      setEmail("");
      setShowErrorPlaceholder(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-xs"
    >
      <div
        className="
          w-full
          flex
          items-center
          rounded-xl
          overflow-hidden
          shadow-lg
          backdrop-blur-md
          border border-white/10
          transition-all
          duration-300
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(139,92,246,0.10), rgba(239,68,68,0.08))",
        }}
      >
        {/* Input */}
        <CustomInputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (showErrorPlaceholder) {
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
              ? "Invalid Email"
              : "Work email"
          }
          disabled={isLoading}
          variant="glass"
          inputSize="sm"
          fullWidth
          containerClassName="flex-1"
          inputClassName={`
            border-0
            bg-transparent
            focus:ring-0
            focus:outline-none
            px-3
            py-1.5
            h-[32px]
            text-[0.8rem]
            leading-[1.1]
            ${
              showErrorPlaceholder
                ? "placeholder:text-red-500 text-red-500"
                : ""
            }
          `}
        />

        {/* Button */}
        <ButtonCustom
          type="submit"
          size="small"
          background="midnightflare"
          isLoading={isLoading}
          disabled={isLoading}
          className="
            h-[32px]
            px-3
            text-[0.7rem]
            leading-[1]
            whitespace-nowrap
            border-0
            focus:outline-none
            focus:ring-0
          "
        >
          Access
        </ButtonCustom>
      </div>
    </form>
  );
};

export default HeroEmailForm;