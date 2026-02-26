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
      className="w-full max-w-lg"
    >
      <div
        className="
          group
          w-full
          h-[40px]
          flex
          items-stretch
          rounded-full
          overflow-hidden
          backdrop-blur-md
          border
          border-black/10 dark:border-white/15
          bg-[color:var(--bg-primary)]/75
          shadow-md
          transition-all
          duration-300
          focus-within:border-purple-500/40
        "
      >
        {/* INPUT 70% */}
        <div className="flex-[7] h-full">
          <CustomInputField
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              showErrorPlaceholder
                ? "Invalid Email"
                : "Work email"
            }
            disabled={isLoading}
            variant="plain"
            inputSize="sm"
            fullWidth
            containerClassName="h-full"
            inputClassName="
              h-full
              w-full
              rounded-none
              px-6
              text-sm
              focus:outline-none
            "
          />
        </div>

        {/* BUTTON 30% */}
        <div className="flex-[3] h-full">
          <ButtonCustom
            type="submit"
            size="small"
            background="midnightflare"
            isLoading={isLoading}
            disabled={isLoading}
            className="
              h-full
              w-full
              rounded-none
              border-0
              text-sm
              font-semibold
              tracking-wide
            "
          >
            Access
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

export default HeroEmailForm;