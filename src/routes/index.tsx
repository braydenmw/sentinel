import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useState, type FormEvent } from "react";
import { submitInquiry, type InquiryInput } from "@/lib/inquiry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        name: "description",
        content:
          "Discover SENTINEL-1, a mechanical vehicle-security concept in development. Register a vehicle expression of interest or explore engineering and validation partnerships.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        property: "og:description",
        content:
          "A physical security layer for a connected vehicle world. Explore the SENTINEL-1 development programme and its vehicle-specific pathways.",
      },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        name: "twitter:description",
        content: "A physical security layer for a connected vehicle world.",
      },
      { name: "twitter:image", content: "/og.jpg" },
    ],
  }),
  component: Home,
});

const NAV = [
  ["The opportunity", "#problem"],
  ["The concept", "#features"],
  ["Family", "#models"],
  ["Applications", "#applications"],
  ["Development", "#development"],
  ["Safety", "#safety"],
  ["Partners", "#partners"],
  ["Register interest", "#reserve"],
  ["Contact", "#contact"],
] as const;

const MODELS = [
  {
    name: "SENTINEL-1 Vehicle",
    body: "The first product pathway: a mechanical security concept for passenger vehicles, with an interface engineered for each vehicle rather than a universal-fit promise.",
  },
  {
    name: "SENTINEL-1 Next-Stop",
    body: "A future option exploring a controlled response after a verified theft event. Any concept would act only after the vehicle has stopped; it is not a current capability.",
  },
  {
    name: "SENTINEL-1 Fleet",
    body: "A pathway for operators who want to help define vehicle priorities, operating needs and the evidence required before any fleet application could proceed.",
  },
  {
    name: "SENTINEL-1 Defence",
    body: "A separate exploratory programme for government and specialist applications, subject to dedicated engineering, safety and government evaluation.",
  },
  {
    name: "SENTINEL-1 HGV",
    body: "A distinct heavy-vehicle concept exploring a dedicated auxiliary air supply, fully separate from shared service- and parking-brake circuits. Specialist design and safe-failure review come first.",
  },
];

const BENEFITS = [
  [
    "A separate power concept",
    "Explores a dedicated power architecture alongside—not dependent on—the vehicle’s normal security electronics.",
  ],
  [
    "A physical layer",
    "The idea is to explore mechanical restraint as a complement to alarms, immobilisers and tracking—not a replacement.",
  ],
  [
    "Engineered for the vehicle",
    "Each vehicle platform needs its own interface assessment. SENTINEL-1 is not presented as a universal-fit device.",
  ],
  [
    "Recovery considered from day one",
    "Service access, authorised recovery and safe failure behaviour are core engineering questions.",
  ],
  [
    "A clear role for technology",
    "Optional telemetry may support oversight; the core concept is mechanical, not another tracking promise.",
  ],
];

const PARTNERS = [
  [
    "Engineering & safety",
    "Help challenge the concept, define vehicle interfaces and build an independent safety and verification plan.",
  ],
  [
    "Prototype testing",
    "Work with us on a controlled bench demonstrator and the test evidence needed before any vehicle integration.",
  ],
  [
    "Vehicle & fleet collaborators",
    "Share vehicle priorities, use cases and operating constraints to help guide which interfaces should be assessed first.",
  ],
  [
    "Manufacturing & strategic partners",
    "Bring design-for-manufacture, supply-chain or commercial expertise into the programme at the right development stage.",
  ],
];

const FAQS = [
  [
    "Can I buy or pre-order a unit now?",
    "No. Production units have not been built and SENTINEL-1 is not available to purchase. You can register a non-binding expression of interest; it does not place an order, secure a unit or collect payment.",
  ],
  [
    "What does the $795 + fitting price mean?",
    "It is an indicative target production price for the base commercial unit only—not a current offer or confirmed price. Final pricing depends on engineering and production approval.",
  ],
  [
    "What happens after I register?",
    "Your details help us understand vehicle interest and the mix of applications people want. We can review your enquiry, but registration does not guarantee compatibility, availability or a production place.",
  ],
  [
    "When will it be available?",
    "There is no confirmed launch date. A product can only be considered after the required engineering, safety, vehicle-interface and production validation.",
  ],
  [
    "Is the vehicle compatibility known?",
    "Not yet. Each make, model, year and variant needs a separate engineering assessment; no universal fit or approved installation is claimed.",
  ],
  [
    "Can my organisation become a development partner?",
    "Yes. We welcome relevant engineering, functional-safety, test-facility, fleet and manufacturing enquiries through the form below.",
  ],
  [
    "Is Next-Stop part of the first product?",
    "No. It is a separate future concept and has not been validated. Any future response would require the vehicle to be fully stopped and independent automotive safety approval.",
  ],
];

