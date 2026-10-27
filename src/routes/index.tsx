import { createFileRoute } from "@tanstack/react-router";
import {
  BusFront,
  CarFront,
  Cog,
  Construction,
  Route as RouteIcon,
  ShieldCheck,
  Tractor,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { submitInquiry, type InquiryInput } from "@/lib/inquiry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        name: "description",
        content:
          "Explore SENTINEL-1, an independent mechanical vehicle-security concept in development. Register non-binding passenger-vehicle interest or discuss a partnership.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        property: "og:description",
        content:
          "A proposed mechanical security concept for parked vehicles, designed to complement existing protection. No production units are available.",
      },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SENTINEL-1 | Independent Mechanical Vehicle Security" },
      {
        name: "twitter:description",
        content:
          "A proposed mechanical security concept for parked vehicles, designed to complement existing protection. No production units are available.",
      },
      { name: "twitter:image", content: "/og.jpg" },
    ],
  }),
  component: Home,
});

const NAV = [
  ["The product", "#product"],
  ["How it works", "#how"],
  ["Applications", "#applications"],
  ["Fleet", "#fleet"],
  ["Who it's for", "#audience"],
  ["Engineering", "#engineering"],
  ["Development", "#development"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
] as const;

const VEHICLE_PATHWAYS: { label: string; icon: LucideIcon; tone: string }[] = [
  { label: "Cars", icon: CarFront, tone: "text-bronze" },
  { label: "Fleets", icon: BusFront, tone: "text-sage" },
  { label: "Trucks", icon: Truck, tone: "text-blue-steel" },
  { label: "Farming", icon: Tractor, tone: "text-teal" },
  { label: "Mining", icon: Construction, tone: "text-copper" },
];

const FLEET_VEHICLES: { label: string; icon: LucideIcon; tone: string }[] = [
  { label: "Cars", icon: CarFront, tone: "text-bronze" },
  { label: "Vans", icon: BusFront, tone: "text-sage" },
  { label: "Utes", icon: Truck, tone: "text-blue-steel" },
  { label: "Trucks", icon: Truck, tone: "text-teal" },
  { label: "Buses", icon: BusFront, tone: "text-copper" },
  { label: "Specialist", icon: ShieldCheck, tone: "text-bronze" },
];

const MODELS = [
  {
    name: "SENTINEL-1 Vehicle",
    label: "Passenger vehicles · first pathway",
    category: "Passenger vehicles",
    icon: CarFront,
    tone: "text-bronze",
    glow: "bg-bronze/15",
    panel: "border-bronze/30 bg-bronze/[0.04]",
    body: "The first commercial development priority: a proposed mechanical security concept for passenger vehicles, with an interface assessment for each vehicle platform.",
    action: "Register vehicle interest",
  },
  {
    name: "SENTINEL-1 Fleet",
    label: "For fleet operators",
    category: "Cars · vans · utes · buses",
    icon: BusFront,
    tone: "text-sage",
    glow: "bg-sage/20",
    panel: "border-sage/40 bg-sage/[0.08]",
    body: "An exploratory pathway for rental, commercial and operational fleets. Share your vehicle mix and requirements to inform future assessment.",
    action: "Discuss a fleet application",
  },
  {
    name: "SENTINEL-1 HGV",
    label: "Heavy vehicles · separate assessment",
    category: "Trucks · heavy vehicles",
    icon: Truck,
    tone: "text-blue-steel",
    glow: "bg-blue-steel/15",
    panel: "border-blue-steel/40 bg-blue-steel/[0.07]",
    body: "A distinct heavy-vehicle pathway requiring its own vehicle-architecture, interface and safety assessment. Heavy vehicles are not simply larger passenger cars.",
    action: "Discuss an HGV application",
  },
  {
    name: "Agricultural vehicles",
    label: "Exploratory application · separate assessment",
    category: "Tractors · farm equipment",
    icon: Tractor,
    tone: "text-teal",
    glow: "bg-teal/15",
    panel: "border-teal/40 bg-teal/[0.07]",
    body: "A potential agricultural-equipment pathway for future exploration. Vehicle interfaces, working environments, operating requirements and safety would need separate assessment; no fit or capability is established.",
    action: "Discuss an agricultural application",
  },
  {
    name: "Mining & off-highway",
    label: "Exploratory application · separate assessment",
    category: "Mining · site equipment",
    icon: Construction,
    tone: "text-copper",
    glow: "bg-copper/15",
    panel: "border-copper/40 bg-copper/[0.07]",
    body: "A potential mining and off-highway pathway for future exploration. Heavy equipment has distinct operating conditions and interfaces that require separate engineering and safety assessment.",
    action: "Discuss an off-highway application",
  },
  {
    name: "SENTINEL-1 Specialist",
    label: "Government · specialist requirements",
    category: "Specialist vehicles",
    icon: ShieldCheck,
    tone: "text-bronze",
    glow: "bg-bronze/15",
    panel: "border-bronze/30 bg-bronze/[0.04]",
    body: "An exploratory pathway for selected specialist requirements, subject to a separate programme, vehicle assessment and independent review.",
    action: "Discuss a specialist application",
  },
  {
    name: "SENTINEL-1 Next-Stop",
    label: "Separate future development concept",
    category: "Future concept · not available",
    icon: RouteIcon,
    tone: "text-sage",
    glow: "bg-sage/20",
    panel: "border-sage/40 bg-sage/[0.08]",
    body: "A distinct future concept, not part of an available product. Any further work would require independent automotive safety validation and the necessary approvals.",
    action: "Register future interest",
  },
];

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

const PREORDER_REQUEST = "SENTINEL-1 Vehicle — pre-order request";

const FAQS = [
  [
    "Can I buy SENTINEL-1 or register interest now?",
    "Production units are not available to buy or install. You can submit a free, non-binding expression of interest for the proposed passenger-vehicle pathway; it is not an order or reservation, and no payment is taken.",
  ],
  [
    "What does the $795 + fitting target mean?",
    "It is an indicative planning target for the proposed base passenger-vehicle configuration, not a confirmed retail price or current offer. Final price depends on engineering, vehicle-specific interfaces, manufacturing and production approval.",
  ],
  [
    "Which vehicles are compatible?",
    "No approved compatibility list is established. Each make, model, year and variant needs an engineering assessment before installation could be considered.",
  ],
  [
    "Has SENTINEL-1 been built or tested?",
    "No completed production unit or validated vehicle installation is being claimed. The concept remains in development; controlled testing and independent safety review must happen before any installation or launch is considered. There is no confirmed availability date.",
  ],
  [
    "What happens after I send a request?",
    "We review your vehicle use case or partnership proposal and may contact you to discuss it. A pre-order request does not guarantee compatibility, availability or a production place, and does not require payment.",
  ],
  [
    "Does it replace my existing alarm or immobiliser?",
    "No. The concept is intended to complement existing vehicle security rather than replace factory systems, alarms, immobilisers or tracking equipment.",
  ],
  [
    "When might SENTINEL-1 be available?",
    "There is no confirmed launch date. Availability depends on engineering development, controlled testing, independent safety review, vehicle compatibility and production decisions.",
  ],
  [
    "Is the concept independent of vehicle electronics?",
    "The primary design objective is an independently powered mechanical layer. The extent of that independence and the final system behaviour must be established through engineering and testing.",
  ],
  [
    "Could installation affect my vehicle warranty?",
    "That cannot be confirmed at this stage. Any future installation would require assessment of the vehicle manufacturer's requirements, the installation method, applicable law and relevant warranty terms. No warranty outcome is guaranteed.",
  ],
  [
    "What happens if the system loses power or develops a fault?",
    "Safe failure behaviour, authorised recovery and service access are design requirements. Their actual behaviour must be demonstrated and assessed before a product can be offered for installation.",
  ],
  [
    "Can SENTINEL-1 prevent theft or resist a specific attack?",
    "No theft-prevention or attack-resistance performance is claimed. Security performance and foreseeable failure scenarios would require appropriate controlled testing and independent assessment.",
  ],
  [
    "Will insurers recognise SENTINEL-1?",
    "No insurer recognition, premium reduction or insurance benefit is currently claimed. Any future outcome would depend on product evidence and individual insurer decisions.",
  ],
  [
    "Is Next-Stop part of the first product?",
    "No. Next-Stop is a separate future development concept, not an available feature. Any future work would require independent automotive safety validation and the necessary approvals.",
  ],
  [
    "Can my organisation become a development partner?",
    "We welcome enquiries from qualified automotive engineers, safety specialists, test facilities, vehicle and fleet operators, manufacturers, funding organisations and other relevant partners.",
  ],
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

function InquiryForm({ onPrivacy }: { onPrivacy: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const prefix = "programme";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const data = new FormData(form);
    const model = String(data.get("model") ?? "");
    const isPreorderRequest = model === PREORDER_REQUEST;
    const type: InquiryInput["type"] = isPreorderRequest ? "pre-order" : "contact";
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
        isPreorderRequest
          ? "Thank you. Your non-binding interest has been submitted for review. It is not an accepted order, reservation or production place, and no payment has been taken. We may contact you about the vehicle pathway."
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
          onChange={(event) => setSelectedModel(event.target.value)}
          className={inputClass}
        >
          <option value="">Choose an enquiry type</option>
          <optgroup label="Vehicle interest">
            <option value={PREORDER_REQUEST}>Passenger-vehicle pre-order interest</option>
            <option>Fleet application</option>
            <option>HGV / heavy-vehicle application</option>
            <option>Government / specialist application</option>
            <option>Next-Stop future development enquiry</option>
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
          I understand this is a non-binding expression of interest or development enquiry, not an
          accepted order. No payment is taken; compatibility, price, timing and availability are
          unconfirmed. I agree my details may be used to respond to this enquiry. See the Privacy
          Notice below.
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
        className="mt-2 min-h-11 w-fit bg-bronze px-6 text-sm tracking-widest text-bg uppercase disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending"
          ? "Sending…"
          : selectedModel === PREORDER_REQUEST
            ? "Submit my interest"
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
      <header className="fixed inset-x-0 top-0 z-20 border-b border-fg/10 bg-bg/75 backdrop-blur-lg">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-9 w-auto" />
            <span className="font-word text-base tracking-[0.2em] text-bronze transition-colors hover:text-fg sm:text-lg">
              SENTINEL-1
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#reserve"
              className="group inline-flex min-h-11 items-center gap-3 bg-bronze px-4 text-xs tracking-widest text-bg uppercase transition-colors hover:bg-fg"
            >
              Register interest{" "}
              <span
                aria-hidden="true"
                className="text-base transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <button
              type="button"
              className="min-h-11 border border-fg/20 px-4 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="site-menu"
            aria-label="Main navigation"
            className="absolute top-full right-4 z-30 flex w-64 flex-col border border-border bg-surface p-3 text-sm tracking-widest uppercase shadow-xl sm:right-8"
          >
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="min-h-11 px-3 py-3 transition-colors hover:bg-raised hover:text-bronze"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-border bg-bg pt-[4.5rem]"
      >
        <img
          src="/img/driveway.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/75 via-bg/85 to-bg lg:bg-gradient-to-r lg:from-bg lg:via-bg/90 lg:to-bg/35" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_48%,rgba(209,174,115,0.2),transparent_40%)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="max-w-3xl lg:col-start-1 lg:row-start-1">
            <p className="inline-flex items-center gap-3 text-xs tracking-[0.22em] text-bronze uppercase">
              <span className="h-px w-9 bg-bronze" aria-hidden="true" />
              Independent mechanical vehicle security
            </p>
            <p className="mt-8 font-display text-6xl leading-none tracking-[0.04em] text-fg sm:text-7xl">
              SENTINEL-1
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] tracking-tight text-fg sm:text-7xl lg:text-7xl">
              Add a physical layer
              <span className="mt-2 block text-bronze">to vehicle security.</span>
            </h1>
          </div>

          <figure className="relative mx-auto w-full max-w-2xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-self-end">
            <div
              className="absolute -inset-8 -z-10 bg-[radial-gradient(ellipse,rgba(209,174,115,0.2),transparent_68%)]"
              aria-hidden="true"
            />
            <div className="border border-fg/20 bg-bg/65 p-2 shadow-2xl backdrop-blur-sm sm:p-3">
              <div className="relative">
                <img
                  src="/img/unit-bench.jpg"
                  alt="Illustrative rendering of the proposed silver SENTINEL-1 enclosure; no physical unit has been built"
                  className="aspect-[16/9] w-full object-cover"
                />
                <span className="absolute left-3 top-3 border border-bronze/70 bg-bg/85 px-3 py-1.5 text-[0.65rem] tracking-[0.16em] text-bronze uppercase backdrop-blur-sm sm:left-4 sm:top-4">
                  Silver enclosure · concept visual
                </span>
              </div>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[0.65rem] tracking-[0.16em] text-fg/75 uppercase">
              <span>SENTINEL-1 · product concept visual</span>
              <span className="border-l border-bronze/70 pl-3">
                Illustrative · not built or tested
              </span>
            </figcaption>
          </figure>

          <div className="max-w-3xl lg:col-start-1 lg:row-start-2">
            <p className="mt-7 max-w-2xl text-base leading-7 text-fg/85 sm:text-lg sm:leading-8">
              Your vehicle already has an alarm, an immobiliser and electronic security. SENTINEL-1
              is being developed around a different idea: an independently powered mechanical
              restraint designed to add a physical layer when your vehicle is parked.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              A vehicle-specific security concept designed to work alongside existing protection—not
              replace it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#reserve"
                className="group inline-flex min-h-12 items-center gap-3 bg-bronze px-5 text-xs tracking-widest text-bg uppercase transition-colors hover:bg-fg"
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
                href="#product"
                className="inline-flex min-h-12 items-center border border-fg/30 px-5 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
              >
                Explore the product
              </a>
            </div>
            <div className="mt-7 border-l-2 border-bronze pl-4">
              <p className="text-xs tracking-widest text-bronze uppercase">
                Passenger-vehicle pathway · indicative target price
              </p>
              <p className="mt-1 font-display text-4xl text-fg">
                $795 <span className="text-2xl text-bronze">+ fitting</span>
              </p>
              <p className="mt-2 max-w-xl text-xs leading-5 text-muted">
                Planning target only—not a confirmed retail price or offer. No production units are
                available. Price, fit, timing and availability remain unconfirmed; registration is
                free and non-binding, and no payment is taken.
              </p>
            </div>
            <div className="mt-7 grid grid-cols-5 gap-2 sm:gap-3">
              {VEHICLE_PATHWAYS.map(({ label, icon: Icon, tone }) => (
                <a
                  key={label}
                  href="#applications"
                  className="group flex min-h-20 flex-col items-center justify-center gap-2 border border-border/80 bg-bg/70 px-1 py-3 text-center transition-colors hover:border-bronze/70"
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-6 ${tone} transition-transform group-hover:-translate-y-0.5`}
                    strokeWidth={1.5}
                  />
                  <span className="text-[0.65rem] tracking-wider text-fg/80 uppercase sm:text-xs">
                    {label}
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              Application pathways under exploration; each requires separate assessment.
            </p>
          </div>
        </div>
      </section>

      <section
        id="problem"
        className="relative isolate scroll-mt-20 overflow-hidden border-b border-border bg-bg text-fg"
      >
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_88%_18%,rgba(131,170,152,0.12),transparent_35%),linear-gradient(135deg,transparent_49.9%,rgba(209,174,115,0.08)_50%,transparent_50.1%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              The security question
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
              Your vehicle has electronic security. What about a physical layer?
            </h2>
            <div className="mt-10 grid gap-px bg-fg/20 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Alarms", "Alert when a security event is detected."],
                ["Tracking", "Can help locate a vehicle when the system is active and accessible."],
                ["Immobilisers", "Restrict authorised starting through vehicle electronics."],
                [
                  "SENTINEL-1",
                  "Explores a separately powered mechanical restraint concept for a parked vehicle.",
                ],
              ].map(([title, body]) => (
                <article
                  key={title}
                  className={`border-t-2 p-6 ${title === "SENTINEL-1" ? "border-bronze bg-bronze/[0.07]" : "border-sage/60 bg-surface/90"}`}
                >
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-fg/80">{body}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl border-l-2 border-bronze pl-5 text-base leading-7 text-fg/80">
              The engineering proposition is to investigate whether a mechanical layer can add value
              alongside existing protection. This is a development objective—not a claim of proven
              theft prevention or demonstrated performance.
            </p>
            <a
              href="#product"
              className="mt-7 inline-flex min-h-11 items-center border border-fg/50 px-5 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
            >
              Discover SENTINEL-1
            </a>
          </div>
        </div>
      </section>

      <section id="product" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <figure className="border border-border bg-bg p-4 sm:p-6">
              <img
                src="/img/unit-bench.jpg"
                alt="Illustrative rendering of a proposed SENTINEL-1 enclosure on a workshop bench; no physical unit has been built"
                className="w-full object-contain"
              />
              <figcaption className="mt-4 text-center text-xs tracking-widest text-muted uppercase">
                Product concept visual · not a built or tested unit
              </figcaption>
            </figure>
            <div>
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Meet SENTINEL-1
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
                A mechanical security concept, designed around the vehicle.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-fg/85">
                The proposed system centres on a mechanical restraint, independent power and
                controlled recovery. These principles guide development; they are not verified
                capabilities of a finished product.
              </p>
            </div>
          </div>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "01",
                "Independent architecture",
                "The primary design objective is to operate separately from conventional vehicle-security electronics.",
              ],
              [
                "02",
                "Physical restraint",
                "Explore a mechanical restraint for a parked vehicle as a complement to existing protection.",
              ],
              [
                "03",
                "Vehicle-specific engineering",
                "Assess an interface for each selected platform; no universal fit is claimed.",
              ],
              [
                "04",
                "Controlled authorisation",
                "Define how authorisation, fault handling and mechanism state should be managed and verified.",
              ],
              [
                "05",
                "Service and recovery",
                "Account for maintenance, power loss, mechanical faults and authorised recovery before installation.",
              ],
            ].map(([number, title, body], index) => (
              <li
                key={number}
                className={`border bg-bg p-6 sm:p-8 ${index === 0 || index === 1 ? "border-bronze/40" : "border-sage/35"}`}
              >
                <span className="font-display text-2xl text-bronze">{number}</span>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-4xl border-l-2 border-bronze pl-5 text-base leading-7 text-fg/85">
            The objective is not to rush a unit to market. It is to establish whether SENTINEL-1 can
            become a product that is safe, useful and commercially viable.
          </p>
        </div>
      </section>

      <section id="difference" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-center lg:gap-16">
            <div>
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Security architecture
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
                Three layers. One complementary approach.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
                SENTINEL-1 is being developed to explore a separate mechanical-security layer
                alongside the protection vehicles already have. Its performance and practical value
                remain to be established.
              </p>
            </div>
            <div className="relative grid gap-2 border border-border bg-surface/70 p-5 sm:p-7">
              <div
                className="absolute inset-0 bg-[linear-gradient(rgba(243,241,236,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(243,241,236,0.035)_1px,transparent_1px)] bg-[size:24px_24px]"
                aria-hidden="true"
              />
              {[
                [
                  "01",
                  "DETECT",
                  "Alarms and monitoring identify abnormal events.",
                  "border-sage/60",
                ],
                [
                  "02",
                  "IDENTIFY",
                  "Immobilisers and keys manage authorised vehicle operation.",
                  "border-teal/60",
                ],
                [
                  "03",
                  "RESTRAIN",
                  "SENTINEL-1 explores a separate physical layer when parked.",
                  "border-bronze",
                ],
              ].map(([number, title, body, border]) => (
                <div
                  key={number}
                  className={`relative flex items-center gap-4 border-l-2 bg-bg/90 p-4 ${border}`}
                >
                  <span className="font-display text-xl text-bronze">{number}</span>
                  <div>
                    <p className="text-xs tracking-[0.18em] text-fg uppercase">{title}</p>
                    <p className="mt-1 text-sm leading-5 text-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 overflow-x-auto border border-border">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead className="bg-surface text-xs tracking-widest text-bronze uppercase">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Security approach
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Typical role
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    SENTINEL-1 development question
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Alarms",
                    "Alert when a security event is detected.",
                    "Could a separate physical layer complement alerts?",
                  ],
                  [
                    "Tracking",
                    "Can assist with locating a vehicle when active and accessible.",
                    "What role might physical restraint play alongside recovery tools?",
                  ],
                  [
                    "Electronic immobilisers",
                    "Restrict authorised starting through vehicle electronics.",
                    "Can a vehicle-specific mechanical concept be assessed separately?",
                  ],
                ].map(([approach, role, question]) => (
                  <tr key={approach} className="bg-bg">
                    <th scope="row" className="px-5 py-4 font-display text-xl text-fg">
                      {approach}
                    </th>
                    <td className="px-5 py-4 leading-6 text-muted">{role}</td>
                    <td className="px-5 py-4 leading-6 text-muted">{question}</td>
                  </tr>
                ))}
                <tr className="bg-bronze/10">
                  <th scope="row" className="px-5 py-4 font-display text-xl text-bronze">
                    SENTINEL-1
                  </th>
                  <td className="px-5 py-4 leading-6 text-fg/85">
                    Proposed independently powered mechanical restraint for a parked vehicle.
                  </td>
                  <td className="px-5 py-4 leading-6 text-fg/85">
                    Establish feasibility, safe operation and value through engineering and
                    independent validation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col gap-5 border-l-2 border-sage pl-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl">Complementary by design.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                This is an engineering proposition—not evidence of theft prevention or demonstrated
                performance.
              </p>
            </div>
            <a
              href="#development"
              className="inline-flex min-h-11 w-fit items-center gap-3 border border-bronze px-5 text-xs tracking-widest text-bronze uppercase transition-colors hover:bg-bronze hover:text-bg"
            >
              Explore development
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section
        id="how"
        className="relative isolate scroll-mt-20 overflow-hidden border-y border-border bg-surface"
      >
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(209,174,115,0.1),transparent_50%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              How it works
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
              Designed around the moment a vehicle is parked.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
              The first development priority is parked-vehicle security. These are intended stages
              and requirements—not confirmed product operation.
            </p>
          </div>
          <ol className="relative mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Vehicle secured",
                "The intended use case begins with a parked vehicle and secure-state conditions to be defined.",
              ],
              [
                "02",
                "Authorised",
                "A proposed control architecture would manage authorisation and system state.",
              ],
              [
                "03",
                "Restraint concept",
                "A vehicle-specific mechanical restraint is being explored as an additional physical layer.",
              ],
              [
                "04",
                "Plan for recovery",
                "Service, fault handling, power loss and authorised recovery must be addressed in the design.",
              ],
            ].map(([number, title, body]) => (
              <li key={number} className="relative border border-border bg-bg/85 p-6 sm:p-8">
                <span className="grid size-10 place-items-center border border-bronze/60 bg-bronze/10 font-display text-xl text-bronze">
                  {number}
                </span>
                <h3 className="mt-4 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl border-l-2 border-bronze pl-5 text-sm leading-6 text-muted">
            Operation, safe engagement and disengagement, interface integrity and recovery must be
            demonstrated and independently assessed before any installation is considered.
          </p>
          <div className="mt-10 border border-border bg-bg/80 p-6 sm:p-8">
            <h3 className="font-display text-3xl">What must be proven first?</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Reliable mechanical operation.",
                "Safe engagement and disengagement.",
                "Vehicle-specific interface integrity.",
                "Behaviour during faults and power loss.",
                "Authorised recovery and service procedures.",
                "Independent engineering and safety acceptance.",
              ].map((requirement) => (
                <li key={requirement} className="flex gap-3">
                  <span className="text-bronze" aria-hidden="true">
                    —
                  </span>
                  {requirement}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-5 text-muted">
              These are intended functions and validation requirements, not a representation that a
              completed unit has passed these tests.
            </p>
          </div>
        </div>
      </section>

      <section id="applications" className="scroll-mt-20">
        <div className="relative isolate overflow-hidden border-y border-border bg-surface">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(118,185,177,0.12),transparent_36%),radial-gradient(ellipse_at_10%_90%,rgba(209,174,115,0.12),transparent_40%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_49.9%,rgba(243,241,236,0.025)_50%,transparent_50.1%)] bg-[length:48px_48px]" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              The SENTINEL-1 product family
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
              Different vehicles. Separate engineering pathways.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-fg/85">
              Passenger vehicles are the first development priority. Fleet and heavy-vehicle
              pathways need separate assessment; agriculture and mining remain early exploratory
              applications—not confirmed products, compatibility or capabilities.
            </p>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs tracking-widest text-muted uppercase">
              <span className="text-bronze">Passenger vehicles · first pathway</span>
              <span>Fleet · heavy vehicles · exploratory assessment</span>
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((model, index) => {
            const Icon = model.icon;
            return (
              <article
                key={model.name}
                className={`group flex flex-col items-start border bg-bg transition-colors hover:border-bronze/70 ${model.panel}`}
              >
                <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border-b border-border/80 bg-bg/35">
                  <div
                    className="absolute inset-3 border border-dashed border-fg/10"
                    aria-hidden="true"
                  />
                  <div
                    className={`absolute size-36 rounded-full opacity-60 blur-3xl ${model.glow}`}
                    aria-hidden="true"
                  />
                  <Icon
                    aria-hidden="true"
                    className={`relative size-20 transition-transform duration-500 group-hover:scale-110 ${model.tone}`}
                    strokeWidth={1.1}
                  />
                  <p className="absolute top-5 left-5 text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                    {model.category}
                  </p>
                  <span
                    className={`absolute right-5 bottom-5 size-2 rounded-full ${model.glow}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start p-6 sm:p-8">
                  <p className={`text-xs tracking-widest uppercase ${model.tone}`}>{model.label}</p>
                  <h3 className="font-display text-3xl">{model.name}</h3>
                  <p className="mt-3 max-w-xl flex-1 text-sm leading-6 text-muted">{model.body}</p>
                  {index === 0 && (
                    <p className="mt-5 border-l-2 border-bronze pl-4 text-sm leading-6">
                      Indicative target: <strong className="text-bronze">$795 + fitting</strong>
                      <span className="block text-xs text-muted">
                        Planning target only; not a current offer or confirmed retail price.
                      </span>
                    </p>
                  )}
                  <a
                    href="#reserve"
                    className={`mt-6 inline-flex min-h-11 items-center px-5 text-xs tracking-widest uppercase transition-colors ${
                      index === 0
                        ? "bg-bronze text-bg hover:bg-fg"
                        : "border border-border text-fg hover:border-bronze hover:text-bronze"
                    }`}
                  >
                    {model.action}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="relative isolate overflow-hidden border-y border-border bg-bg">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_50%,rgba(118,185,177,0.12),transparent_38%),linear-gradient(110deg,rgba(209,174,115,0.08),transparent_52%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <p className="text-xs tracking-widest text-bronze uppercase">
              Exploratory applications
            </p>
            <h3 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              Specialist and government pathways require their own assessment.
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-fg/85">
              Any potential specialist or government use would require a separately defined,
              properly governed engineering and evaluation programme. SENTINEL-1 is not a fielded or
              certified military product; no operational capability, defence qualification or
              government endorsement is claimed.
            </p>
            <a
              href="#reserve"
              className="mt-6 inline-flex min-h-11 items-center border border-fg/50 px-5 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
            >
              Discuss a specialist application
            </a>
          </div>
        </div>
      </section>

      <section id="fleet" className="scroll-mt-20 border-b border-border bg-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-center">
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              Fleet pathway
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
              Fleet security is a different problem.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              A potential fleet application would need to account for different vehicle platforms,
              operating patterns and service requirements. These categories guide discussion only;
              they do not represent established compatibility.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {FLEET_VEHICLES.map(({ label, icon: Icon, tone }) => (
                <div
                  key={label}
                  className="flex min-h-24 flex-col items-center justify-center gap-2 border border-border bg-surface/75 p-4"
                >
                  <Icon aria-hidden="true" className={`size-7 ${tone}`} strokeWidth={1.4} />
                  <span className="text-xs tracking-widest text-fg/80 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="border border-border bg-surface/75 p-6 sm:p-8">
            <p className="text-xs tracking-widest text-sage uppercase">Assessment considerations</p>
            <ul className="mt-5 divide-y divide-border">
              {[
                "Vehicle mix and platform variation",
                "Operating cycles and parking conditions",
                "Maintenance, service and authorised recovery",
                "Controlled trials and independent review",
              ].map((item, index) => (
                <li key={item} className="flex gap-4 py-4 text-sm leading-6 text-muted">
                  <span className="font-display text-xl text-bronze">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#reserve"
              className="mt-5 inline-flex min-h-11 items-center border border-sage/70 px-5 text-xs tracking-widest text-sage uppercase transition-colors hover:bg-sage hover:text-bg"
            >
              Discuss a fleet application
            </a>
          </aside>
        </div>
      </section>

      <section id="audience" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
            Who it's for
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
            Built around real vehicle-security requirements.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
            The first pathway focuses on passenger vehicles. Other applications will be assessed
            separately as engineering evidence and resources permit.
          </p>
          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Private vehicle owners",
                "Explore whether a physical security layer could complement the protection already on your vehicle.",
              ],
              [
                "Fleet operators",
                "Share your fleet mix and operating requirements to inform future assessment.",
              ],
              [
                "Specialist transport operators",
                "Discuss the requirements of selected high-value or operationally sensitive vehicles.",
              ],
              [
                "Automotive and engineering organisations",
                "Contribute expertise in mechanical feasibility, vehicle interfaces, safety and manufacturing.",
              ],
              [
                "Government and specialist organisations",
                "Discuss a separate, properly governed evaluation pathway for specialist applications.",
              ],
              [
                "Development partners",
                "Help define the evidence, test facilities and commercial questions for the next stage.",
              ],
            ].map(([title, body]) => (
              <li key={title} className="bg-bg p-6 sm:p-8">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-l-2 border-bronze pl-5 text-sm leading-6 text-muted">
            Not every vehicle will be suitable. Each potential application requires its own
            engineering assessment; no universal compatibility is claimed.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#reserve"
              className="inline-flex min-h-11 items-center bg-bronze px-5 text-xs tracking-widest text-bg uppercase transition-colors hover:bg-fg"
            >
              Register your vehicle interest
            </a>
            <a
              href="#partners"
              className="inline-flex min-h-11 items-center border border-border px-5 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
            >
              Become a development partner
            </a>
          </div>
        </div>
      </section>

      <section id="engineering" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <figure
              aria-label="Illustrative schematic of a heavy vehicle security system under assessment"
              className="relative isolate flex aspect-[16/10] items-center justify-center overflow-hidden border border-bronze/30 bg-bg"
            >
              <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_48%,rgba(118,185,177,0.12),transparent_42%),linear-gradient(rgba(243,241,236,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(243,241,236,0.04)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute top-6 left-6 flex items-center gap-2 text-[0.65rem] tracking-[0.16em] text-bronze uppercase">
                <span className="size-1.5 rounded-full bg-bronze" aria-hidden="true" />
                Vehicle interface · under assessment
              </div>
              <Truck aria-hidden="true" className="size-24 text-sage sm:size-32" strokeWidth={1} />
              <div className="absolute right-[18%] bottom-[23%] flex size-12 items-center justify-center border border-bronze/60 bg-bg/90 text-bronze sm:size-14">
                <Cog aria-hidden="true" className="size-7" strokeWidth={1.3} />
              </div>
              <div className="absolute bottom-5 left-6 border-l border-teal/60 pl-3 text-xs leading-5 text-muted">
                Schematic illustration
                <span className="block text-fg/70">Not a validated installation</span>
              </div>
            </figure>
            <div>
              <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
                Engineering approach
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
                A product must earn confidence through evidence.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
                The concept is being assessed across its mechanical design, vehicle interfaces,
                power, controls, recovery and environmental durability. These are engineering topics
                for development—not verified product features.
              </p>
            </div>
          </div>
          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Mechanical security core",
                "Assess the proposed enclosure and mechanical-restraint architecture.",
              ],
              [
                "Vehicle-specific interface",
                "Review mounting, geometry, access and interaction with each selected vehicle platform.",
              ],
              [
                "Independent power concept",
                "Establish operating requirements, fault behaviour and service needs through testing.",
              ],
              [
                "Control and authorisation",
                "Define the intended control and authorisation approach; verify status against physical state.",
              ],
              [
                "Service and recovery",
                "Plan authorised access, maintenance and fault recovery for exceptional conditions.",
              ],
              [
                "Durability and documentation",
                "Assess materials and operating environment; develop technical evidence for later review.",
              ],
            ].map(([title, body]) => (
              <li key={title} className="bg-bg p-6 sm:p-8">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-6 text-muted">
            Technical concept and planning materials support further assessment; they do not
            establish that a finished product has passed testing.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Detailed drawings and controlled technical material may be considered for qualified
            parties under appropriate confidentiality arrangements.
          </p>
          <a
            href="#partners"
            className="mt-6 inline-flex min-h-11 items-center border border-bronze px-5 text-xs tracking-widest text-bronze uppercase"
          >
            Request a technical discussion
          </a>
        </div>
      </section>

      <section
        id="safety"
        className="relative isolate scroll-mt-20 overflow-hidden border-b border-border bg-bg"
      >
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_88%_15%,rgba(131,170,152,0.12),transparent_35%),linear-gradient(135deg,transparent_49.9%,rgba(209,174,115,0.06)_50%,transparent_50.1%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="section-kicker text-xs tracking-widest text-bronze uppercase">Safety</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Safety is a gate, not a footnote.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            Any future installation must pass independent engineering and safety assessment before
            operational use. The checks below are development requirements—not completed tests.
          </p>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
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
            ].map(([title, body], index) => (
              <li key={title} className="border border-border bg-surface/75 p-6 sm:p-8">
                <span
                  className={`mb-4 grid size-9 place-items-center border font-display text-lg ${
                    index < 3 ? "border-bronze/50 text-bronze" : "border-sage/50 text-sage"
                  }`}
                >
                  0{index + 1}
                </span>
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
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
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                "Assess commercial readiness",
                "Review manufacture, supply, quality, serviceability and commercial viability.",
              ],
              [
                "07",
                "Make a production decision",
                "Consider readiness, compatibility, launch timing and final pricing only after evidence is available.",
              ],
            ].map(([number, title, body], index) => (
              <li
                key={number}
                className={`border p-6 sm:p-8 ${index < 3 ? "border-bronze/35 bg-surface" : "border-sage/35 bg-surface/75"}`}
              >
                <span
                  className={`font-display text-3xl ${index < 3 ? "text-bronze" : "text-sage"}`}
                >
                  {number}
                </span>
                <h3 className="mt-4 font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="partners" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Development partners</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            The right partners can turn this concept into evidence.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            The next stage needs independent expertise, controlled testing, vehicle-specific
            engineering and a clear commercial evaluation. We welcome organisations with relevant
            capabilities.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {PARTNERS.map(([title, body]) => (
              <li
                key={title}
                className="border border-border bg-bg p-6 transition-colors hover:border-sage/60 sm:p-8"
              >
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-muted">
            These are structured discussions, not an assumption that the concept is proven. Any
            proposed work should agree its scope, responsibilities, confidentiality, costs,
            deliverables and decision gates before commitments are made.
          </p>
          <a
            href="#programme-form"
            className="mt-7 inline-flex min-h-11 items-center bg-bronze px-6 text-sm tracking-widest text-bg uppercase"
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
                Pre-order requests and development enquiries
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl">
                Get involved in the first vehicle pathway.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
                Passenger-vehicle owners can register interest while development continues. Your
                response helps identify which vehicle applications should be assessed first. Fleet,
                specialist and partner enquiries are considered through separate pathways.
              </p>
              <div className="mt-6 border border-bronze/40 bg-bg/80 p-5 backdrop-blur-sm">
                <p className="text-xs tracking-widest text-bronze uppercase">
                  Indicative target · proposed base passenger-vehicle configuration
                </p>
                <p className="mt-2 font-display text-4xl text-fg">
                  $795 <span className="text-2xl text-bronze">+ fitting</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Planning target only—not a confirmed retail price or current offer. Fit,
                  configuration, warranty, timing and availability remain unconfirmed. No production
                  units are available, and this website takes no payment.
                </p>
              </div>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  [
                    "01 — Tell us",
                    "Share your vehicle details or explain your organisation's interest.",
                  ],
                  [
                    "02 — Review",
                    "We assess the enquiry and identify relevant development questions.",
                  ],
                  [
                    "03 — Communicate",
                    "Where appropriate, we may contact you about progress or future assessment.",
                  ],
                  [
                    "04 — Confirm",
                    "Any future offer must confirm fit, price, availability and terms before an order.",
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
                  <h3 className="font-display text-3xl">Register SENTINEL-1 interest</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Tell us which vehicle or application interests you. All vehicle details are
                    optional; fleet, HGV, government and specialist requests are recorded for
                    separate assessment.
                  </p>
                </div>
              </div>
              <InquiryForm onPrivacy={() => setLegal("Privacy")} />
            </div>
          </div>

          <div id="faq" className="mt-12 scroll-mt-20 border-t border-border pt-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs tracking-widest text-bronze uppercase">Before you enquire</p>
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
                  className="group self-start border border-border bg-bg/80 px-5 transition-colors open:border-bronze/50 hover:border-bronze/40"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-3 text-sm font-medium marker:hidden">
                    {question}
                    <span
                      className="grid size-7 shrink-0 place-items-center border border-border text-lg leading-none text-bronze transition-transform group-open:rotate-45"
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
            SENTINEL-1 is under active development. No moving-vehicle testing or public-road
            deployment is authorised until the required independent safety gates are satisfied.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-border bg-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="section-kicker text-xs tracking-widest text-bronze uppercase">
              SENTINEL-1 · ADVERSIQ Intelligence
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              The next stage starts with the right questions.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
              We welcome passenger-vehicle interest, fleet applications and qualified engineering,
              safety, testing, manufacturing and commercial partnership enquiries. Interest is
              non-binding; no production units are available and no payment is taken.
            </p>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs tracking-widest text-bronze uppercase">Project lead</dt>
                <dd className="mt-1 text-fg/85">Brayden Mark Walls</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-bronze uppercase">Project locations</dt>
                <dd className="mt-1 text-fg/85">Melbourne, Australia / Philippines</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col items-start gap-3 md:min-w-56">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-12 w-full items-center justify-between gap-5 bg-bronze px-5 text-xs tracking-widest text-bg uppercase transition-colors hover:bg-fg"
            >
              Email the project
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#programme-form"
              className="inline-flex min-h-12 w-full items-center justify-between gap-5 border border-border px-5 text-xs tracking-widest uppercase transition-colors hover:border-bronze hover:text-bronze"
            >
              Register interest
              <span aria-hidden="true">→</span>
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
        <div className="absolute inset-0 bg-gradient-to-b from-bg/75 via-bg/80 to-bg/95" />
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
          SENTINEL-1 is under development. No production units are available for installation or
          purchase. Product configuration, performance, vehicle compatibility, price, delivery
          timing, warranty terms and production readiness remain subject to engineering, safety and
          commercial validation. No certification, operational deployment or demonstrated
          theft-reduction performance is claimed. © 2026 PROJECT SENTINEL-1. All rights reserved.
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
