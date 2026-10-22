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
          "Discover SENTINEL-1: an independently powered mechanical vehicle-security concept in development, with separate pathways for passenger vehicles, fleets, defence and HGVs.",
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
  ["The idea", "#problem"],
  ["Technology", "#features"],
  ["Family", "#models"],
  ["Applications", "#applications"],
  ["Development", "#development"],
  ["Safety", "#safety"],
  ["Reserve", "#reserve"],
  ["Contact", "#contact"],
] as const;

const MODELS = [
  {
    name: "SENTINEL-1 Vehicle",
    body: "An independent mechanical security concept for passenger vehicles, built around a common core and a vehicle-specific interface. Compatibility and installation require engineering validation.",
  },
  {
    name: "SENTINEL-1 Fleet",
    body: "A development pathway for commercial and fleet operators. Each vehicle application needs its own interface assessment; no fleet deployment is currently authorised.",
  },
  {
    name: "SENTINEL-1 Defence",
    body: "A separate exploratory pathway for military, government and specialist vehicles. It is not a fielded defence product; any variant would need dedicated engineering review and government evaluation.",
  },
  {
    name: "SENTINEL-1 HGV",
    body: "A separate heavy-vehicle development concept exploring an isolated auxiliary pneumatic architecture. It must not connect to shared service- or parking-brake circuits. Design, compatibility and safe failure behaviour remain unvalidated.",
  },
];

const BENEFITS = [
  [
    "Independent power",
    "A dedicated power architecture is part of the design concept; performance and behaviour remain to be validated.",
  ],
  [
    "Mechanical restraint",
    "The intended security function is based on physical restraint, not software alone. No working vehicle installation is validated.",
  ],
  [
    "Vehicle-specific interface",
    "Each application requires an engineered interface for the relevant vehicle rather than a universal-fit installation.",
  ],
  [
    "Local recovery",
    "Authorised mechanical recovery and service access are design requirements that need validation.",
  ],
  [
    "Optional telemetry",
    "GNSS and cellular functions may provide supervisory information; telemetry is not the fundamental mechanical security mechanism.",
  ],
];

