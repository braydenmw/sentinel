import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { submitInquiry, type InquiryInput } from "@/lib/inquiry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        name: "description",
        content:
          "Explore the SENTINEL-1 prototype concept, vehicle security approach, safety requirements, specifications, and partnership opportunities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        property: "og:description",
        content:
          "A prototype-stage concept for an independent mechanical vehicle security layer. Review the design, safety gates, and development programme.",
      },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        name: "twitter:description",
        content: "A prototype-stage concept for an independent mechanical vehicle security layer.",
      },
      { name: "twitter:image", content: "/og.jpg" },
    ],
  }),
  component: Home,
});

const NAV = [
  ["Problem", "#problem"],
  ["Solution", "#solution"],
  ["Models", "#models"],
  ["Safety", "#safety"],
  ["Specifications", "#specs"],
  ["Contact", "#contact"],
] as const;

const COMPARE = [
  {
    feature: "Stops drive-away",
    gps: "No",
    alarm: "No",
    immobiliser: "Bypassable",
    sentinel: "Concept goal",
  },
  {
    feature: "Works when keys cloned",
    gps: "No",
    alarm: "No",
    immobiliser: "No",
    sentinel: "Not validated",
  },
  {
    feature: "Works without GPS/signal",
    gps: "No",
    alarm: "Yes",
    immobiliser: "Yes",
    sentinel: "Concept goal",
  },
  {
    feature: "Hidden from thieves",
    gps: "No",
    alarm: "No",
    immobiliser: "No",
    sentinel: "Design intent",
  },
  {
    feature: "Independent of vehicle electronics",
    gps: "No",
    alarm: "No",
    immobiliser: "No",
    sentinel: "Design intent",
  },
];

const MODELS = [
  {
    name: "SENTINEL-1 Core",
    body: "The base security unit. Designed for owners who want independent physical protection as the foundation of their vehicle security.",
  },
  {
    name: "SENTINEL-1 Vehicle Kit",
    body: "Core unit matched to a vehicle-specific fitting package for your make and model. Built for one vehicle, installed where it belongs — hidden and secure.",
  },
  {
    name: "SENTINEL-1 Fleet",
    body: "Common security architecture across multiple vehicles, with per-vehicle fitting packages. Scaled protection for operators managing cars, vans, utes, and light commercial fleets.",
  },
  {
    name: "SENTINEL-1 Development Platform",
    body: "Early-access configuration for controlled testing and validation environments.",
  },
];

const OPTIONS = [
  ["GNSS Location Module", "Supervisory location reporting for vehicle status."],
  [
    "Cellular Telemetry",
    "Encrypted status updates. Supervisory only — never controls mechanical function.",
  ],
  ["Solar Power Extension", "5W panel with charge controller for extended unattended standby."],
  ["Dual-Key Release", "Physical backup access via 5-pin key barrel."],
  ["UWB Authentication", "Secure proximity-based key-fob verification."],
  [
    "Vehicle Interface Kit",
    "Per-platform brackets, clamps, and connectors for clean, hidden fitting to your specific vehicle.",
  ],
];

const BENEFITS = [
  [
    "Prevention-first concept",
    "Aims to add a physical security layer rather than report a theft after it occurs.",
  ],
  [
    "Independent architecture",
    "Designed to be separate from vehicle computers, signals, and software; not yet validated.",
  ],
  [
    "A distinct layer of security",
    "Intended to complement existing vehicle security; resistance to attacks has not been independently tested.",
  ],
  [
    "Designed around parked vehicles",
    "The initial concept focuses on vehicles secured at home or in a parking place.",
  ],
  [
    "Insurance assessment sought",
    "Future insurance relevance would require independent evidence and insurer review.",
  ],
  [
    "Hidden from view",
    "Concealed mounting is a design objective; no installation has been validated.",
  ],
  [
    "Global application",
    "Vehicle classes are being considered; compatibility is not yet confirmed.",
  ],
  ["Tamper detection", "Tamper monitoring is a proposed feature and has not been tested."],
  ["Event logging", "Timestamped event logging is a proposed feature."],
  [
    "Interface-end verification",
    "Interface verification is a proposed safety requirement, not a validated capability.",
  ],
  [
    "Safety-led development",
    "No moving-vehicle actuation is authorized; independent review is required.",
  ],
  [
    "Mechanical recovery",
    "A physical release is part of the design brief and requires validation.",
  ],
  [
    "Service mode",
    "Authorised maintenance state for workshops, tow operators, and first responders.",
  ],
  [
    "Independent power concept",
    "A separate battery is proposed; performance has not been measured.",
  ],
  [
    "Secure release",
    "Fob authentication and a mechanical backup are proposed; release security and recovery have not been validated.",
  ],
];

