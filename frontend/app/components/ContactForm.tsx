"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export const contactServices = [
  "Website Development",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Social Media",
  "ORM",
  "Branding",
  "Email Marketing",
];

const initialFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  otp: "",
};

type ContactFormValues = typeof initialFormValues;
type FormStep = "details" | "otp" | "success";

const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "");

export default function ContactForm({
  className = "",
  onSubmit,
}: {
  className?: string;
  onSubmit?: () => void;
}) {
  const [values, setValues] = useState<ContactFormValues>(initialFormValues);
  const [step, setStep] = useState<FormStep>("details");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField =
    (field: keyof ContactFormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const sendOtp = async () => {
    const apiBase = getApiBase();

    if (!apiBase) {
      throw new Error("API base URL is not configured.");
    }

    const response = await fetch(`${apiBase}/lead/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        customFields: {
          service: values.service,
        },
      }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Unable to send OTP. Please try again.");
    }

    return data;
  };

  const verifyOtp = async () => {
    const apiBase = getApiBase();

    if (!apiBase) {
      throw new Error("API base URL is not configured.");
    }

    const response = await fetch(`${apiBase}/lead/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email.trim(),
        otp: values.otp.trim(),
      }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Invalid OTP. Please try again.");
    }

    return data;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      if (step === "details") {
        const data = await sendOtp();

        if (data.alreadyRegistered) {
          setStep("success");
          setStatusMessage(
            data.message || "Your enquiry is already registered.",
          );
          onSubmit?.();
          return;
        }

        setStep("otp");
        setStatusMessage(
          data.message || "OTP sent successfully. Please check your email.",
        );
        return;
      }

      await verifyOtp();
      setStep("success");
      setValues(initialFormValues);
      setStatusMessage("Thanks. Your enquiry has been submitted successfully.");
      onSubmit?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const editDetails = () => {
    setStep("details");
    setStatusMessage("");
    setErrorMessage("");
    setValues((current) => ({ ...current, otp: "" }));
  };

  return (
    <form
      className={`grid gap-4 border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl md:p-7 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Name
          </span>
          <input
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F] disabled:opacity-70"
            name="name"
            placeholder="Your name"
            required
            value={values.name}
            onChange={updateField("name")}
            disabled={submitting || step !== "details"}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Email
          </span>
          <input
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F] disabled:opacity-70"
            name="email"
            placeholder="you@company.com"
            required
            type="email"
            value={values.email}
            onChange={updateField("email")}
            disabled={submitting || step !== "details"}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Phone
          </span>
          <input
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F] disabled:opacity-70"
            name="phone"
            placeholder="+91"
            required
            value={values.phone}
            onChange={updateField("phone")}
            disabled={submitting || step !== "details"}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Service
          </span>
          <select
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-[#65BC4F] disabled:opacity-70"
            name="service"
            value={values.service}
            onChange={updateField("service")}
            disabled={submitting || step !== "details"}
            required
          >
            <option value="" disabled>
              Choose a service
            </option>
            {contactServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
          Project Goal
        </span>
        <textarea
          className="min-h-40 resize-y border border-white/10 bg-black/35 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F] disabled:opacity-70"
          name="message"
          placeholder="Tell us what you want to improve..."
          required
          value={values.message}
          onChange={updateField("message")}
          disabled={submitting || step !== "details"}
        />
      </label>

      {step === "otp" ? (
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
              Verify OTP
            </span>
            <input
              className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F] disabled:opacity-70"
              name="otp"
              placeholder="6 digit code"
              required
              inputMode="numeric"
              maxLength={6}
              value={values.otp}
              onChange={updateField("otp")}
              disabled={submitting}
            />
          </label>
          <button
            className="h-14 border border-white/15 px-5 text-xs font-black uppercase tracking-[0.16em] text-white/70 transition hover:border-[#65BC4F] hover:text-[#65BC4F] disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={editDetails}
            disabled={submitting}
          >
            Edit
          </button>
        </div>
      ) : null}

      <div className="grid gap-2" aria-live="polite">
        {statusMessage ? (
          <p className="text-sm font-bold leading-6 text-[#65BC4F]">
            {statusMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="text-sm font-bold leading-6 text-[#ef3346]">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <button
        className="mt-2 inline-flex justify-center rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        style={{ color: "#050505" }}
        disabled={submitting || step === "success"}
      >
        {submitting
          ? "Please wait..."
          : step === "otp"
            ? "Verify OTP"
            : step === "success"
              ? "Submitted"
              : "Send OTP"}
      </button>
    </form>
  );
}
