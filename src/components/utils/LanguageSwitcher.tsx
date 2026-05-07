"use client";
import { Global } from "iconsax-reactjs";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "sw", label: "Kiswahili" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    // Replace the locale segment in the current path
    const segments = pathname.split("/");
    segments[1] = newLocale; // [0] is "", [1] is the locale
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 text-md uppercase"
      >
        <Global size="20" color="#1c1c1c" variant="TwoTone" />{" "}
        <span className="uppercase font-semibold">
          {languages.find((l) => l.code === locale)?.code}
        </span>
      </button>

      {open && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 8,
            listStyle: "none",
            padding: "8px 0",
            margin: 0,
            minWidth: 140,
            zIndex: 100,
          }}
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: lang.code === locale ? "bold" : "normal",
                background: lang.code === locale ? "#f5f5f5" : "transparent",
              }}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
