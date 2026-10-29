import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { submitInquiry, type InquiryInput } from "@/lib/inquiry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SENTINEL-1 | Mechanical Vehicle Security" },
      {
        name: "description",
        content:
          "SENTINEL-1 is in final development ahead of pre-production, with Park Only and Park Only + Next Stop Function base models.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SENTINEL-1 | Mechanical Vehicle Security" },
      {
        property: "og:description",
        content:
          "SENTINEL-1 is in final development ahead of pre-production, with two base models for parked-vehicle security.",
      },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SENTINEL-1 | Mechanical Vehicle Security" },
      {
        name: "twitter:description",
        content:
          "SENTINEL-1 is in final development ahead of pre-production, with two base models for parked-vehicle security.",
      },
      { name: "twitter:image", content: "/og.jpg" },
    ],
  }),
  component: Home,
});

const NAV = [
  ["Our background", "#proven-heritage"],
  ["Base models", "#base-models"],
  ["Architecture", "#the-architecture"],
  ["Applications", "#applications"],
  ["Safety & validation", "#safety-gates"],
  ["Roadmap", "#roadmap"],
  ["Partnerships", "#partner-portal"],
  ["FAQ", "#faq"],
  ["Register interest", "#programme-form"],
] as const;

const BASE_MODELS = [
  {
    name: "SENTINEL-1 Park Only",
    detail: "Parked-vehicle configuration",
    value: "SENTINEL-1 Park Only",
    distinction: "The Park Only base configuration, designed for use when the vehicle is parked.",
  },
  {
    name: "SENTINEL-1 Park Only + Next Stop Function",
    detail: "Park Only configuration with Next Stop Function",
    value: "SENTINEL-1 Park Only + Next Stop Function",
    distinction:
      "The Park Only configuration with the additional Next Stop Function. Its operating sequence and conditions will be described in the confirmed product specification.",
  },
] as const;

const PARTNERS = [
  [
    "Automotive engineering",
    "Assess mechanical feasibility, vehicle interfaces, loads and installation constraints.",
  ],
  [
    "Safety and testing",
    "Define hazard assessment, controlled test plans and independent review requirements.",
  ],
  [
    "Vehicle and fleet partners",
    "Share operating requirements, vehicle priorities and maintenance needs.",
  ],
  [
    "Manufacturing partners",
    "Contribute design-for-manufacture, sourcing, quality and service expertise.",
  ],
  [
    "Insurance and risk specialists",
    "Help identify the evidence and risk questions relevant to a future vehicle-security product.",
  ],
  [
    "Strategic and funding partners",
    "Support a defined feasibility programme, independent assessment and development milestones.",
  ],
];

const BASE_MODEL_VALUES = new Set<string>(BASE_MODELS.map((model) => model.value));

function isBaseModelInterest(value: string) {
  return BASE_MODEL_VALUES.has(value);
}

const FAQS = [
  [
    "What is SENTINEL-1 and how is it intended to work?",
    "SENTINEL-1 is a mechanical vehicle-security product intended to add a physical layer when a vehicle is parked, alongside existing security. Final operating details and performance evidence will be confirmed through product validation.",
  ],
  [
    "What is the difference between the two models?",
    "Park Only is the base parked-vehicle configuration. Park Only + Next Stop Function adds the named Next Stop Function. Its exact operating sequence and conditions will be published in the confirmed product specification.",
  ],
  [
    "Can I place a pre-order now?",
    "You can register free, non-binding pre-order interest. This is not a confirmed order or production place, and no payment is taken. We will confirm final price, fitment, availability and terms before accepting orders.",
  ],
  [
    "Which vehicles will it fit?",
    "Fitment is vehicle-specific. Register your vehicle details to help identify demand; compatibility will be confirmed only after the relevant engineering and installation assessment.",
  ],
  [
    "What is the current price and when will it be available?",
    "The displayed $795 + fitting is an indicative passenger-vehicle planning target, not a confirmed price or offer. Final model pricing and release timing will be announced when confirmed.",
  ],
  [
    "What happens after I register?",
    "We record your preferred model and vehicle details, then may contact you with relevant development and release updates. A formal order can only follow once final terms, compatibility and availability are confirmed.",
  ],
];

const EMAIL = "brayden@adversiq.xyz";
const WHATSAPP = "639608354283";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello, I’d like to learn more about SENTINEL-1.")}`;

function openShare(kind: "facebook" | "x" | "linkedin" | "whatsapp") {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("SENTINEL-1 — a mechanical security layer for parked vehicles.");
  const href = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
  }[kind];
  window.open(href, "_blank", "noopener,noreferrer");
}

