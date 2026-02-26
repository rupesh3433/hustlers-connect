// src/components/contact/ContactInfo.tsx

import type { FC } from "react";
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

const ContactInfo: FC = () => (
  <div
    className="flex flex-col gap-1"
  >
    {INFO.map((item) => (
      <ContactInfoItem key={item.label} {...item} />
    ))}

    {/* Social Icons Wrapper */}
    <div className="flex justify-center md:justify-start mt-3">
      <SocialMediaIcons size={30} />
    </div>
  </div>
);

export default ContactInfo;