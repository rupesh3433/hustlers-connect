// src/components/hero/texts/HeroEmailForm.tsx

import React, { useState } from "react";
import ButtonCustom from "../../shared/ButtonCustom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HeroEmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setError("Email is required");
      return false;
    }

    if (!emailRegex.test(value)) {
      setError("Enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmail("");
      setError("");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl" noValidate>
      <div
        className="
          relative
          rounded-full
          backdrop-blur-xl
          shadow-lg
          transition-all
          duration-300
          focus-within:scale-[1.01]
        "
        style={{
          backgroundColor: "rgba(35,35,40,0.75)",
          border: error
            ? "1px solid rgba(255,80,80,0.6)"
            : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) validateEmail(e.target.value);
          }}
          placeholder="Enter your work email"
          disabled={isLoading}
          aria-invalid={!!error}
          className="
            w-full
            pl-5
            pr-36
            py-3
            rounded-full
            text-sm
            outline-none
            bg-transparent
            text-white
            placeholder:text-white/40
            font-medium
            disabled:opacity-60
            transition-all
            duration-300
          "
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <ButtonCustom
            type="submit"
            size="medium"
            background="midnightflare"
            isLoading={isLoading}
            disabled={isLoading}
            className="px-4"
          >
            Get Access
          </ButtonCustom>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 text-left px-4">{error}</p>}

      <div className="mt-4 text-sm text-white/40">
        No credit card required • Free 14-day trial
      </div>
    </form>
  );
};

export default HeroEmailForm;