const PARTNERS = [
  [
    "Development partners",
    "Automotive engineering and functional-safety experts to assess the concept and verify safe-by-construction design before any vehicle installation.",
  ],
  [
    "Testing partners",
    "Laboratories and test facilities for guarded bench demonstrator validation and cycle/environmental testing. We need real-world testing to prove the system works across vehicle classes and conditions.",
  ],
  [
    "Fleet pilot partners",
    "Fleet operators willing to run controlled pilot deployments once safety gates are passed. This is how we gather operational data across passenger, light commercial, and specialist vehicles.",
  ],
  [
    "Manufacturing partners",
    "Regional assembly and production partners to scale local manufacturing once the design is validated.",
  ],
  [
    "Insurance partners",
    "Actuarial and risk consultants to evaluate coverage pathways and premium recognition for physically secured vehicles.",
  ],
];

const FAQS = [
  [
    "Will SENTINEL-1 affect my new-car warranty?",
    "No vehicle-specific installation has been validated. Warranty impact depends on the vehicle, installer, and jurisdiction; ask your vehicle manufacturer or dealer before considering any future installation.",
  ],
  [
    "What if I lose my fob?",
    "A mechanical override is part of the design brief, but recovery behavior has not been validated in a working product.",
  ],
  [
    "Can thieves disable it?",
    "SENTINEL-1 is a prototype-stage concept. Its tamper resistance and protection against attacks have not been independently tested, so we cannot claim it is undefeatable.",
  ],
  [
    "Do I need to change how I park or use my car?",
    "There is no product available to use yet. Any future operating routine will depend on validated engineering and safety approval.",
  ],
  [
    "Is it visible from outside the vehicle?",
    "A concealed under-chassis mounting approach is a design concept, not a validated installation.",
  ],
  [
    "Will my insurer recognise it?",
    "There is no insurer recognition or premium reduction at this stage. Ask your insurer directly about any security device before making a policy decision.",
  ],
  [
    "What happens if I sell the car?",
    "Transferability has not been tested. A future installation would require a vehicle-specific engineering assessment.",
  ],
];

const PARKED = [
  "A parked-state security mode is a design objective, not a tested feature.",
  "Stationary-state detection and engagement logic require independent safety verification.",
  "No working vehicle installation is available for owners to use.",
  "Any eventual release process must be validated before vehicle integration.",
];

const NEXT_STOP = [
  "The concept for this mode remains under safety review.",
  "No restraint is designed or authorized to engage while a vehicle is moving.",
  "Any future response mode requires independent automotive functional-safety approval before testing.",
  "No public-road testing or deployment is authorized at this stage.",
];

const EMAIL = "brayden@adversiq.xyz";
const WHATSAPP = "639608354283";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello, I’d like to learn more about SENTINEL-1.")}`;

const SPECIFICATIONS = [
  ["Enclosure dimensions", "200 × 120 × 60 mm (initial design target)"],
  ["Material", "316 stainless steel (proposed)"],
  ["Power", "Independent LiFePO4 battery (proposed)"],
  ["Actuation", "Dual mechanical restraint concept; not validated"],
  ["Vehicle interface", "Vehicle-specific, subject to independent engineering review"],
  ["Authentication", "Key-fob authentication with mechanical override (proposed)"],
  ["Radio", "UWB; optional BLE / sub-GHz (proposed)"],
  ["Environment", "IP67 and −40 °C to +70 °C are design targets, not verified ratings"],
  ["Safety status", "Prototype concept; no certification or road approval"],
] as const;

const COLS = [
  ["GPS tracker", "gps"],
  ["Factory alarm", "alarm"],
  ["Immobiliser", "immobiliser"],
  ["SENTINEL-1", "sentinel"],
] as const;

function openShare(kind: "facebook" | "x" | "linkedin" | "whatsapp") {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "SENTINEL-1 — take control before they take your car. Independent mechanical vehicle security.",
  );
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

