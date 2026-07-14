"use client";

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

export default function ContactForm({
  className = "",
  onSubmit,
}: {
  className?: string;
  onSubmit?: () => void;
}) {
  return (
    <form
      className={`grid gap-4 border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl md:p-7 ${className}`}
      action="mailto:hello@bigwigmedia.in"
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Name
          </span>
          <input
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
            name="name"
            placeholder="Your name"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Email
          </span>
          <input
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
            name="email"
            placeholder="you@company.com"
            required
            type="email"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Phone
          </span>
          <input
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
            name="phone"
            placeholder="+91"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
            Service
          </span>
          <select
            className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-[#65BC4F]"
            name="service"
            defaultValue=""
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
          className="min-h-40 resize-y border border-white/10 bg-black/35 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
          name="message"
          placeholder="Tell us what you want to improve..."
          required
        />
      </label>

      <button
        className="mt-2 inline-flex justify-center rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
        type="submit"
        style={{ color: "#050505" }}
      >
        Send Brief
      </button>
    </form>
  );
}