const PARKED = [
  "The first use case: a mechanical restraint concept for a parked, secured vehicle.",
  "Vehicle-specific interfaces and engagement logic must be engineered and verified.",
  "Recovery, power-loss and safe-failure behaviour must be proven before any installation.",
];

const NEXT_STOP = [
  "A separate future concept—not part of an available product.",
  "Explores preventing a restart only after a verified theft event and complete stop.",
  "No restraint may engage while a vehicle is moving; independent safety validation is essential.",
];

const EMAIL = "brayden@adversiq.xyz";
const WHATSAPP = "639608354283";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello, I’d like to learn more about SENTINEL-1.")}`;

function openShare(kind: "facebook" | "x" | "linkedin" | "whatsapp") {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "SENTINEL-1 — an independent mechanical vehicle-security concept for a connected world.",
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

function InquiryForm() {
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
    const isVehicleInterest = model === "SENTINEL-1 Vehicle";
    const type: InquiryInput["type"] = "contact";
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
      setMessage(
        isVehicleInterest
          ? "Thanks for registering your interest. This is not an order or reservation; we’ll review your vehicle details and be in touch."
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
      <label
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-model`}
      >
        I’m interested in / enquiring about
        <select
          id={`${prefix}-model`}
          name="model"
          defaultValue={MODELS[0].name}
          className={inputClass}
        >
          {MODELS.map((model) => (
            <option key={model.name}>{model.name}</option>
          ))}
          <option>Engineering / safety-validation partnership</option>
          <option>Testing / validation facility partnership</option>
          <option>Vehicle / fleet development partnership</option>
          <option>Manufacturing / strategic partnership</option>
        </select>
      </label>
      <label
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-vehicle`}
      >
        Vehicle / organisation <span className="text-muted normal-case">(optional)</span>
        <input
          id={`${prefix}-vehicle`}
          maxLength={120}
          name="vehicle"
          placeholder="Make, model, year, fleet or organisation"
          className={inputClass}
        />
      </label>
      <label
        className="grid gap-2 text-xs tracking-widest text-bronze uppercase"
        htmlFor={`${prefix}-message`}
      >
        Variant, intended use, preferred configuration or enquiry details{" "}
        <span className="text-muted normal-case">(optional)</span>
        <textarea
          id={`${prefix}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Share any details you would like us to consider."
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
          I understand this is an enquiry about a development-stage concept, and agree that my
          details may be used to respond to this request. See the{" "}
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
        {status === "sending" ? "Sending…" : "Send my enquiry"}
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
      "SENTINEL-1 is under development. Product descriptions, specifications, features, pricing and availability are preliminary and subject to change. An enquiry or registration of interest is not an accepted order, contract, or confirmation of availability. No payment is collected through this website. Do not rely on concept descriptions as evidence of safety certification or road approval.",
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
          <nav className="hidden items-center gap-6 text-xs tracking-widest text-fg/80 uppercase xl:flex">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={
                  href === "#reserve"
                    ? "inline-flex min-h-11 items-center bg-bronze px-4 text-bg"
                    : "transition-colors duration-200 hover:text-fg"
                }
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="min-h-11 px-2 text-xs tracking-widest uppercase xl:hidden"
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
            className="flex flex-col border-t border-border px-5 py-2 text-sm tracking-widest uppercase xl:hidden"
          >
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="py-3" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="relative flex min-h-dvh items-end">
        <img
          src="/img/driveway.jpg"
          alt="A dark sedan parked in a wet suburban driveway at night"
          className="hero-photo absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg/85 via-bg/55 to-bg/15" />
        <div className="absolute inset-0 bg-linear-to-l from-bg/80 via-bg/45 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pb-20 md:text-right">
          <h1 className="mt-4 ml-auto max-w-4xl font-display text-6xl leading-none font-medium tracking-tight sm:text-8xl">
            A new layer for vehicle <span className="text-bronze">security.</span>
          </h1>
          <p className="mt-6 ml-auto max-w-xl text-lg leading-7 text-fg/90">
            SENTINEL-1 explores an independently powered mechanical restraint to complement the
            alarms, immobilisers and tracking drivers already rely on.
          </p>
          <p className="mt-5 ml-auto font-display text-2xl text-bronze">
            The vehicle itself, part of the defence.
          </p>
        </div>
      </section>

      <section id="problem" className="scroll-mt-20 bg-photo-surface text-photo-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-kicker text-xs tracking-widest text-sage uppercase">
              The opportunity
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Alerts tell you. A physical layer could do more.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-photo-muted">
              <p>
                Alarms alert. Trackers locate. SENTINEL-1 asks a different question: could a
                vehicle have an independent mechanical layer as well?
              </p>
              <p>
                The concept is designed to complement—not replace—a vehicle’s existing security.
                Its aim is a vehicle-specific mechanical restraint, developed separately from the
                vehicle’s conventional electronic architecture.
              </p>
            </div>
          </div>
          <img
            src="/img/relay.jpg"
            alt="A key fob beside a small electronic relay device on a car seat"
            className="photo-clarity photo-angle-right h-full max-h-96 w-full object-cover outline outline-1 -outline-offset-1 outline-photo-border"
          />
        </div>
      </section>

      <section className="relative min-h-[70vh]">
        <img
          src="/img/empty.jpg"
          alt="An empty driveway at dawn, with tyre marks where a car used to be"
          className="photo-clarity absolute inset-0 h-full w-full object-cover object-[56%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg/85 via-bg/55 to-bg/20" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-end px-5 py-20 sm:px-8">
          <h2 className="font-display text-5xl leading-none sm:text-7xl">
            More than a notification.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-7">
            For an owner, a fleet or a business, a stolen vehicle means lost time as well as lost
            property. SENTINEL-1 is exploring whether mechanical restraint can add another layer to
            the security conversation.
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
              className="photo-clarity photo-angle-left w-full object-cover outline outline-1 -outline-offset-1 outline-border"
            />
            <figcaption className="mt-3 text-xs tracking-widest text-muted uppercase">
              Early concept image — no production unit or vehicle installation is available.
            </figcaption>
          </figure>
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              The security core
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              One security core. A fit engineered for each vehicle.
            </h2>
            <p className="mt-6 text-base leading-7 text-fg/85">
              The ambition is simple: develop a compact mechanical security core, then engineer the
              right interface for each vehicle. That vehicle-specific approach is intended to keep
              SENTINEL-1 separate from the vehicle’s conventional electronic security systems.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
              <li>One core concept, with a tailored interface for each approved vehicle platform.</li>
              <li>Independent power, service access and authorised recovery are design priorities.</li>
              <li>Bench testing and safety evidence must come before any vehicle installation.</li>
            </ul>
            <a
              href="#safety"
              className="mt-8 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
            >
              See what must be proven
            </a>
          </div>
        </div>
      </section>

      <section className="bg-photo-surface text-photo-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-kicker text-xs tracking-widest text-sage uppercase">
              Two development pathways
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Start with parked security. Explore what comes next.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-photo-muted">
              <p>
                <strong>01 — Parked security.</strong> The first pathway explores a mechanical
                restraint for a parked, secured vehicle—adding a physical design layer alongside
                its existing electronic protection.
              </p>
              <p>
                <strong>02 — Next-Stop.</strong> A future, separate concept could explore
                preventing a restart after a verified theft event and a complete stop. No
                mechanism may engage while a vehicle is moving; this pathway needs independent
                automotive safety validation.
              </p>
              <p className="border-l-2 border-photo-bronze pl-4">
                Neither pathway is a validated product feature. No moving-vehicle or public-road
                testing is authorised.
              </p>
            </div>
          </div>
          <figure>
            <img
              src="/img/relay-attack.jpg"
              alt="A person at a car door at night using a small electronic relay device"
              className="photo-clarity photo-angle-right w-full object-cover object-[58%_center] outline outline-1 -outline-offset-1 outline-photo-border"
            />
            <figcaption className="mt-3 text-xs tracking-widest text-photo-bronze uppercase">
              Illustrative security scenario. No SENTINEL-1 performance claim.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="difference" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              Why SENTINEL-1?
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              A different layer. A clear purpose.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-muted">
            <p>
              A security concept is only valuable if it fits the way a vehicle is actually used.
            </p>
            <p>
              That is why the first questions are practical: which vehicles should be prioritised,
              how should service and recovery work, and what evidence would make a physical layer
              worth trusting?
            </p>
            <p className="font-display text-2xl tracking-wide text-bronze">
              The right questions come before the first installation.
            </p>
            <p className="text-sm">
              Vehicle owners, fleet operators and technical partners can help shape those
              priorities now.
            </p>
          </div>
        </div>
      </section>

      <section id="models" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
          The SENTINEL-1 family
        </p>
        <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
          Different vehicles. A tailored development path.
        </h2>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {MODELS.map((model, i) => (
            <Fragment key={model.name}>
              <article className="bg-bg p-8">
                <p className="text-xs tracking-widest text-muted">0{i + 1}</p>
                <h3 className="mt-4 font-display text-4xl">{model.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-muted">{model.body}</p>
                {model.name === "SENTINEL-1 Vehicle" && (
                  <>
                    <p className="mt-4 text-sm text-bronze">
                      Indicative target: $795 + fitting
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      Indicative target for the base commercial unit only; not an offer or confirmed
                      price.
                    </p>
                  </>
                )}
                {model.name === "SENTINEL-1 Next-Stop" && (
                  <p className="mt-4 text-sm text-bronze">Next-Stop configuration: POA</p>
                )}
                {model.name === "SENTINEL-1 Defence" && (
                  <p className="mt-4 text-sm text-bronze">Military and government pricing: POA</p>
                )}
                {model.name === "SENTINEL-1 HGV" && (
                  <p className="mt-4 text-sm text-bronze">Truck / HGV pricing: POA</p>
                )}
              </article>
              {model.name === "SENTINEL-1 HGV" && (
                <figure
                  key="hgv-unit-photo"
                  className="min-h-full overflow-hidden border border-border bg-surface"
                >
                  <img
                    src="/img/unit-bench.jpg"
                    alt="Illustrative rendering of a possible SENTINEL-1 enclosure on a workshop bench; no physical unit has been built"
                    className="h-full min-h-64 w-full object-cover"
                    loading="lazy"
                  />
                      <figcaption className="px-4 py-3 text-xs leading-5 text-muted">
                        Illustrative concept rendering—not a built or tested unit.
                      </figcaption>
                </figure>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section id="fleet" className="relative min-h-[68vh] scroll-mt-20">
        <img
          src="/img/fleet-operations.jpeg"
          alt="A range of fleet vehicles including cars, vans, a truck, bus, heavy equipment and agricultural machinery at dusk"
          className="photo-clarity absolute inset-0 h-full w-full object-cover object-[center_54%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg/75 via-bg/50 to-bg/20" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8">
          <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
            For fleet operators
          </p>
          <h2 className="mt-3 max-w-xl font-display text-5xl leading-none sm:text-6xl">
            Explore applications beyond passenger cars.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            SENTINEL-1 is being explored as a vehicle-security concept for a wider range of vehicles
            and fleets. Register interest and share the vehicle types, operating conditions and
            requirements that should guide future assessment.
          </p>
          <ul className="mt-6 max-w-md space-y-3 text-sm leading-6">
            <li>Passenger, rental and commercial vehicle fleets</li>
            <li>Pickups, utes, vans, trucks and heavy goods vehicles</li>
            <li>Specialist, high-value transport and other operational vehicles</li>
            <li>Government and security-sensitive fleets</li>
          </ul>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            No fleet-ready product or installation is currently available, and fleet deployment is
            not authorised. Each vehicle platform requires its own engineering and safety
            assessment; no universal-fit compatibility or validated fleet installation is claimed.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 fleet programme enquiry")}`}
            className="mt-8 inline-flex min-h-11 w-fit items-center border border-fg/40 px-6 text-sm tracking-widest uppercase"
          >
            Register fleet interest
          </a>
        </div>
      </section>

      <section id="applications" className="scroll-mt-20">
        <div className="relative isolate min-h-[70vh] overflow-hidden">
          <img
            src="/img/military-application.png"
            alt="Illustrative military scene at sunset with a service member, military vehicle and helicopter"
            className="photo-clarity absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-bg/90 via-bg/45 to-bg/10 lg:bg-linear-to-l lg:from-bg/90 lg:via-bg/60 lg:to-bg/10" />
          <div className="mx-auto flex min-h-[70vh] max-w-7xl items-end px-5 py-16 sm:px-8 lg:items-center lg:py-24">
            <div id="defence" className="max-w-2xl scroll-mt-24 lg:ml-auto lg:text-right">
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Government & specialist applications
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
                A dedicated military pathway.
              </h2>
              <p className="mt-5 text-base leading-7 text-fg/90">
                We are open to controlled discussions with government and defence organisations
                about specialist vehicle needs and what a separate evaluation pathway would
                require.
              </p>
              <p className="mt-6 font-display text-3xl text-bronze">Military unit pricing: POA</p>
              <p className="mt-3 text-sm leading-6 text-fg/80">
                This is an exploratory concept, not a fielded or certified defence product. Any
                application requires its own engineering, safety and government review.
              </p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 military application enquiry")}`}
                className="mt-7 inline-flex min-h-11 items-center border border-fg/50 bg-bg/30 px-5 text-sm tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
              >
                Discuss a military application
              </a>
            </div>
          </div>
        </div>
        <p className="photo-caption mx-auto max-w-7xl px-5 py-3 pl-4 text-xs leading-5 text-muted sm:px-8">
          Illustrative AI-generated image; SENTINEL-1 is not installed on the depicted vehicle.
        </p>
      </section>

      <section id="safety" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="section-kicker text-xs tracking-widest text-bronze uppercase">Safety</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Safety is a gate, not a footnote.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            Any future installation must pass independent engineering and safety assessment before
            operational use. The checks below are development requirements—not completed tests.
          </p>
          <ul className="mt-10 grid gap-px bg-border md:grid-cols-2">
            {[
              [
                "Unintended engagement",
                "Engagement logic and parked-state determination require independent safety verification.",
              ],
              [
                "Mechanical failure and loads",
                "Mechanical failure modes, interface loads and vehicle-specific interactions require assessment.",
              ],
              [
                "Steering and parking-brake interaction",
                "Any proposed interfaces require engineering review to avoid compromising vehicle control or safe parking.",
              ],
              [
                "Power loss and recovery",
                "Fault behaviour, authorised recovery, service access and emergency procedures must be assessed.",
              ],
              [
                "Controlled test programme",
                "Bench and vehicle tests require documented controls and the appropriate independent authorisation.",
              ],
              [
                "No public-road deployment",
                "No moving-vehicle testing or public-road deployment is authorised before the required independent safety gates are satisfied.",
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
            <p className="section-kicker text-xs tracking-widest text-sage uppercase">
              01 — Parked security
            </p>
            <img
              src="/img/secure.jpg"
              alt="A driver walking away from a parked car toward a lit front door at night"
              className="photo-clarity photo-angle-left mt-6 mb-8 w-full object-cover object-[center_58%] outline outline-1 -outline-offset-1 outline-photo-border"
            />
            <p className="text-xs tracking-widest text-photo-bronze uppercase">
              Intended mechanical restraint
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none">
              Designed for parked vehicles.
            </h2>
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
            <p className="text-xs tracking-widest text-photo-bronze uppercase">02 — Next-Stop</p>
            <h2 className="mt-3 font-display text-5xl leading-none">
              A new theft-response concept.
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-photo-muted">
              {NEXT_STOP.map((step, i) => (
                <li key={step}>
                  <span className="mr-2 text-sage">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-8 border-l-2 border-sage pl-4 text-base leading-7 text-photo-muted">
              Next-Stop is not available. Any further work requires independent automotive safety
              validation; no moving-vehicle testing or public-road deployment is authorised.
            </p>
          </div>
        </div>
      </section>

      <section id="development" className="scroll-mt-20 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
            From concept to evidence
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            The milestones that turn an idea into a product.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            SENTINEL-1 remains at concept stage. No units have been built, and nothing is available
            to install or buy. These are the planned gates to earn a safe, production-ready design.
          </p>
          <ol className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "01",
                "Define the design",
                "Set the requirements, review the architecture and identify hazards before building.",
              ],
              [
                "02",
                "Build a bench demonstrator",
                "Create the first testable unit for controlled, off-vehicle evaluation.",
              ],
              [
                "03",
                "Prove core functions",
                "Test mechanical operation, failure behaviour, power loss and recovery.",
              ],
              [
                "04",
                "Engineer a vehicle interface",
                "Assess one vehicle platform at a time; no universal fit is assumed.",
              ],
              [
                "05",
                "Complete safety review",
                "Use independent review and controlled test plans before any vehicle testing.",
              ],
              [
                "06",
                "Prepare for production",
                "Confirm design, manufacturing and safety evidence before any production decision.",
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
          <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
            The design principles
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            What the concept must prove.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            These are the questions guiding development—not product features or security
            guarantees.
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

      <section id="partners" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">
            Build the programme with us
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            The right partners can turn this concept into evidence.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            We’re looking for people and organisations who can help define the design, challenge
            the assumptions and establish what it would take to validate SENTINEL-1 responsibly.
          </p>
          <ul className="mt-8 grid gap-px bg-border md:grid-cols-2">
            {PARTNERS.map(([title, body]) => (
              <li key={title} className="bg-bg p-6 sm:p-8">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <a
            href="#programme-form"
            className="mt-7 inline-flex min-h-11 items-center bg-bronze px-6 text-sm tracking-widest text-bg uppercase"
          >
            Explore a partnership
          </a>
        </div>
      </section>

      <section id="reserve" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div id="contact" className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs tracking-widest text-bronze uppercase">
                For early supporters
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
                Help shape what comes next.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
                Tell us which vehicle or application matters to you. Expressions of interest help
                us understand demand and prioritise future engineering work.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-fg/80">
                This is a non-binding expression of interest—not a pre-order or reservation. No
                payment or purchase commitment is taken.
              </p>
              <h3 className="mt-8 font-display text-4xl text-bronze">
                Target production price: $795 + fitting
              </h3>
              <p className="mt-1 text-base text-muted">Base commercial unit only.</p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-fg/80">
                An indicative target only—not a current offer or confirmed price. Next-Stop, fleet,
                military, HGV and government applications are POA and require separate assessment.
              </p>
              <h3 className="mt-8 font-display text-3xl">What happens next</h3>
              <ol className="mt-4 grid gap-3 text-sm leading-6 text-muted sm:grid-cols-2">
                <li>
                  <strong className="text-bronze">01 — Tell us:</strong> Share the vehicle or
                  partnership you have in mind.
                </li>
                <li>
                  <strong className="text-bronze">02 — Understand:</strong> We review the use case
                  and the questions it raises.
                </li>
                <li>
                  <strong className="text-bronze">03 — Develop:</strong> Suitable concepts must
                  pass engineering and safety gates.
                </li>
                <li>
                  <strong className="text-bronze">04 — Decide:</strong> Availability, timing and
                  final pricing follow validation—not before.
                </li>
              </ol>
            </div>
            <div id="programme-form" className="bg-bg p-6 sm:p-8">
              <h3 className="font-display text-3xl">Register interest or start a conversation</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Tell us what matters to you. No payment or purchase commitment is taken.
              </p>
              <InquiryForm />
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <h3 className="font-display text-3xl">Frequently asked questions</h3>
            <div className="mt-4 divide-y divide-border border-y border-border">
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

          <p className="mt-8 border-l-2 border-bronze pl-5 text-sm leading-6 text-muted">
            SENTINEL-1 is under active development. No moving-vehicle testing or public-road
            deployment is authorised until the required independent safety gates are satisfied.
          </p>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-border">
        <img
          src="/img/world-map.jpg"
          alt=""
          className="photo-clarity absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/75" />
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
          SENTINEL-1 is under active development. Product configuration, vehicle compatibility,
          production timing and final pricing remain subject to engineering validation and
          production approval. No certification or operational deployment is claimed. © 2026 PROJECT
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
