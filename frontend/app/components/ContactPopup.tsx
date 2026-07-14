"use client";

import {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ContactForm from "./ContactForm";

interface ContactPopupContextValue {
  openPopup: () => void;
  closePopup: () => void;
}

const ContactPopupContext = createContext<ContactPopupContextValue | null>(null);

export function useContactPopup() {
  const context = useContext(ContactPopupContext);

  if (!context) {
    throw new Error("useContactPopup must be used inside ContactPopupProvider");
  }

  return context;
}

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const value = useMemo(
    () => ({
      openPopup: () => setOpen(true),
      closePopup: () => setOpen(false),
    }),
    [],
  );

  return (
    <ContactPopupContext.Provider value={value}>
      {children}

      <div
        className={`fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-black/78 px-4 py-3 backdrop-blur-sm transition duration-300 sm:py-6 md:py-8 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
      >
        <button
          className="absolute inset-0 cursor-default"
          type="button"
          aria-label="Close contact popup"
          onClick={() => setOpen(false)}
        />

        <div
          className={`relative mx-auto flex max-h-[calc(100dvh-1.5rem)] min-h-0 w-full max-w-4xl flex-col overflow-hidden border border-white/12 bg-[#070707] p-4 text-white shadow-2xl shadow-black/70 transition duration-300 sm:max-h-[calc(100dvh-3rem)] md:max-h-[calc(100dvh-4rem)] md:p-7 ${
            open ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(101,188,79,0.18),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(21,91,158,0.2),transparent_30%),radial-gradient(circle_at_76%_86%,rgba(239,51,70,0.16),transparent_28%)]" />

          <div className="relative mb-4 flex shrink-0 items-start justify-between gap-4 md:mb-6 md:gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#65BC4F]">
                Start a Conversation
              </p>
              <h2
                id="contact-popup-title"
                className="mt-3 max-w-2xl text-2xl font-black uppercase leading-none sm:text-3xl md:mt-4 md:text-5xl"
              >
                Tell us what you want to grow.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62 md:mt-4 md:text-base md:leading-7">
                Share your website, target market and current challenge. We will
                reply with a clear next step.
              </p>
            </div>

            <button
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white text-sm font-black text-[#050505] transition hover:bg-[#65BC4F]"
              type="button"
              aria-label="Close contact popup"
              onClick={() => setOpen(false)}
            >
              X
            </button>
          </div>

          <ContactForm className="relative min-h-0 flex-1 overflow-y-auto border-white/10 bg-black/30" />
        </div>
      </div>
    </ContactPopupContext.Provider>
  );
}

export function ContactPopupButton({
  children,
  className,
  onClick,
  style,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const { openPopup } = useContactPopup();

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        onClick?.();
        openPopup();
      }}
      style={style}
    >
      {children}
    </button>
  );
}