const PARTNERS = [
  [
    "Passenger vehicles",
    "Register interest in a vehicle-specific configuration. Compatibility must be assessed before any installation commitment.",
  ],
  [
    "Fleet operators",
    "Discuss a fleet application and its vehicle mix. Each interface requires engineering assessment; no deployment is currently authorised.",
  ],
  [
    "Defence and government",
    "Request a controlled technical discussion about potential applications and a separate development pathway.",
  ],
  [
    "Engineering and manufacturing",
    "Explore technical, testing, manufacturing or development partnerships as the programme progresses through its validation gates.",
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
    "SENTINEL-1 is a development-stage concept. Its tamper resistance and protection against attacks have not been independently tested, so we cannot claim it is undefeatable.",
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
  "The parked-state mode is a design objective, not a validated feature.",
  "Two intended restraint paths are being developed around vehicle-specific steering and parking-brake interfaces.",
  "Engagement logic, vehicle interaction and safe failure behaviour require independent verification.",
  "No vehicle installation is available for owners to use; recovery behaviour must be validated before integration.",
];

const NEXT_STOP = [
  "Next-Stop is an early development concept, not an available feature.",
  "A restraint must not engage while a vehicle is moving.",
  "Any future response concept requires independent automotive safety validation before operational testing.",
  "No moving-vehicle testing or public-road deployment is authorised at this stage.",
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
      setMessage(
        isPreOrder
          ? "Thank you. Your interest has been registered. This is not an order or confirmation of availability; we’ll be in touch."
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
        {isPreOrder ? "Variant, intended use, preferred configuration or message" : "How can we help?"}{" "}
        <span className="text-muted normal-case">(optional)</span>
        <textarea
          id={`${prefix}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={isPreOrder ? "Share any details you would like us to consider." : undefined}
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
          I understand this is an enquiry about a development-stage concept, and agree that my details
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
        {status === "sending"
          ? "Sending…"
          : isPreOrder
            ? "Register my interest"
            : "Send message"}
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
          <nav className="hidden items-center gap-6 text-xs tracking-widest text-fg/80 uppercase lg:flex">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors duration-200 hover:text-fg">
                {label}
              </a>
            ))}
            <a
              href="#reserve"
              className="inline-flex min-h-11 items-center bg-bronze px-4 text-bg"
            >
              Reserve
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
            <a href="#reserve" className="py-3 text-bronze" onClick={() => setOpen(false)}>
              Reserve
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
            When electronic security is defeated, the vehicle still needs a physical defence.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-fg/90">
            Modern vehicles rely increasingly on electronic security. SENTINEL-1 takes a different
            approach: a concealed, independently powered mechanical security concept designed to add
            a physical restraint layer outside the vehicle’s conventional electronic architecture.
          </p>
          <p className="mt-5 text-sm leading-7 text-fg/85">
            Not another tracker. Not another alarm. Not another software immobiliser.
          </p>
          <p className="mt-1 font-display text-2xl text-bronze">
            A different physical layer of vehicle security.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#reserve"
              className="inline-flex min-h-11 items-center bg-bronze px-6 text-sm tracking-widest text-bg uppercase"
            >
              Reserve your SENTINEL-1
            </a>
            <a
              href="#features"
              className="inline-flex min-h-11 items-center border border-fg/40 px-6 text-sm tracking-widest uppercase"
            >
              Explore the technology
            </a>
          </div>
        </div>
      </section>

      <section id="problem" className="scroll-mt-20 bg-photo-surface text-photo-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs tracking-widest text-sage uppercase">The idea</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Protect the vehicle itself.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-photo-muted">
              <p>
                Electronic security can authenticate. Software can immobilise. A tracker can locate.
              </p>
              <p>
                SENTINEL-1 is being developed around a different proposition: physically restricting
                unauthorised vehicle movement through an independent mechanical security
                architecture. The concept combines a common security core with vehicle-specific
                mechanical interfaces, intended to operate separately from the vehicle’s normal
                electronic security environment.
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
            The vehicle itself can be part of the security system.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-7">
            SENTINEL-1 is a development-stage concept, not a validated product. Its intended
            architecture adds a separate physical layer alongside a vehicle’s existing security.
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
            <p className="text-xs tracking-widest text-bronze uppercase">The security core</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              One platform. Vehicle-specific interfaces.
            </h2>
            <p className="mt-6 text-base leading-7 text-fg/85">
              SENTINEL-1 is being developed as a concealed, independently powered mechanical
              security concept designed to sit outside the vehicle’s conventional electronic
              security architecture. The concept remains subject to engineering review and
              controlled validation.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
              <li>A common security core is paired with vehicle-specific mechanical interfaces.</li>
              <li>Local recovery and service access are part of the development requirements.</li>
              <li>No public-road deployment or moving-vehicle testing is authorised at this stage.</li>
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
              Two layers of protection — development concepts
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Parked security and Next-Stop.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-photo-muted">
              <p>
                <strong>01 — Parked security.</strong> When a vehicle is parked and secured,
                SENTINEL-1 is being developed to establish an independent mechanical restraint. The
                objective is to make unauthorised movement physically harder; this has not been
                validated in a vehicle.
              </p>
              <p>
                <strong>02 — Next-Stop.</strong> A future, validated configuration could explore a
                controlled response following a verified theft event. This remains a development
                feature requiring independent automotive safety validation. No restraint is
                designed or authorised to engage while a vehicle is moving.
              </p>
              <p className="border-l-2 border-photo-bronze pl-4">
                Next-Stop is not a production feature or operational claim. No public-road testing
                or deployment is authorised.
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
              Illustrative security scenario. No SENTINEL-1 performance claim.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="difference" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">Why SENTINEL-1?</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Because the vehicle is still physical.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-muted">
            <p>Electronic security can be attacked electronically. Tracking can report location.</p>
            <p>
              SENTINEL-1 is being developed around the proposition that the vehicle itself can also
              become part of its security system, through a separate mechanical layer.
            </p>
            <p className="font-display text-2xl tracking-wide text-bronze">
              Independent. Mechanical. Concealed. Vehicle-specific.
            </p>
            <p className="text-sm">
              These are design intentions, not validated capabilities or guarantees.
            </p>
          </div>
        </div>
      </section>

      <section id="models" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <p className="text-xs tracking-widest text-bronze uppercase">The SENTINEL-1 family</p>
        <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
          One platform. Multiple markets.
        </h2>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {MODELS.map((model, i) => (
            <article
              key={model.name}
              className="bg-bg p-8"
            >
              <p className="text-xs tracking-widest text-muted">0{i + 1}</p>
              <h3 className="mt-4 font-display text-4xl">{model.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">{model.body}</p>
              {model.name === "SENTINEL-1 Vehicle" && (
                <>
                  <p className="mt-4 text-sm text-bronze">Indicative planning price: from $795 + fitting</p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Not a current offer or confirmed price. Final pricing and availability depend
                    on engineering validation and production approval.
                  </p>
                  <a
                    href="#reserve"
                    className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                  >
                    Register interest
                  </a>
                </>
              )}
              {model.name === "SENTINEL-1 Fleet" && (
                <a
                  href="#fleet"
                  className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                >
                  Request fleet pricing
                </a>
              )}
              {model.name === "SENTINEL-1 Defence" && (
                <a
                  href="#defence"
                  className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                >
                  Request a briefing
                </a>
              )}
              {model.name === "SENTINEL-1 HGV" && (
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 HGV enquiry")}`}
                  className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                >
                  HGV enquiry
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="fleet" className="relative min-h-[68vh] scroll-mt-20">
        <img
          src="/img/fleet.jpg"
          alt="A sedan, pickup, and van parked outside an industrial building at dusk"
          className="photo-clarity absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg/60 via-bg/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">For fleets</p>
          <h2 className="mt-3 max-w-xl font-display text-5xl leading-none sm:text-6xl">
            Protect more than one vehicle.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            Fleet operators can register interest in the SENTINEL-1 fleet programme. Each vehicle
            application requires its own engineering assessment; fleet deployment is not currently
            authorised.
          </p>
          <ul className="mt-6 max-w-md space-y-3 text-sm leading-6">
            <li>Passenger, rental and commercial vehicle fleets</li>
            <li>Pickups and utes</li>
            <li>High-value transport and specialist vehicles</li>
            <li>Government and security-sensitive operations</li>
          </ul>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            Vehicle-specific engineering remains essential. No universal-fit compatibility or
            validated fleet installation is claimed.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 fleet programme enquiry")}`}
            className="mt-8 inline-flex min-h-11 w-fit items-center border border-fg/40 px-6 text-sm tracking-widest uppercase"
          >
            Request fleet programme details
          </a>
        </div>
      </section>

      <section id="applications" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Defence &amp; government</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Security beyond the civilian vehicle.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            SENTINEL-1 is being explored as a dual-use platform. Any defence or government
            application would follow a separate engineering, safety, evaluation and procurement
            pathway.
          </p>
          <ul className="mt-6 grid gap-3 text-sm leading-6 text-fg/85 sm:grid-cols-2 lg:grid-cols-3">
            <li>Military and tactical vehicles</li>
            <li>Government and police fleets</li>
            <li>Secure logistics</li>
            <li>High-value transport</li>
            <li>Specialist vehicle applications</li>
          </ul>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="border border-border bg-bg">
              <figure>
                <img
                  src="/img/military-hmmwv.jpg"
                  alt="A camouflaged HMMWV displayed at an outdoor vehicle show"
                  className="photo-moody aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-5 pt-3 text-xs leading-5 text-muted">
                  Illustrative vehicle only; SENTINEL-1 is not installed. Photo by{" "}
                  <a
                    href="https://commons.wikimedia.org/wiki/File:High_Mobility_Multipurpose_Wheeled_Vehicle_(7859195840).jpg"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Tobias Nordhausen
                  </a>
                  , licensed under{" "}
                  <a
                    href="https://creativecommons.org/licenses/by/2.0/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    CC BY 2.0
                  </a>
                  .
                </figcaption>
              </figure>
              <div className="p-6 sm:p-8">
                <p className="text-xs tracking-widest text-bronze uppercase">
                  Exploratory pathway
                </p>
                <h3 className="mt-3 font-display text-4xl">Exploratory defence pathway</h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  A potential dual-use pathway—not a fielded military product or defence system.
                  Any variant would require its own controlled design review and government
                  engagement after a civilian bench demonstrator exists.
                </p>
                <p className="mt-4 border-l-2 border-bronze pl-4 text-sm leading-6 text-muted">
                  No military certification or operational deployment is claimed. Applications
                  require separate safety evidence and evaluation.
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 defence and government enquiry")}`}
                  className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                >
                  Defence / government enquiry
                </a>
              </div>
            </article>

            <article className="border border-border bg-bg">
              <figure>
                <img
                  src="/img/hgv-parking.jpg"
                  alt="A DAF heavy goods vehicle illuminated by street lamps at night"
                  className="photo-moody aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-5 pt-3 text-xs leading-5 text-muted">
                  Illustrative HGV only; SENTINEL-1 is not installed. Photo by{" "}
                  <a
                    href="https://commons.wikimedia.org/wiki/File:Daf_night_illumination._Dnipro.jpg"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Alex Blokha
                  </a>
                  , licensed under{" "}
                  <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    CC BY-SA 4.0
                  </a>
                  .
                </figcaption>
              </figure>
              <div className="p-6 sm:p-8">
                <p className="text-xs tracking-widest text-bronze uppercase">
                  Separate heavy-vehicle concept
                </p>
                <h3 className="mt-3 font-display text-4xl">SENTINEL-1 HGV</h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  A dedicated HGV version is being explored around pneumatic operation from its
                  own isolated auxiliary air reservoir.
                </p>
                <p className="mt-4 border-l-2 border-bronze pl-4 text-sm leading-6 text-muted">
                  The concept must remain separate from the truck’s shared service- and
                  parking-brake air circuits. Air-system design, vehicle compatibility, and safe
                  fault behavior all require specialist review and validation before any fitting
                  is considered.
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 HGV enquiry")}`}
                  className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                >
                  HGV enquiry
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="defence" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">For defence</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Begin a controlled technical discussion.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>
              Government and defence organisations can request a dedicated briefing on the concept
              architecture, potential vehicle applications and development pathway.
            </p>
            <p>
              Detailed technical information may be provided through controlled disclosure
              arrangements where appropriate. No military certification or operational deployment
              is currently claimed.
            </p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("SENTINEL-1 defence briefing request")}`}
              className="mt-3 inline-flex min-h-11 items-center bg-bronze px-5 text-xs tracking-widest text-bg uppercase"
            >
              Request defence briefing
            </a>
          </div>
        </div>
      </section>

      <section id="safety" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Safety</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Security cannot compromise vehicle safety.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            Every vehicle-installed configuration must pass the appropriate independent engineering
            and safety assessment before operational use. These are development requirements, not
            evidence of completed validation.
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
            <p className="text-xs tracking-widest text-sage uppercase">01 — Parked security</p>
            <img
              src="/img/secure.jpg"
              alt="A driver walking away from a parked car toward a lit front door at night"
              className="photo-clarity mt-6 mb-8 w-full object-cover outline outline-1 -outline-offset-1 outline-photo-border"
            />
            <p className="text-xs tracking-widest text-photo-bronze uppercase">
              Intended mechanical restraint
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none">Designed for parked vehicles.</h2>
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
              02 — Next-Stop
            </p>
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
              Next-Stop is a development feature, not a production claim. Any future response
              concept must not engage a restraint while the vehicle is moving and requires
              independent automotive safety validation before operational testing.
            </p>
          </div>
        </div>
      </section>

      <section id="development" className="scroll-mt-20 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Development status</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Built to be proven — not simply claimed.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            SENTINEL-1 is progressing through staged engineering gates. Each stage must produce
            evidence before the next claim or activity.
          </p>
          <ol className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "01",
                "Engineering review",
                "Review the mechanical architecture, interfaces, hazards and safety case.",
              ],
              [
                "02",
                "Bench demonstrator",
                "Build and assess a demonstrator in a controlled test environment.",
              ],
              [
                "03",
                "Mechanical validation",
                "Generate documented evidence for mechanical function and failure behaviour.",
              ],
              [
                "04",
                "Vehicle-specific development",
                "Assess each intended vehicle interface independently before vehicle testing.",
              ],
              [
                "05",
                "Controlled testing",
                "Proceed only under the required safety controls and independent authorisation.",
              ],
              [
                "06",
                "Production validation",
                "Confirm the applicable design, manufacturing and safety evidence before any production approval.",
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
          <p className="text-xs tracking-widest text-bronze uppercase">
            Built outside the electronic attack surface
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            A physical architecture designed for independence.
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

      <section
        id="reserve"
        className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2"
      >
        <div>
          <p className="text-xs tracking-widest text-bronze uppercase">Reserve your SENTINEL-1</p>
          <h2 className="mt-3 font-display text-6xl leading-none text-bronze sm:text-7xl">
            From $795
          </h2>
          <p className="mt-4 text-lg text-muted">plus fitting.</p>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            This is an indicative planning price, not a confirmed offer. Register your interest in
            the first production programme; this form does not place an order or collect payment.
            Product availability, compatibility, final pricing and timing depend on engineering
            validation and production approval.
          </p>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            Vehicle make, model, year, variant, intended use and preferred configuration can be
            shared below. Compatibility must be confirmed before any final installation commitment.
          </p>
          <h3 className="mt-10 font-display text-3xl">Reservation process</h3>
          <ol className="mt-5 space-y-3 text-sm leading-6 text-muted">
            <li><strong className="text-bronze">01 — Register:</strong> Share your interest and vehicle details.</li>
            <li><strong className="text-bronze">02 — Vehicle check:</strong> Assess the vehicle and intended configuration.</li>
            <li><strong className="text-bronze">03 — Engineering:</strong> Progress the applicable interface through validation.</li>
            <li><strong className="text-bronze">04 — Production:</strong> Only approved configurations proceed to production.</li>
            <li><strong className="text-bronze">05 — Fitting:</strong> Installation follows an appropriate approved pathway.</li>
          </ol>
          <p className="mt-5 text-xs leading-5 text-muted">
            Production timing depends on engineering validation and the availability of the
            applicable vehicle interface.
          </p>
        </div>
        <div className="bg-surface p-6 sm:p-8">
          <h3 className="font-display text-3xl">Register your interest</h3>
          <InquiryForm type="pre-order" />
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">Join the programme</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Private owners. Fleets. Government. Development partners.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
              Register vehicle interest, discuss a fleet or government application, or explore an
              engineering and manufacturing partnership. SENTINEL-1 remains under active
              development; compatibility, production timing and final pricing remain subject to
              engineering validation and production approval.
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
            <h3 className="font-display text-3xl">Send a general enquiry</h3>
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
            Find your SENTINEL-1 pathway.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-fg/85">
            Whether you want to register a vehicle configuration, discuss a fleet or defence
            application, or participate in development, begin with the pathway that fits your
            interest.
          </p>
          <ul className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {PARTNERS.map(([title, body]) => {
              const isVehicle = title === "Passenger vehicles";
              const href = isVehicle
                ? "#reserve"
                : `mailto:${EMAIL}?subject=${encodeURIComponent(`SENTINEL-1 ${title} enquiry`)}`;
              const label = isVehicle
                ? "Register interest"
                : title === "Fleet operators"
                  ? "Fleet enquiry"
                  : title === "Defence and government"
                    ? "Defence enquiry"
                    : "Partner with SENTINEL-1";
              return (
                <li key={title} className="bg-surface p-6 sm:p-8">
                  <h3 className="font-display text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
                  <a
                    href={href}
                    className="mt-5 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 max-w-3xl border-l-2 border-bronze pl-5">
            <p className="text-sm tracking-widest text-bronze uppercase">Development status</p>
            <p className="mt-3 text-base leading-7">
              SENTINEL-1 is under active development. Product configuration, compatibility,
              production timing and final pricing remain subject to engineering validation and
              production approval. No moving-vehicle testing or public-road deployment is authorised
              until the required independent safety gates are satisfied.
            </p>
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
          SENTINEL-1 is under active development. Product configuration, vehicle compatibility,
          production timing and final pricing remain subject to engineering validation and
          production approval. No certification or operational deployment is claimed. © 2026
          PROJECT SENTINEL-1. All rights reserved.
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
