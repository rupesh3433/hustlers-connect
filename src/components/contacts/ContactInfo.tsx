// src/components/contact/ContactInfo.tsx

import { type FC, useEffect, useState } from "react";
import ContactInfoItem from "./ContactInfoItem";
import SocialMediaIcons from "../shared/SocialMediaIcons";

const INFO = [
  {
    icon: "✉",
    label: "Email",
    value: "hello@yourcompany.com",
    href: "mailto:hello@yourcompany.com",
    accentColor: "#7c9fff",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+1 (555) 000-1234",
    href: "tel:+15550001234",
    accentColor: "#a855f7",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Mumbai, India",
    accentColor: "#e0304e",
  },
  {
    icon: "🕐",
    label: "Hours",
    value: "Mon–Fri, 9 AM – 6 PM IST",
    accentColor: "#7c9fff",
  },
];

const ContactInfo: FC = () => {
  const [screen, setScreen] = useState<"mobile" | "tablet" | "laptop">(
    "laptop"
  );

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 768) setScreen("mobile");
      else if (w <= 1280) setScreen("tablet");
      else setScreen("laptop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const gap =
    screen === "mobile"
      ? "0.4rem"
      : screen === "tablet"
      ? "0.6rem"
      : "0.6rem";

  const socialMarginTop =
    screen === "mobile"
      ? "0.2rem"
      : screen === "tablet"
      ? "1.4rem"
      : "2.2rem";

  const socialSize =
    screen === "mobile"
      ? 30
      : screen === "tablet"
      ? 38
      : 44;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      {INFO.map((item) => (
        <ContactInfoItem key={item.label} {...item} />
      ))}

      <div
        style={{
          display: "flex",
          justifyContent:
            screen === "mobile" ? "center" : "flex-start",
          marginTop: socialMarginTop,
        }}
      >
        <SocialMediaIcons size={socialSize} />
      </div>
    </div>
  );
};

export default ContactInfo;