const SOCIAL = [
  ["facebook", "Facebook"],
  ["x", "X"],
  ["linkedin", "LinkedIn"],
  ["whatsapp", "WhatsApp"],
] as const;

function InquiryForm({
  onPrivacy,
  selectedModel,
  onModelChange,
}: {
  onPrivacy: () => void;
  selectedModel: string;
  onModelChange: (value: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const prefix = "programme";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const data = new FormData(form);
    const model = String(data.get("model") ?? "");
    const isVehicleInterest = isBaseModelInterest(model);
    const type: InquiryInput["type"] = isVehicleInterest ? "pre-order" : "contact";
    try {
      const result = await submitInquiry({
        data: {
          type,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          country: String(data.get("country") ?? ""),
          model: String(data.get("model") ?? ""),
          vehicle: [
            ["Make", data.get("vehicleMake")],
            ["Model", data.get("vehicleModel")],
            ["Year", data.get("vehicleYear")],
            ["Variant", data.get("vehicleVariant")],
          ]
            .filter(([, value]) => String(value ?? "").trim())
            .map(([label, value]) => `${label}: ${String(value).trim()}`)
            .join("; "),
          message: String(data.get("message") ?? ""),
          termsAccepted: data.get("termsAccepted") === "on",
          website: String(data.get("website") ?? ""),
        },
      });
      if (!result.success) {
        setStatus("error");
        setMessage(result.message);
        return;
      }
      setStatus("sent");
      setMessage(
        isVehicleInterest
          ? "Thank you. Your pre-order interest has been registered. This is not an accepted order or production place, and no payment has been taken. We may contact you with updates about your selected model."
          : "Thank you. Your enquiry has been sent, and we’ll be in touch.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't send your enquiry. Please try again or use the direct contact options.",
      );
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="mt-8 border border-sage/40 bg-sage/10 p-6 text-sm leading-6">
        {message}
      </p>
    );
  }

  const inputClass =
    "min-h-11 w-full min-w-0 border border-border bg-bg px-3 text-sm tracking-normal text-fg normal-case";

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label
          className="grid min-w-0 gap-2 text-xs tracking-widest text-bronze uppercase"
          htmlFor={`${prefix}-name`}
        >
          Full name
          <input
            id={`${prefix}-name`}
            required
            maxLength={100}
            name="name"
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label
          className="grid min-w-0 gap-2 text-xs tracking-widest text-bronze uppercase"
          htmlFor={`${prefix}-email`}
        >
          Email
          <input
            id={`${prefix}-email`}
            required
            type="email"
            maxLength={254}
            name="email"
            autoComplete="email"
            className={inputClass}
          />
        </label>
        <label
          className="grid min-w-0 gap-2 text-xs tracking-widest text-bronze uppercase"
          htmlFor={`${prefix}-phone`}
        >
          Phone <span className="text-muted normal-case">(optional)</span>
          <input
            id={`${prefix}-phone`}
            type="tel"
            maxLength={40}
            name="phone"
            autoComplete="tel"
            className={inputClass}
          />
        </label>
        <label
          className="grid min-w-0 gap-2 text-xs tracking-widest text-bronze uppercase"
          htmlFor={`${prefix}-country`}
        >
          Country <span className="text-muted normal-case">(optional)</span>
          <input
            id={`${prefix}-country`}
            name="country"
            maxLength={80}
            autoComplete="country-name"
            className={inputClass}
          />
        </label>
      </div>
      <label
        className="grid min-w-0 gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-model`}
      >
        I’m contacting you about
        <select
          id={`${prefix}-model`}
          name="model"
          required
          value={selectedModel}
          onChange={(event) => onModelChange(event.target.value)}
          className={inputClass}
        >
          <option value="">Choose an enquiry type</option>
          <optgroup label="Base model interest">
            {BASE_MODELS.map((model) => (
              <option key={model.value} value={model.value}>
                {model.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Vehicle application">
            <option>Fleet application</option>
            <option>HGV / heavy-vehicle application</option>
            <option>Government / specialist application</option>
            <option>General vehicle enquiry</option>
          </optgroup>
          <optgroup label="Partnership">
            <option>Engineering / safety-validation partnership</option>
            <option>Testing / validation facility partnership</option>
            <option>Vehicle / fleet partnership</option>
            <option>Manufacturing / strategic partnership</option>
          </optgroup>
        </select>
      </label>
      <fieldset className="grid gap-3">
        <legend className="text-xs tracking-widest text-bronze uppercase">
          Vehicle details <span className="text-muted normal-case">(optional)</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["vehicleMake", "Make", 30],
            ["vehicleModel", "Model", 30],
            ["vehicleYear", "Year", 4],
            ["vehicleVariant", "Variant / drivetrain", 20],
          ].map(([name, label, maxLength]) => (
            <label
              key={name}
              className="grid min-w-0 gap-2 text-xs tracking-widest text-muted uppercase"
            >
              {label}
              <input name={String(name)} maxLength={Number(maxLength)} className={inputClass} />
            </label>
          ))}
        </div>
      </fieldset>
      <label
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-message`}
      >
        Organisation, fleet size or additional details{" "}
        <span className="text-muted normal-case">(optional)</span>
        <textarea
          id={`${prefix}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Share your organisation, fleet size, application or partnership interests."
          className="min-w-0 border border-border bg-bg px-3 py-2 text-sm tracking-normal text-fg normal-case"
        />
      </label>
      <label className="sr-only" aria-hidden="true">
        Leave this field blank
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          required
          type="checkbox"
          name="termsAccepted"
          className="mt-1 size-4 accent-bronze"
        />
        <span>
          I understand this is a free, non-binding pre-order interest registration or development
          enquiry—not an accepted order or production place. No payment is taken. Final price,
          fitment, timing and availability will be confirmed before orders open. I agree my details
          may be used to respond to this enquiry. See the Privacy Notice below.
        </span>
      </label>
      <button
        type="button"
        onClick={onPrivacy}
        className="min-h-11 w-fit text-sm underline underline-offset-4"
      >
        Read the Privacy Notice
      </button>
      {status === "error" && (
        <p role="alert" className="border border-red-400/40 bg-red-400/10 p-4 text-sm leading-6">
          {message}{" "}
          <a className="underline" href={`mailto:${EMAIL}`}>
            Email {EMAIL}
          </a>{" "}
          or{" "}
          <a className="underline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            message us on WhatsApp
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 min-h-11 w-fit border border-bronze bg-bg px-6 text-sm tracking-widest text-fg uppercase transition-colors hover:bg-raised disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending"
          ? "Sending…"
          : isBaseModelInterest(selectedModel)
            ? "Register pre-order interest"
            : "Submit my enquiry"}
      </button>
    </form>
  );
}

function CookieNotice({ onPrivacy }: { onPrivacy: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(
      !document.cookie.split("; ").some((item) => item.startsWith("sentinel-cookie-choice=")),
    );
  }, []);

  function acceptEssential() {
    document.cookie =
      "sentinel-cookie-choice=essential; Max-Age=31536000; Path=/; SameSite=Lax; Secure";
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-3xl flex-col gap-4 border border-border bg-surface p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="max-w-xl text-sm leading-6 text-fg/85">
        This site uses essential storage to remember your choice. No advertising or analytics
        cookies are active.
      </p>
      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onPrivacy();
          }}
          className="min-h-11 px-3 text-xs tracking-widest text-fg uppercase underline"
        >
          Details
        </button>
        <button
          type="button"
          onClick={acceptEssential}
          className="min-h-11 border border-bronze bg-bg px-4 text-xs tracking-widest text-fg uppercase transition-colors hover:bg-raised"
        >
          Essential only
        </button>
      </div>
    </aside>
  );
}

