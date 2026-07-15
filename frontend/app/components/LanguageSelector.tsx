"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

const languages = [
  { code: "en", label: "EN", title: "English" },
  { code: "hi", label: "HI", title: "Hindi" },
  { code: "bn", label: "BN", title: "Bengali" },
  { code: "te", label: "TE", title: "Telugu" },
  { code: "mr", label: "MR", title: "Marathi" },
  { code: "ta", label: "TA", title: "Tamil" },
  { code: "ur", label: "UR", title: "Urdu" },
  { code: "gu", label: "GU", title: "Gujarati" },
  { code: "kn", label: "KN", title: "Kannada" },
  { code: "ml", label: "ML", title: "Malayalam" },
  { code: "pa", label: "PA", title: "Punjabi" },
  { code: "or", label: "OR", title: "Odia" },
  { code: "as", label: "AS", title: "Assamese" },

  { code: "ar", label: "AR", title: "Arabic" },
  { code: "fa", label: "FA", title: "Persian (Farsi)" },
  { code: "tr", label: "TR", title: "Turkish" },

  { code: "fr", label: "FR", title: "French" },
  { code: "de", label: "DE", title: "German" },
  { code: "es", label: "ES", title: "Spanish" },
  { code: "it", label: "IT", title: "Italian" },
  { code: "pt", label: "PT", title: "Portuguese" },
  { code: "ru", label: "RU", title: "Russian" },
  { code: "nl", label: "NL", title: "Dutch" },
  { code: "pl", label: "PL", title: "Polish" },

  { code: "zh-CN", label: "ZH", title: "Chinese (Simplified)" },
  { code: "zh-TW", label: "ZT", title: "Chinese (Traditional)" },
  { code: "ja", label: "JA", title: "Japanese" },
  { code: "ko", label: "KO", title: "Korean" },

  { code: "id", label: "ID", title: "Indonesian" },
  { code: "th", label: "TH", title: "Thai" },
  { code: "vi", label: "VI", title: "Vietnamese" },
  { code: "ms", label: "MS", title: "Malay" },

  { code: "sw", label: "SW", title: "Swahili" },
  { code: "af", label: "AF", title: "Afrikaans" },
  { code: "am", label: "AM", title: "Amharic" },

  { code: "uk", label: "UK", title: "Ukrainian" },
  { code: "he", label: "HE", title: "Hebrew" },
];

export default function LanguageSelector() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (selectedLang: string) => {
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);

    if (selectedLang === "en") {
      document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      window.location.hash = "";
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${selectedLang};path=/`;
    window.location.hash = `#googtrans=en/${selectedLang}`;

    setTimeout(() => window.location.reload(), 300);
  };

  const selectedLanguage =
    languages.find((language) => language.code === lang)?.label ??
    lang.toUpperCase();

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        className="
          group flex h-10 items-center gap-2 rounded-full
          border border-white/15 bg-black/60 px-3
          text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)]
          backdrop-blur-md transition-all duration-200
          hover:border-[#65bc4f]/60 hover:bg-[#65bc4f]/10
          focus:outline-none focus:ring-2 focus:ring-[#65bc4f]/55
        "
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#65bc4f]/15 text-[#65bc4f] transition-colors duration-200 group-hover:bg-[#65bc4f] group-hover:text-black">
          <Globe2 size={15} strokeWidth={2.2} />
        </span>
        <span className="min-w-5 text-center text-xs font-semibold leading-none">
          {selectedLanguage}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/60 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-12 z-50
            w-56 overflow-hidden rounded-lg
            border border-white/12 bg-[#0b0f0c]/95
            shadow-[0_24px_70px_rgba(0,0,0,0.42)]
            backdrop-blur-xl
          "
        >
          <div className="max-h-[580px] overflow-y-auto py-2 md:max-h-96">
            {languages.map((language) => (
              <button
                key={language.code}
                title={language.title}
                onClick={() => {
                  changeLanguage(language.code);
                  setOpen(false);
                }}
                className={`
                  flex w-full items-center justify-between
                  px-4 py-2 text-left
                  transition-colors duration-200
                  hover:bg-white/8
                  ${lang === language.code ? "bg-[#65bc4f]/12" : ""}
                `}
              >
                <span
                  className={`
                    text-sm leading-none
                    ${
                      lang === language.code
                        ? "text-[#65bc4f] font-semibold"
                        : "text-white/82"
                    }
                  `}
                >
                  {language.title}
                </span>

                {lang === language.code && (
                  <Check
                    size={14}
                    className="text-[#65bc4f]"
                    strokeWidth={2.5}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}