function Mark({ value, emphasis }: { value: string; emphasis?: boolean }) {
  const negative = value === "No" || value === "Bypassable";
  return (
    <span className={emphasis ? "text-bronze" : negative ? "text-muted" : "text-fg"}>{value}</span>
  );
}

function InquiryForm({ type }: { type: InquiryInput["type"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const prefix = type === "pre-order" ? "preorder" : "contact";
  const isPreOrder = type === "pre-order";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const data = new FormData(form);
    try {
      const result = await submitInquiry({
        data: {
          type,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          model: String(data.get("model") ?? ""),
          vehicle: String(data.get("vehicle") ?? ""),
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
      setMessage("Thank you. Your enquiry has been sent, and we’ll be in touch.");
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
    "min-h-11 border border-border bg-bg px-3 text-sm tracking-normal text-fg normal-case";

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <label
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-name`}
      >
        Name
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
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
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
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
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
      {isPreOrder && (
        <>
          <label
            className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
            htmlFor={`${prefix}-model`}
          >
            Model
            <select
              id={`${prefix}-model`}
              name="model"
              defaultValue={MODELS[0].name}
              className={inputClass}
            >
              {MODELS.map((model) => (
                <option key={model.name}>{model.name}</option>
              ))}
            </select>
          </label>
          <label
            className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
            htmlFor={`${prefix}-vehicle`}
          >
            Vehicle
            <input
              id={`${prefix}-vehicle`}
              required
              maxLength={120}
              name="vehicle"
              placeholder="Make, model, year"
              className={inputClass}
            />
          </label>
        </>
      )}
      <label
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-message`}
      >
        {isPreOrder ? "Message" : "How can we help?"}{" "}
        <span className="text-muted normal-case">(optional)</span>
        <textarea
          id={`${prefix}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          className="border border-border bg-bg px-3 py-2 text-sm tracking-normal text-fg normal-case"
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
          I understand this is an enquiry about a prototype-stage concept, and agree that my details
          may be used to respond to this request. See the{" "}
          <a href="#privacy" className="underline">
            Privacy notice
          </a>
          .
        </span>
      </label>
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
        className="mt-2 min-h-11 w-fit bg-bronze px-6 text-sm tracking-widest text-bg uppercase disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : isPreOrder ? "Send pre-order enquiry" : "Send message"}
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
          className="min-h-11 bg-bronze px-4 text-xs tracking-widest text-bg uppercase"
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
      "SENTINEL-1 is a prototype-stage concept. Product descriptions, specifications, features, pricing and availability are preliminary and subject to change. An enquiry or pre-order enquiry is not an accepted order, contract, or confirmation of availability. No payment is collected through this website. Do not rely on concept descriptions as evidence of safety certification or road approval.",
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
  const [open, setOpen] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);

  return (
    <main className="bg-bg text-fg">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-bronze/40 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-9 w-auto" />
            <span className="font-word text-lg tracking-widest text-bronze sm:text-xl">
              SENTINEL-1
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-xs tracking-widest text-fg/80 uppercase lg:flex">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors duration-200 hover:text-fg">
                {label}
              </a>
            ))}
            <a
              href="#preorder"
              className="inline-flex min-h-11 items-center bg-bronze px-4 text-bg"
            >
              Pre-order
            </a>
          </nav>
          <button
            type="button"
            className="min-h-11 px-2 text-xs tracking-widest uppercase lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="flex flex-col border-t border-border px-5 py-2 text-sm tracking-widest uppercase lg:hidden"
          >
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="py-3" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a href="#preorder" className="py-3 text-bronze" onClick={() => setOpen(false)}>
              Pre-order
            </a>
          </nav>
        )}
      </header>

      <section id="top" className="relative flex min-h-dvh items-end">
        <img
          src="/img/driveway.jpg"
          alt="A dark sedan parked in a wet suburban driveway at night"
          className="photo-clarity absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg/75 via-bg/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pb-20">
          <p className="text-xs tracking-widest text-bronze uppercase">
            Independent mechanical vehicle security
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-6xl leading-none font-medium tracking-tight sm:text-8xl">
            Take control before they take your car.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-fg/90">
            The first physically independent security layer built for a world where electronic theft
            wins — and tracking only tells you what you’ve already lost.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#preorder"
              className="inline-flex min-h-11 items-center bg-bronze px-6 text-sm tracking-widest text-bg uppercase"
            >
              Pre-order today
            </a>
            <a
              href="#problem"
              className="inline-flex min-h-11 items-center border border-fg/40 px-6 text-sm tracking-widest uppercase"
            >
              The problem
            </a>
          </div>
        </div>
      </section>

      <section id="problem" className="scroll-mt-20 bg-photo-surface text-photo-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs tracking-widest text-sage uppercase">The problem</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Car theft has moved from your driveway to your living room — without anyone breaking a
              window.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-photo-muted">
              <p>Today, thieves don’t need your keys. They don’t need to hot-wire anything.</p>
              <p>
                With a relay device, a signal booster, or a laptop plugged into your OBD port, they
                can unlock and drive away your vehicle from your own driveway while you sleep
                inside. And when it’s gone, GPS tracking only tells you where it was taken — it
                never stopped it from leaving.
              </p>
              <p>
                The theft isn’t the only cost. Insurance premiums are climbing because electronic
                theft is so easy. Even if you leave your keys in the car — or never take them out of
                the house — you no longer have control over who drives it away. And when a vehicle
                is taken from a home, other crimes often follow.
              </p>
            </div>
          </div>
          <img
            src="/img/relay.jpg"
            alt="A key fob beside a small electronic relay device on a car seat"
            className="photo-clarity h-full max-h-96 w-full object-cover outline outline-1 -outline-offset-1 outline-photo-border"
          />
        </div>
      </section>

      <section className="relative min-h-[70vh]">
        <img
          src="/img/empty.jpg"
          alt="An empty driveway at dawn, with tyre marks where a car used to be"
          className="photo-clarity absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/20" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-end px-5 py-20 sm:px-8">
          <h2 className="font-display text-5xl leading-none sm:text-7xl">
            We built security for the age of electronic attacks.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-7">
            Not another app. Not another tracker. A physical layer that exists outside your
            vehicle’s electronics entirely.
          </p>
        </div>
      </section>

      <section id="solution" className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <figure>
            <img
              id="unitImage"
              src="/img/unit.jpg"
              alt="Concept image of the SENTINEL-1 mechanical security enclosure"
              className="photo-clarity w-full object-cover outline outline-1 -outline-offset-1 outline-border"
            />
            <figcaption className="mt-3 text-xs tracking-widest text-muted uppercase">
              Concept image — prototype performance has not been validated.
            </figcaption>
          </figure>
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">The solution concept</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              A physical layer, separate from vehicle electronics.
            </h2>
            <p className="mt-6 text-base leading-7 text-fg/85">
              SENTINEL-1 is being developed as a concealed, independently powered mechanical
              security concept. Vehicle-specific interfaces and safe operating behavior still
              require independent engineering review and controlled testing.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
              <li>Vehicle-specific interface concepts rather than a universal-fit claim.</li>
              <li>Mechanical release and service access are part of the design brief.</li>
              <li>No public-road installation or testing is authorized at this stage.</li>
            </ul>
            <a
              href="#safety"
              className="mt-8 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
            >
              Review the safety gates
            </a>
          </div>
        </div>
      </section>

      <section className="bg-photo-surface text-photo-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs tracking-widest text-sage uppercase">
              What SENTINEL-1 is designed to do
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Stops unauthorised vehicle movement before it starts.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-photo-muted">
              <p>
                It makes your vehicle substantially harder to drive away — even if your factory
                alarm, immobiliser, and keyless entry are defeated. It works outside your vehicle’s
                electronics, so it cannot be bypassed by the same attacks that defeat modern
                security.
              </p>
              <p>
                It does not replace your existing security. It adds a physical layer that thieves
                cannot see, reach, or disable with common electronic tools.
              </p>
            </div>
          </div>
          <figure>
            <img
              src="/img/relay-attack.jpg"
              alt="A person at a car door at night using a small electronic relay device"
              className="photo-clarity w-full object-cover outline outline-1 -outline-offset-1 outline-photo-border"
            />
            <figcaption className="mt-3 text-xs tracking-widest text-photo-bronze uppercase">
              Relay at the door. No window broken.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="difference" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="bg-photo-surface text-photo-ink">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
            <img
              src="/img/unit-bench.jpg"
              alt="SENTINEL-1 machined enclosure with mechanical linkage on a workbench"
              className="photo-clarity w-full object-cover outline outline-1 -outline-offset-1 outline-photo-border"
            />
            <div>
              <p className="text-xs tracking-widest text-sage uppercase">What makes it different</p>
              <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
                Tracking tells you where your car went.
              </h2>
              <p className="mt-6 text-lg leading-7 text-photo-muted">
                SENTINEL-1 is a prototype-stage concept for a separate mechanical security layer.
              </p>
              <p className="mt-4 text-base leading-7 text-photo-muted">
                Most vehicle security products live inside the same electronic network thieves are
                already defeating. SENTINEL-1 does not. It is not an alarm that can be silenced. It
                is not an immobiliser that can be bypassed with the right software. It is a separate
                physical layer — designed to be where thieves aren’t looking, doing what electronic
                systems cannot.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-fg/20 text-xs tracking-widest text-bronze uppercase">
                  <th className="py-3 pr-4 font-medium" />
                  <th className="px-3 py-3 font-medium">GPS tracker</th>
                  <th className="px-3 py-3 font-medium">Factory alarm</th>
                  <th className="px-3 py-3 font-medium">Immobiliser</th>
                  <th className="px-3 py-3 font-medium text-bronze">SENTINEL-1</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.feature} className="border-b border-fg/10">
                    <th className="py-4 pr-4 text-left font-medium">{row.feature}</th>
                    <td className="px-3 py-4 text-muted">{row.gps}</td>
                    <td className="px-3 py-4 text-muted">{row.alarm}</td>
                    <td className="px-3 py-4 text-muted">{row.immobiliser}</td>
                    <td className="px-3 py-4 text-bronze">{row.sentinel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-border border-y border-border lg:hidden">
            {COMPARE.map((row) => (
              <li key={row.feature} className="py-5">
                <p className="font-medium">{row.feature}</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {COLS.map(([label, key]) => (
                    <div key={key}>
                      <dt className="text-xs tracking-widest text-muted uppercase">{label}</dt>
                      <dd className="mt-1">
                        <Mark value={row[key]} emphasis={key === "sentinel"} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="models" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <p className="text-xs tracking-widest text-bronze uppercase">Models</p>
        <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Choose the layer.</h2>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {MODELS.map((model, i) => (
            <article key={model.name} className="bg-bg p-8">
              <p className="text-xs tracking-widest text-muted">0{i + 1}</p>
              <h3 className="mt-4 font-display text-4xl">{model.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">{model.body}</p>
            </article>
          ))}
        </div>

        <h3 className="mt-16 font-display text-3xl">Options</h3>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {OPTIONS.map(([name, body]) => (
            <li key={name} className="grid gap-2 py-5 sm:grid-cols-[16rem_1fr] sm:items-baseline">
              <p className="font-medium">{name}</p>
              <p className="text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative min-h-[68vh]">
        <img
          src="/img/fleet.jpg"
          alt="A sedan, pickup, and van parked outside an industrial building at dusk"
          className="photo-clarity absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg/60 via-bg/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">What it fits</p>
          <h2 className="mt-3 max-w-xl font-display text-5xl leading-none sm:text-6xl">
            One architecture. A kit for each vehicle.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            SENTINEL-1 is designed for global application across vehicle classes via
            vehicle-specific adapter kits.
          </p>
          <ul className="mt-6 max-w-md space-y-3 text-sm leading-6">
            <li>All passenger vehicles — sedans, coupes, hatchbacks, wagons</li>
            <li>Light commercial — SUVs, pickup trucks, utes, vans</li>
            <li>
              Fleet and specialist — commercial vehicles, emergency services, construction,
              agricultural equipment
            </li>
          </ul>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            Not a universal-fit system. Each application uses a vehicle-specific interface kit
            engineered for that make and model. Register your vehicle to confirm availability for
            your platform.
          </p>
          <a
            href="#preorder"
            className="mt-8 inline-flex min-h-11 w-fit items-center border border-fg/40 px-6 text-sm tracking-widest uppercase"
          >
            Register your vehicle
          </a>
        </div>
      </section>

      <section id="insurance" className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">Insurance &amp; risk</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Designed with risk in mind. Recognition is not guaranteed.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>
              Vehicle security requirements and insurance decisions vary by provider, vehicle, and
              jurisdiction. SENTINEL-1 is at concept stage and has no independent safety validation,
              certification, or insurer recognition.
            </p>
            <p>
              We are seeking insurance and actuarial partners to assess the risk profile and any
              future evidence requirements. No premium reduction or coverage outcome is promised.
              Ask your insurer directly before relying on any security device for a policy decision.
            </p>
          </div>
        </div>
      </section>

      <section id="safety" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Safety requirements</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Safety approval comes before vehicle testing.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            The following are proposed requirements for independent review, not verified safety
            capabilities or certification claims.
          </p>
          <ul className="mt-10 grid gap-px bg-border md:grid-cols-2">
            {[
              [
                "No engagement in motion",
                "A future system must be independently verified not to apply a restraint while a vehicle is moving.",
              ],
              [
                "No remote moving-vehicle control",
                "Remote commands must not actuate a mechanical restraint on a moving vehicle.",
              ],
              [
                "Power-loss behavior",
                "Mechanical state and recovery behavior must be analyzed and validated under fault conditions.",
              ],
              [
                "Independent review",
                "An automotive functional-safety authority must assess the safety case before vehicle interface testing.",
              ],
              [
                "Controlled test programme",
                "Initial tests belong on guarded fixtures and closed, authorized test sites only.",
              ],
              [
                "No public-road deployment",
                "No road use or fleet pilot is authorized while the project remains at concept stage.",
              ],
            ].map(([title, body]) => (
              <li key={title} className="bg-bg p-6 sm:p-8">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="operate" className="scroll-mt-20 bg-photo-surface text-photo-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-widest text-sage uppercase">How to operate</p>
            <img
              src="/img/secure.jpg"
              alt="A driver walking away from a parked car toward a lit front door at night"
              className="photo-clarity mt-6 mb-8 w-full object-cover outline outline-1 -outline-offset-1 outline-photo-border"
            />
            <p className="text-xs tracking-widest text-photo-bronze uppercase">
              Mode 1 — Parked-state design goal
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none">Under validation.</h2>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-photo-muted">
              {PARKED.map((step, i) => (
                <li key={step}>
                  <span className="mr-2 text-sage">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:pt-16">
            <p className="text-xs tracking-widest text-photo-bronze uppercase">
              Future response concepts
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none">Safety first.</h2>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-photo-muted">
              {NEXT_STOP.map((step, i) => (
                <li key={step}>
                  <span className="mr-2 text-sage">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-8 border-l-2 border-sage pl-4 text-base leading-7 text-photo-muted">
              These are development concepts only. Do not install or rely on a restraint system
              unless it has been independently validated and approved for the specific vehicle.
            </p>
          </div>
        </div>
      </section>

      <section id="installation" className="border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Development journey</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Three gates before any installation.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            This is a proposed development pathway, not an installation offer. No customer or
            public-road fitting is available at this stage.
          </p>
          <ol className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {[
              [
                "01",
                "Independent safety review",
                "Review the concept and safety case before any vehicle interface is designed.",
              ],
              [
                "02",
                "Guarded bench validation",
                "Test a demonstrator in a controlled fixture with documented test procedures.",
              ],
              [
                "03",
                "Vehicle-specific assessment",
                "Only after written approval, evaluate a validated interface in an authorized controlled programme.",
              ],
            ].map(([number, title, body]) => (
              <li key={number} className="bg-surface p-6 sm:p-8">
                <span className="font-display text-3xl text-bronze">{number}</span>
                <h3 className="mt-4 font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Design goals</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Physical security, designed to work independently.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            The following describe the concept's intended direction. They are not validated
            capabilities, security guarantees, or certified product features.
          </p>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(([title, body]) => (
              <li key={title}>
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="specs" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Specifications</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
            Initial design targets.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            The following are preliminary concept values supplied for evaluation. They are not
            verified product specifications, test results, safety certifications, or guarantees.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-fg/20 text-xs tracking-widest text-bronze uppercase">
                  <th scope="col" className="py-3 pr-5 font-medium">
                    Parameter
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Preliminary design target
                  </th>
                </tr>
              </thead>
              <tbody>
                {SPECIFICATIONS.map(([parameter, value]) => (
                  <tr key={parameter} className="border-b border-border">
                    <th scope="row" className="py-4 pr-5 text-left font-medium">
                      {parameter}
                    </th>
                    <td className="px-3 py-4 leading-6 text-muted">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2"
      >
        <div>
          <p className="text-xs tracking-widest text-bronze uppercase">Pricing</p>
          <h2 className="mt-3 font-display text-6xl leading-none text-bronze sm:text-7xl">
            From $795
          </h2>
          <p className="mt-4 text-lg text-muted">plus fitting.</p>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            The current planning indication is from $795 plus fitting. This is not a live offer or
            confirmed product price; no payments or orders are being accepted. Final pricing will
            depend on validation, the vehicle-specific interface, and fitting.
          </p>
          <h3 className="mt-10 font-display text-3xl">Warranty</h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-fg/80">
            A proposed launch warranty is 5 years, with a 6-month replacement period for unit
            failure. These draft terms are not active while the project remains a prototype; final
            coverage would be published before any sale.
          </p>
        </div>
        <div id="preorder" className="scroll-mt-24 bg-surface p-6 sm:p-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Register interest</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Prototype-stage enquiry.</h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            This form records an enquiry only. It does not reserve a unit, create an order, or take
            payment. Availability depends on independent safety review and future validation.
          </p>
          <InquiryForm type="pre-order" />
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">Contact</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Start a conversation.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
              Ask a question about the concept, development programme, or a potential partnership.
              Enquiries are sent by email through the configured Vercel deployment.
            </p>
            <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs tracking-widest text-bronze uppercase">Project lead</dt>
                <dd className="mt-1">Brayden Mark Walls</dd>
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
                <dt className="text-xs tracking-widest text-bronze uppercase">Organisation</dt>
                <dd className="mt-1">ADVERSIQ Intelligence</dd>
              </div>
            </dl>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 border border-sage px-5 text-xs tracking-widest text-fg uppercase transition-colors hover:bg-sage/15"
            >
              Message us on WhatsApp
            </a>
            <div className="mt-12">
              <h3 className="font-display text-3xl">Frequently asked questions</h3>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {FAQS.map(([question, answer]) => (
                  <details key={question} className="group">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-medium">
                      {question}
                      <span className="text-bronze group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="pb-4 text-sm leading-6 text-muted">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-bg p-6 sm:p-8">
            <h3 className="font-display text-3xl">Send an enquiry</h3>
            <InquiryForm type="contact" />
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">
            Partnership and development
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            We’re seeking partners.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-fg/85">
            PROJECT SENTINEL-1 is currently at prototype stage — architectural design and
            engineering diligence are complete, but the unit has not yet been tested in real-world
            conditions.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            We are actively seeking partners to help bring SENTINEL-1 from prototype to production.
          </p>
          <ul className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {PARTNERS.map(([title, body]) => (
              <li key={title} className="bg-surface p-6 sm:p-8">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 max-w-3xl border-l-2 border-bronze pl-5">
            <p className="text-sm tracking-widest text-bronze uppercase">Important</p>
            <p className="mt-3 text-base leading-7">
              SENTINEL-1 is a prototype concept only. No public-road testing or fleet deployment
              will occur without written independent safety authorization. Progression through our
              development programme is gated — each stage requires documented evidence and
              independent approval.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              If your organisation can provide technical expertise, test access, manufacturing
              capability, fleet vehicles for pilot evaluation, or funding pathways, we welcome a
              technical discovery discussion.
            </p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 partnership discovery")}`}
              className="mt-6 inline-flex min-h-11 items-center bg-bronze px-6 text-sm tracking-widest text-bg uppercase"
            >
              Start a discussion
            </a>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-border">
        <img
          src="/img/world-map.jpg"
          alt=""
          className="photo-clarity absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/25" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2">
          <div>
            <p className="font-word text-3xl tracking-widest text-bronze">SENTINEL-1</p>
            <p className="mt-3 text-sm text-fg/80">Project lead: Brayden Mark Walls</p>
            <p className="text-sm text-fg/80">PROJECT SENTINEL-1</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-muted">
              Melbourne, Australia and the Philippines — one project, two bases.
            </p>
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
              <dt className="text-xs tracking-widest text-bronze uppercase">Locations</dt>
              <dd className="mt-1">Melbourne, Australia / Philippines</dd>
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
        <p className="relative mx-auto max-w-7xl px-5 pb-10 text-xs leading-5 text-muted sm:px-8">
          Confidential and concept-stage. This material is provided for preliminary evaluation only.
          No prototype performance, certification, or commercial offering is implied. © 2026 PROJECT
          SENTINEL-1. All rights reserved.
        </p>
        <nav
          aria-label="Legal information"
          className="relative mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 pb-8 text-xs tracking-widest uppercase sm:px-8"
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