function LegalDialog({ title, onClose }: { title: string; onClose: () => void }) {
  const content: Record<string, string> = {
    Terms:
      "SENTINEL-1 is in final development ahead of pre-production. Product specifications, features, pricing and availability remain subject to confirmation. A pre-order interest registration is free and non-binding; it is not an accepted order or confirmation of availability. No payment is collected through this website. Product descriptions are not evidence of safety certification or road approval.",
    Privacy:
      "When you submit an enquiry, the details you provide are sent to the project contact by email through the configured email delivery provider. This website does not save enquiry submissions to a database. Your information is used to respond to your request and is not intentionally used for advertising. The site stores an essential cookie to remember your cookie notice choice. Contact the project email to ask about or request removal of enquiry information.",
    Refund:
      "This website currently collects enquiries only and does not take payments or accept completed orders. No refund is due for an enquiry. If product sales are offered in future, separate purchase, cancellation and refund terms will be published before payment is collected.",
  };
  const body = content[title] ?? content.Terms;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-bg/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="legal-dialog-title"
        aria-modal="true"
        className="max-h-[85dvh] w-full max-w-2xl overflow-y-auto border border-border bg-surface p-6 sm:p-8"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id="legal-dialog-title" className="font-display text-4xl">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="min-h-11 px-3 text-sm uppercase">
            Close
          </button>
        </div>
        <p className="mt-6 text-sm leading-7 text-fg/85">{body}</p>
        <p className="mt-5 text-xs leading-5 text-muted">
          These preliminary notices should be reviewed for your jurisdiction before commercial
          launch.
        </p>
      </section>
    </div>
  );
}

function Home() {
  const [pathwaysOpen, setPathwaysOpen] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("");

  return (
    <main className="s1-site bg-bg text-fg">
      <header className="s1-header fixed inset-x-0 top-0 z-20 bg-bg">
        <div className="s1-announcement flex h-8 items-center justify-center px-4 text-[0.62rem] tracking-[0.2em] uppercase">
          Final development · pre-production
        </div>
        <div className="s1-header-main relative mx-auto flex h-[5.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            className="s1-menu-toggle inline-flex min-h-12 items-center gap-3 text-sm tracking-[0.16em] uppercase transition-colors hover:text-bronze"
            aria-expanded={pathwaysOpen}
            aria-controls="pathways-menu"
            aria-label={pathwaysOpen ? "Close menu" : "Open models and applications menu"}
            onClick={() => setPathwaysOpen((value) => !value)}
          >
            <span className="s1-menu-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>{pathwaysOpen ? "Close" : "Explore"}</span>
          </button>
          <a
            href="#top"
            className="s1-wordmark absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
          >
            <img src="/logo.svg" alt="" className="s1-brand-icon h-9 w-auto" />
            <span className="flex flex-col items-center">
              <span className="font-display text-xl font-medium tracking-[0.18em] transition-colors hover:text-bronze sm:text-2xl">
                SENTINEL-1
              </span>
              <span className="hidden text-[0.62rem] tracking-[0.18em] uppercase sm:block">
                Mechanical vehicle security
              </span>
            </span>
          </a>
          <a
            href="#reserve"
            className="s1-header-cta inline-flex min-h-12 items-center gap-2 px-2 text-xs tracking-[0.12em] uppercase transition-colors hover:text-bronze sm:border sm:border-border sm:px-5"
          >
            <span className="hidden sm:inline">Register interest</span>
            <span className="sm:hidden">Register</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        {pathwaysOpen && (
          <div
            id="pathways-menu"
            className="absolute top-full right-3 z-30 max-h-[calc(100svh-5rem)] w-[min(52rem,calc(100vw-1.5rem))] overflow-y-auto border border-border bg-surface shadow-2xl sm:right-8"
          >
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <section className="border-b border-border bg-bg/70 p-5 sm:p-7 md:border-r md:border-b-0">
                <p className="text-xs tracking-widest text-bronze uppercase">The product</p>
                <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                  A mechanical layer for parked-vehicle security.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  SENTINEL-1 is a mechanical vehicle-security product with two base models: Park
                  Only and Park Only + Next Stop Function.
                </p>
                <p className="mt-4 border-l-2 border-bronze pl-3 text-xs leading-5 text-muted">
                  Final development ahead of pre-production. Two base models are in development;
                  final specifications, fit and release details are subject to confirmation.
                </p>
                <a
                  href="#the-architecture"
                  className="mt-5 inline-flex min-h-11 items-center text-xs tracking-widest text-fg uppercase transition-colors hover:text-bronze"
                  onClick={() => setPathwaysOpen(false)}
                >
                  Explore the product{" "}
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </a>
              </section>
              <section className="p-5 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl sm:text-2xl">Two base models</h2>
                  <span className="text-xs tracking-widest text-muted uppercase">
                    Parked-vehicle configurations
                  </span>
                </div>
                <div className="mt-4 grid gap-x-5 sm:grid-cols-2">
                  {BASE_MODELS.map((model, index) => {
                    return (
                      <a
                        key={model.value}
                        href={index === 0 ? "#base-model-park-only" : "#base-model-next-stop"}
                        className="group border-t border-border py-3 transition-colors hover:text-bronze"
                        onClick={() => setPathwaysOpen(false)}
                      >
                        <span>
                          <span className="block text-sm font-medium text-fg group-hover:text-bronze">
                            {model.name}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-muted">
                            {model.detail}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </section>
            </div>
            <nav
              aria-label="Explore the site"
              className="flex flex-wrap gap-x-5 gap-y-1 border-t border-border px-5 py-3 sm:px-7"
            >
              {NAV.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="min-h-10 py-3 text-xs tracking-widest text-muted uppercase transition-colors hover:text-bronze"
                  onClick={() => setPathwaysOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="s1-hero relative isolate scroll-mt-28 bg-bg pt-[7.25rem]">
        <div className="s1-hero-layout relative mx-auto grid max-w-7xl">
          <div className="s1-hero-content">
            <div className="s1-hero-copy">
              <p className="section-kicker text-xs tracking-[0.2em] text-bronze uppercase">
                Mechanical security · in development
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,6vw,5.6rem)] leading-[0.88]">
                Security beyond
                <span className="block">the electronics.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-display text-xl leading-8 text-muted sm:text-2xl">
                A considered mechanical layer for vehicles when they are parked and unattended.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                SENTINEL-1 is designed to work alongside a vehicle’s existing security. Operation,
                safety and fitment remain subject to vehicle-specific confirmation.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#reserve"
                  className="group inline-flex min-h-12 items-center gap-3 bg-bg px-6 text-xs tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-bg"
                >
                  Register pre-order interest
                  <span
                    aria-hidden="true"
                    className="text-base transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href="#proven-heritage"
                  className="inline-flex min-h-12 items-center border-b border-border px-1 text-xs tracking-widest text-fg uppercase transition-colors hover:border-bronze"
                >
                  Discover our background
                </a>
              </div>
            </div>
            <div className="s1-hero-intended mt-8 border-t border-border pt-6">
              <p className="text-xs tracking-widest text-muted uppercase">Intended use</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                Leave your vehicle. Feel confident it will be there when you return.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                As vehicles become smarter, theft methods evolve too. SENTINEL-1 takes a step back
                from that electronic arms race: an independent mechanical unit built around
                fundamental vehicle principles. Drawing on experience developing a mechanical
                anti-theft device, the project returns to a familiar automotive idea: keep it simple.
                Its aim is to add a physical obstacle when parked—and greater confidence when you
                return.
              </p>
              <p className="mt-4 border-l-2 border-bronze pl-3 font-display text-lg leading-tight text-fg">
                Mechanical by principle.
                <br />
                Vehicle-specific by design.
              </p>
            </div>
          </div>
          <img
            src="/img/sentinel-vehicle-types-vertical.jpg"
            alt="White icons representing a car, truck, bus, motorcycle, tractor and dump truck, with a UFO above"
            className="s1-hero-vehicle-photo"
          />
        </div>
      </section>

      <section id="applications" className="scroll-mt-20">
        <div className="s1-applications-banner mx-auto grid max-w-7xl overflow-hidden bg-surface">
          <div className="s1-banner-content">
            <div className="s1-banner-copy">
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Vehicle application pathways
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
                One mechanical idea.
                <span className="block">Every vehicle class in view.</span>
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
                SENTINEL is being developed for parked-vehicle security across a broad range of
                vehicle types. SENTINEL-1 is focused on passenger vehicles, fleets, buses, trucks,
                agricultural and off-highway machinery; SENTINEL-2 is the separate motorcycle
                development direction. The aim is to complement existing vehicle systems, with
                every application requiring its own engineering, fitment and safety assessment.
                Insurers, operators, vehicle specialists and manufacturing partners can help shape
                the evidence and requirements. Compatibility across these vehicle types is not yet
                confirmed.
              </p>
            </div>
          </div>
          <div
            id="specialist-pathway"
            className="s1-specialist-panel scroll-mt-20"
          >
            <p className="text-xs tracking-widest uppercase">
              Exploratory applications
            </p>
            <h3 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              Specialist and government pathways require their own assessment.
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-6">
              Any potential specialist or government use would require a separately defined,
              properly governed engineering and evaluation programme. SENTINEL-1 is not a fielded
              or certified military product; no operational capability, defence qualification or
              government endorsement is claimed.
            </p>
            <a
              href="#reserve"
              className="mt-6 inline-flex min-h-11 items-center border px-5 text-xs tracking-widest uppercase transition-colors"
            >
              Discuss a specialist application
            </a>
          </div>
        </div>
      </section>

      <section id="proven-heritage" className="scroll-mt-20 bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-center">
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              Our background
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl leading-tight sm:text-6xl">
              25 years of experience.
              <span className="block text-bronze">One new direction.</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
              SENTINEL-1 grew from more than 25 years of experience across the passenger automotive
              and commercial vehicle industries. The developer’s background includes working in
              passenger automotive and more than a decade helping develop and market a mechanical
              anti-theft device for truck trailers.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              That combination of experience is why SENTINEL-1 was created: to bring proven
              mechanical thinking from commercial vehicle security into a new product for passenger
              vehicles. The aim is a discreet, independent unit that works alongside a vehicle’s
              existing security, without relying on its electronics as the primary barrier.
              SENTINEL-1 is progressing through final development toward pre-production; operation
              and fitment require vehicle-specific confirmation.
            </p>
          </div>
          <aside className="s1-heritage-collage" aria-label="SENTINEL-1 concept imagery">
            <figure className="s1-collage-main">
              <img
                src="/img/sentinel-designer-workshop.png"
                alt="Workshop engineering setup supporting the product development process"
                loading="lazy"
              />
            </figure>
            <figure className="s1-collage-detail">
              <img
                src="/img/sentinel-classic-racecar.jpg"
                alt="Classic race vehicle used to represent heritage and bespoke fitment opportunities"
                loading="lazy"
              />
            </figure>
            <figure className="s1-collage-range">
              <img
                src="/img/sentinel-truck.jpg"
                alt="Blue heavy-duty truck with trailer travelling on a mountain highway"
                loading="lazy"
              />
            </figure>
          </aside>
        </div>
      </section>

      <section id="the-architecture" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div id="base-models" className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <figure className="s1-photo-frame s1-photo-cut overflow-hidden bg-photo-surface">
                <img
                  src="/img/sentinel-unit.jpeg"
                  alt="Illustrative rendering of the SENTINEL-1 enclosure"
                  className="s1-product-render w-full object-contain"
                />
                <figcaption className="px-3 py-3 text-center text-xs tracking-widest text-photo-muted uppercase">
                  Illustrative product rendering · final production specification may differ
                </figcaption>
              </figure>
              <div>
                <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                  The product
                </p>
                <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
                  Mechanical by principle.
                  <span className="block text-bronze">Security when parked.</span>
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-fg/85">
                  SENTINEL-1 is in final development ahead of pre-production. Compare the two
                  configurations below; specifications and operating details will be confirmed
                  before release.
                </p>
              </div>
            </div>
            <div className="mt-10 border-y border-border py-6">
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Base models
              </p>
              <h3 className="font-display text-2xl sm:text-3xl">
                Two configurations. One platform.
              </h3>
              <ul id="roadmap" className="s1-base-points mt-4 grid gap-x-10 sm:grid-cols-2">
                {[
                  "A mechanical restraint intended to add a physical layer when the vehicle is parked.",
                  "Designed to complement existing vehicle security, not replace alarms, immobilisers or tracking.",
                  "Vehicle compatibility, safe operation and recovery require platform-specific assessment and validation.",
                  "Specifications, manufacturing, pricing, delivery, warranty and customer support must be confirmed before paid orders open.",
                ].map((point) => (
                  <li key={point} className="border-t border-border py-3 text-sm leading-6 text-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="s1-model-grid mt-8 grid gap-3 md:grid-cols-2">
              {BASE_MODELS.map((model, index) => (
                <article
                  key={model.value}
                  id={index === 0 ? "base-model-park-only" : "base-model-next-stop"}
                  className="s1-model-card scroll-mt-24 transition-colors"
                >
                  <p className="text-xs tracking-[0.18em] text-bronze uppercase">
                    Configuration 0{index + 1}
                  </p>
                  <h4 className="mt-2 font-display text-2xl sm:text-3xl">{model.name}</h4>
                  <p className="mt-4 border-t border-border pt-3 text-sm leading-6 text-muted">
                    {model.distinction}
                  </p>
                  <a
                    href="#programme-form"
                    onClick={() => setSelectedModel(model.value)}
                    className="mt-5 inline-flex min-h-11 items-center border border-border px-4 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
                  >
                    Pre-order this model
                  </a>
                </article>
              ))}
            </div>
            <div className="s1-price-panel mt-10">
              <div className="s1-price-panel-heading">
                <p className="text-sm tracking-widest uppercase">
                  Indicative passenger-vehicle target (motor vehicles only)
                </p>
                <p className="font-display text-3xl sm:text-4xl">$795 + fitting</p>
              </div>
              <p className="s1-price-panel-note mt-3 text-base leading-7">
                Planning target only—not a current offer. Final price, fit, timing and availability
                will be confirmed before orders open. No payment is taken to register interest.
              </p>
              <ul
                className="s1-vehicle-poa-list mt-4"
                aria-label="Indicative pricing for other vehicle classes"
              >
                {[
                  ["Trucks & fleet vehicles", "POA"],
                  ["Buses", "POA"],
                  ["Motorcycles", "POA"],
                  ["Agricultural machinery", "POA"],
                  ["Off-highway vehicles", "POA"],
                ].map(([vehicleClass, price]) => (
                  <li key={vehicleClass}>
                    <span>{vehicleClass}</span>
                    <span>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              id="intended-use"
              className="mt-12 grid items-center gap-8 border-t border-border pt-10 lg:grid-cols-2 lg:gap-12"
            >
              <figure className="s1-photo-frame s1-photo-arch overflow-hidden">
                <img
                  src="/img/sentinel-classic-racecar.jpg"
                  alt="Classic competition car used to represent bespoke and heritage vehicle applications"
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-xs tracking-widest text-muted uppercase">
                  Classic and specialist vehicle application · fitment to be confirmed
                </figcaption>
              </figure>
              <div className="max-w-xl">
                <p className="section-kicker text-base tracking-widest text-bronze uppercase">
                  Vehicle-specific fitment
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                  A special vehicle deserves a considered approach.
                </h3>
                <p className="mt-4 text-base leading-7 text-muted">
                  Classic and specialist vehicles may need bespoke assessment. Each vehicle would
                  require its own engineering, fitment, safety and recovery review; compatibility
                  cannot be assumed.
                </p>
                <a
                  href="#reserve"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs tracking-widest text-bronze uppercase transition-colors hover:text-fg"
                >
                  Discuss your vehicle <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sentinel-2" className="scroll-mt-20 bg-surface">
        <div className="s1-sentinel2-banner mx-auto grid max-w-7xl items-center px-5 py-20 sm:px-8">
          <div className="s1-sentinel2-copy max-w-xl">
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              Motorcycle security · in development
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Introducing SENTINEL-2.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              SENTINEL-2 is the motorcycle-focused development direction, distinct from SENTINEL-1
              for cars and other vehicles. Its specifications, motorcycle compatibility, safe
              operation and availability are still to be confirmed.
            </p>
            <a
              href="#reserve"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs tracking-widest text-bronze uppercase transition-colors hover:text-fg"
            >
              Contact us for more information <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section id="safety-gates" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div>
            <div className="max-w-4xl">
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Safety & validation
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
                Evidence before installation.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
                SENTINEL-1 must pass staged mechanical, vehicle-interface and safety review before
                any installation is considered.
              </p>
            </div>
          </div>
          <ul className="s1-feature-grid s1-safety-steps mt-10 grid gap-4 sm:grid-cols-2">
            {[
              [
                "Parked-state safety",
                "Define and verify conditions that prevent unintended operation.",
              ],
              [
                "Mechanical integrity",
                "Assess strength, durability and failure behaviour under controlled tests.",
              ],
              [
                "Vehicle-specific fit",
                "Review each platform, including safe interaction with vehicle systems.",
              ],
              [
                "Fault and recovery",
                "Demonstrate safe response to faults, power loss and authorised recovery.",
              ],
              [
                "Controlled evaluation",
                "Begin with documented bench testing before any approved vehicle evaluation.",
              ],
              [
                "Independent review",
                "Obtain appropriate safety assessment before considering deployment.",
              ],
            ].map(([title, body]) => (
              <li key={title} className="s1-safety-step">
                <h3 className="font-display text-xl sm:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-6 text-muted">
            No moving-vehicle testing or public-road deployment is authorised before the required
            independent safety gates are satisfied.
          </p>
          <a
            href="#partner-portal"
            className="mt-6 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
          >
            Discuss testing or safety
          </a>
        </div>
      </section>

      <section id="partner-portal" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-xs tracking-widest text-bronze uppercase">Strategic partnerships</p>
              <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
                Build what comes next.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                We welcome discussions with engineering and safety specialists, test facilities,
                vehicle operators and manufacturing partners who can contribute to final development
                and pre-production readiness.
              </p>
            </div>
            <img
              src="/img/sentinel-partnerships-engineering.jpg"
              alt="A steel nut with wire legs, representing practical mechanical engineering"
              className="aspect-[3/2] w-full border border-bronze/40 object-cover"
              loading="lazy"
            />
          </div>
          <ul className="s1-partner-grid mt-8 grid gap-x-10 md:grid-cols-2">
            {PARTNERS.map(([title, body]) => (
              <li key={title} className="s1-content-card border-t border-border py-5">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-muted">
            These are structured discussions, not an assumption that product performance is proven.
            Any proposed work should agree its scope, responsibilities, confidentiality, costs,
            deliverables and decision gates before commitments are made.
          </p>
          <a
            href="#programme-form"
            className="mt-7 inline-flex min-h-11 items-center border border-bronze bg-bg px-6 text-sm tracking-widest text-fg uppercase transition-colors hover:bg-raised"
          >
            Discuss a partnership
          </a>
        </div>
      </section>

      <section
        id="reserve"
        className="relative isolate scroll-mt-20 overflow-hidden border-t border-border bg-surface"
      >
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_35%,rgba(209,174,115,0.11),transparent_34%),radial-gradient(ellipse_at_90%_70%,rgba(131,170,152,0.1),transparent_38%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
            <div className="min-w-0 lg:col-span-2">
              <p className="inline-flex items-center gap-3 text-xs tracking-widest text-bronze uppercase">
                <span className="h-px w-8 bg-bronze" aria-hidden="true" />
                Non-binding pre-order registration
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl">
                Choose your model.
                <span className="block text-bronze">Help shape what comes next.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
                Select Park Only or Park Only + Next Stop Function, then share your vehicle details.
                Registration is free and non-binding, with no payment or purchase commitment. It
                helps us understand demand as we prepare for production.
              </p>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ["01 — Choose a model", "Select Park Only or Park Only + Next Stop Function."],
                  ["02 — Register", "Your preferred model and vehicle details are recorded."],
                  [
                    "03 — Update",
                    "We may contact you with relevant development and release updates.",
                  ],
                  [
                    "04 — Order",
                    "Formal orders open only after final price, fitment, availability and terms are confirmed.",
                  ],
                ].map(([title, body]) => (
                  <li
                    key={title}
                    className="border-l-2 border-bronze bg-bg/75 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="font-display text-xl text-bronze">{title}</p>
                    <p className="mt-1 text-sm leading-5 text-fg/80">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div
              id="programme-form"
              className="min-w-0 border border-border bg-bg/95 p-5 shadow-2xl shadow-black/20 sm:p-7 lg:col-span-3"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 grid size-9 shrink-0 place-items-center border border-bronze/50 font-display text-xl text-bronze">
                  01
                </span>
                <div>
                  <h3 className="font-display text-3xl">Register pre-order interest</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Choose a base model and tell us about your vehicle. This registration is free
                    and non-binding; it is not an order, and no payment is taken.
                  </p>
                </div>
              </div>
              <InquiryForm
                onPrivacy={() => setLegal("Privacy")}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
          </div>

          <div id="faq" className="mt-12 scroll-mt-20 border-t border-border pt-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs tracking-widest text-bronze uppercase">Before you register</p>
                <h3 className="mt-2 font-display text-4xl">Frequently asked questions</h3>
              </div>
              <p className="max-w-lg text-sm leading-6 text-muted">
                Clear answers about development status, pricing, fit and what happens next.
              </p>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {FAQS.map(([question, answer]) => (
                <details
                  key={question}
                  open
                  className="group self-start border border-border bg-bg/80 px-5 transition-colors open:border-bronze/50 hover:border-bronze/40"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-3 text-sm font-medium marker:hidden">
                    {question}
                    <span
                      className="s1-faq-toggle grid size-7 shrink-0 place-items-center border border-border text-lg leading-none text-bronze"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 text-sm leading-6 text-muted">{answer}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="mt-8 border-l-2 border-bronze pl-5 text-sm leading-6 text-muted">
            SENTINEL-1 is in final development ahead of pre-production. No moving-vehicle testing or
            public-road deployment is authorised unless the applicable safety and legal requirements
            are satisfied.
          </p>
        </div>
      </section>

      <footer className="relative isolate overflow-hidden border-t border-border">
        <img
          src="/img/sentinel-world-map-language-footer.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2">
          <div>
            <p className="font-display text-3xl font-semibold tracking-widest text-bronze">
              SENTINEL-1
            </p>
            <p className="text-sm text-fg/80">PROJECT SENTINEL-1</p>
          </div>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-widest text-bronze uppercase">Organisation</dt>
              <dd className="mt-1">ADVERSIQ Intelligence</dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest text-bronze uppercase">Email</dt>
              <dd className="mt-1">
                <a className="underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest text-bronze uppercase">Phone</dt>
              <dd className="mt-1">
                <a className="underline" href="tel:+639608354283">
                  +63 960 835 4283
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest text-bronze uppercase">ABN</dt>
              <dd className="mt-1">55 978 113 300</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs tracking-widest text-bronze uppercase">Share</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {SOCIAL.map(([kind, label]) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => openShare(kind)}
                    className="min-h-11 border border-fg/25 bg-bg/50 px-4 text-xs tracking-widest uppercase backdrop-blur-sm transition-colors duration-200 hover:border-bronze hover:text-bronze"
                  >
                    {label}
                  </button>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <p className="relative z-10 mx-auto max-w-7xl px-5 pb-10 text-xs leading-5 text-muted sm:px-8">
          SENTINEL-1 is in final development ahead of pre-production. Product specifications,
          performance evidence, vehicle compatibility, pricing, delivery timing, warranty terms and
          release remain subject to confirmation and applicable validation. No certification,
          operational deployment or demonstrated theft-reduction performance is claimed. © 2026
          PROJECT SENTINEL-1. All rights reserved.
        </p>
        <nav
          aria-label="Legal information"
          className="relative z-10 mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 pb-8 text-xs tracking-widest uppercase sm:px-8"
        >
          {["Terms", "Privacy", "Refund"].map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => setLegal(title)}
              className="min-h-11 underline underline-offset-4"
            >
              {title}
            </button>
          ))}
        </nav>
      </footer>
      <CookieNotice onPrivacy={() => setLegal("Privacy")} />
      {legal && <LegalDialog title={legal} onClose={() => setLegal(null)} />}
    </main>
  );
}
