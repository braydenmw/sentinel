import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const NAV = [
  ["Problem", "#problem"],
  ["Difference", "#difference"],
  ["Models", "#models"],
  ["Operate", "#operate"],
  ["Pricing", "#pricing"],
  ["Partners", "#partners"],
] as const;

const COMPARE = [
  {
    feature: "Stops drive-away",
    gps: "No",
    alarm: "No",
    immobiliser: "Bypassable",
    sentinel: "Designed to prevent movement",
  },
  {
    feature: "Works when keys cloned",
    gps: "No",
    alarm: "No",
    immobiliser: "No",
    sentinel: "Yes",
  },
  {
    feature: "Works without GPS/signal",
    gps: "No",
    alarm: "Yes",
    immobiliser: "Yes",
    sentinel: "Yes",
  },
  {
    feature: "Hidden from thieves",
    gps: "No",
    alarm: "No",
    immobiliser: "No",
    sentinel: "Yes",
  },
  {
    feature: "Independent of vehicle electronics",
    gps: "No",
    alarm: "No",
    immobiliser: "No",
    sentinel: "Yes",
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
  ["Cellular Telemetry", "Encrypted status updates. Supervisory only — never controls mechanical function."],
  ["Solar Power Extension", "5W panel with charge controller for extended unattended standby."],
  ["Dual-Key Release", "Physical backup access via 5-pin key barrel."],
  ["UWB Authentication", "Secure proximity-based key-fob verification."],
  [
    "Vehicle Interface Kit",
    "Per-platform brackets, clamps, and connectors for clean, hidden fitting to your specific vehicle.",
  ],
];

const BENEFITS = [
  ["Prevents, doesn’t just report", "Stops unauthorised movement before it happens."],
  ["Works when electronics fail", "Independent of vehicle computers, signals, and software."],
  [
    "No keys required to lose control",
    "Even if your key fob is cloned or your car is started electronically, the physical layer remains.",
  ],
  ["Designed for home theft", "Built for vehicles stolen from driveways while owners sleep."],
  ["Insurance-relevant", "Addresses the electronic theft risk profile driving premium increases."],
  ["Hidden from view", "Installed where thieves cannot see it, reach it, or disable it with common tools."],
  ["Global application", "Available across passenger, light commercial, and specialist vehicle classes."],
  ["Tamper detection", "Monitors its own enclosure and will not arm if it detects physical interference."],
  ["Event logging", "Records arm/disarm events and faults with timestamps."],
  ["Interface-end verification", "Confirms the restraint is physically holding the vehicle before reporting secured."],
  ["Safe-by-design", "Cannot engage while the vehicle is moving."],
  ["Mechanical recovery", "Authorised physical release works without vehicle power or radio."],
  ["Service mode", "Authorised maintenance state for workshops, tow operators, and first responders."],
  ["Works with dead vehicle battery", "Independent internal battery maintains mechanical state."],
  [
    "Secure release",
    "Authorised release uses encrypted fob authentication with a mechanical key backup — so you are never locked out, and thieves cannot bypass it with a signal amplifier.",
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
    "SENTINEL-1 is designed as an independent, non-invasive physical layer. It does not modify your vehicle’s electronic systems, hydraulic braking circuit, or factory wiring for core function.",
  ],
  ["What if I lose my fob?", "A mechanical override path is available for authorised physical access."],
  [
    "Can thieves disable it?",
    "It is installed in a concealed location under the chassis and does not connect to vehicle electronics, so it cannot be defeated by signal jamming, relay attacks, or OBD tools.",
  ],
  [
    "Do I need to change how I park or use my car?",
    "No. It is designed to work with your normal parking routine — apply your parking brake, turn off the ignition, and walk away.",
  ],
  ["Is it visible from outside the vehicle?", "No. It mounts hidden under the chassis on the frame rails."],
  [
    "Will my insurer recognise it?",
    "SENTINEL-1 is designed to address the electronic theft risk profile that is driving premium increases. We recommend asking your insurer about recognition for independently verified physical security devices.",
  ],
  [
    "What happens if I sell the car?",
    "The unit can be de-installed and transferred to a new vehicle with a compatible interface kit.",
  ],
];

const PARKED = [
  "Park the vehicle.",
  "Apply the parking brake.",
  "Turn the ignition off.",
  "The system confirms the vehicle is stationary and both mechanical restraints engage automatically.",
  "Drive-away is blocked until you authorise release.",
  "Release using your authorised key fob or mechanical key override.",
];

const NEXT_STOP = [
  "A verified theft notification is received via owner app, operations centre, or police channel.",
  "Both mechanical restraints engage simultaneously within seconds.",
  "The vehicle is brought to a controlled, safe stop.",
  "Release requires dual-factor authorisation at the vehicle.",
];

const EMAIL = "brayden@adversiq.xyz";

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
    <span className={emphasis ? "text-bronze" : negative ? "text-muted" : "text-fg"}>
      {value}
    </span>
  );
}

function Home() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <main className="bg-bg text-fg">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-bronze/40 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-9 w-auto" />
            <span className="font-word text-lg tracking-widest text-bronze sm:text-xl">SENTINEL-1</span>
          </a>
          <nav className="hidden items-center gap-6 text-xs tracking-widest text-fg/80 uppercase lg:flex">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors duration-200 hover:text-fg">
                {label}
              </a>
            ))}
            <a href="#preorder" className="inline-flex min-h-11 items-center bg-bronze px-4 text-bg">
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
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-bg/35 to-bg/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pb-20">
          <p className="text-xs tracking-widest text-bronze uppercase">Independent mechanical vehicle security</p>
          <h1 className="mt-4 max-w-4xl font-display text-6xl leading-none font-medium tracking-tight sm:text-8xl">
            Take control before they take your car.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-fg/90">
            The first physically independent security layer built for a world where electronic theft wins —
            and tracking only tells you what you’ve already lost.
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

      <section id="problem" className="scroll-mt-20 mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs tracking-widest text-bronze uppercase">The problem</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
            Car theft has moved from your driveway to your living room — without anyone breaking a window.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-fg/85">
            <p>Today, thieves don’t need your keys. They don’t need to hot-wire anything.</p>
            <p>
              With a relay device, a signal booster, or a laptop plugged into your OBD port, they can unlock
              and drive away your vehicle from your own driveway while you sleep inside. And when it’s gone,
              GPS tracking only tells you where it was taken — it never stopped it from leaving.
            </p>
            <p>
              The theft isn’t the only cost. Insurance premiums are climbing because electronic theft is so
              easy. Even if you leave your keys in the car — or never take them out of the house — you no
              longer have control over who drives it away. And when a vehicle is taken from a home, other
              crimes often follow.
            </p>
          </div>
        </div>
        <img
          src="/img/relay.jpg"
          alt="A key fob beside a small electronic relay device on a car seat"
          className="h-full max-h-96 w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
        />
      </section>

      <section className="relative min-h-[70vh]">
        <img
          src="/img/empty.jpg"
          alt="An empty driveway at dawn, with tyre marks where a car used to be"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/35" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-end px-5 py-20 sm:px-8">
          <h2 className="font-display text-5xl leading-none sm:text-7xl">
            We built security for the age of electronic attacks.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-7">
            Not another app. Not another tracker. A physical layer that exists outside your vehicle’s
            electronics entirely.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs tracking-widest text-bronze uppercase">What SENTINEL-1 is designed to do</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
            Stops unauthorised vehicle movement before it starts.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-fg/85">
            <p>
              It makes your vehicle substantially harder to drive away — even if your factory alarm,
              immobiliser, and keyless entry are defeated. It works outside your vehicle’s electronics, so
              it cannot be bypassed by the same attacks that defeat modern security.
            </p>
            <p>
              It does not replace your existing security. It adds a physical layer that thieves cannot see,
              reach, or disable with common electronic tools.
            </p>
          </div>
        </div>
        <figure>
          <img
            src="/img/relay-attack.jpg"
            alt="A person at a car door at night using a small electronic relay device"
            className="w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
          <figcaption className="mt-3 text-xs tracking-widest text-muted uppercase">
            Relay at the door. No window broken.
          </figcaption>
        </figure>
      </section>

      <section id="difference" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <img
            src="/img/unit-bench.jpg"
            alt="SENTINEL-1 machined enclosure with mechanical linkage on a workbench"
            className="w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
          <div>
            <p className="text-xs tracking-widest text-bronze uppercase">What makes it different</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Tracking tells you where your car went.
            </h2>
            <p className="mt-6 text-lg leading-7 text-fg/85">
              SENTINEL-1 is designed to stop it from going anywhere.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Most vehicle security products live inside the same electronic network thieves are already
              defeating. SENTINEL-1 does not. It is not an alarm that can be silenced. It is not an
              immobiliser that can be bypassed with the right software. It is a separate physical layer —
              designed to be where thieves aren’t looking, doing what electronic systems cannot.
            </p>
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
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg/85 via-bg/50 to-bg/10" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">What it fits</p>
          <h2 className="mt-3 max-w-xl font-display text-5xl leading-none sm:text-6xl">
            One architecture. A kit for each vehicle.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            SENTINEL-1 is designed for global application across vehicle classes via vehicle-specific
            adapter kits.
          </p>
          <ul className="mt-6 max-w-md space-y-3 text-sm leading-6">
            <li>All passenger vehicles — sedans, coupes, hatchbacks, wagons</li>
            <li>Light commercial — SUVs, pickup trucks, utes, vans</li>
            <li>Fleet and specialist — commercial vehicles, emergency services, construction, agricultural equipment</li>
          </ul>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            Not a universal-fit system. Each application uses a vehicle-specific interface kit engineered
            for that make and model. Register your vehicle to confirm availability for your platform.
          </p>
          <a
            href="#preorder"
            className="mt-8 inline-flex min-h-11 w-fit items-center border border-fg/40 px-6 text-sm tracking-widest uppercase"
          >
            Register your vehicle
          </a>
        </div>
      </section>

      <section id="operate" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-widest text-bronze uppercase">How to operate</p>
          <img
            src="/img/secure.jpg"
            alt="A driver walking away from a parked car toward a lit front door at night"
            className="mt-6 mb-8 w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
          <p className="text-xs tracking-widest text-bronze uppercase">Mode 1 — When parked</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Automatic.</h2>
          <ol className="mt-6 space-y-3 text-sm leading-6 text-fg/85">
            {PARKED.map((step, i) => (
              <li key={step}>
                <span className="mr-2 text-bronze">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:pt-16">
          <p className="text-xs tracking-widest text-bronze uppercase">Mode 2 — Next-stop</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Theft response.</h2>
          <ol className="mt-6 space-y-3 text-sm leading-6 text-fg/85">
            {NEXT_STOP.map((step, i) => (
              <li key={step}>
                <span className="mr-2 text-bronze">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-bronze pl-4 text-base leading-7">
            No change to your routine. Park, apply the brake, turn off the ignition, and walk away. The
            system handles the rest.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Key features and benefits</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
            Prevents. It does not just report.
          </h2>
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

      <section id="pricing" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-widest text-bronze uppercase">Pricing</p>
          <h2 className="mt-3 font-display text-6xl leading-none text-bronze sm:text-7xl">From $795</h2>
          <p className="mt-4 text-lg text-muted">plus fitting.</p>
          <p className="mt-6 max-w-md text-sm leading-6 text-fg/80">
            SENTINEL-1 starts at $795, plus fitting. Pricing varies by model and vehicle-specific interface
            kit. Fleet pricing available on request.
          </p>
          <h3 className="mt-10 font-display text-3xl">Warranty</h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-fg/80">
            5-year warranty on the SENTINEL-1 unit. Free replacement within the first 6 months if the unit
            fails. Fitting labour and vehicle-specific interface kits are separate from the unit warranty.
          </p>
        </div>
        <div id="preorder" className="scroll-mt-24 bg-surface p-6 sm:p-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Pre-order</p>
          <h2 className="mt-3 font-display text-5xl leading-none">First production allocation.</h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            SENTINEL-1 is entering prototype validation. Reserve your place in the first production
            allocation. Limited initial availability. Secure your unit before general release.
          </p>
          {sent ? (
            <p className="mt-8 border border-border p-6 text-sm leading-6">
              Enquiry started. If your mail app did not open, email{" "}
              <a className="underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>{" "}
              with your name, vehicle, and model.
            </p>
          ) : (
            <form
              className="mt-8 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const name = String(data.get("name") || "");
                const email = String(data.get("email") || "");
                const vehicle = String(data.get("vehicle") || "");
                const model = String(data.get("model") || "");
                const subject = encodeURIComponent("SENTINEL-1 pre-order");
                const body = encodeURIComponent(
                  `Name: ${name}\nEmail: ${email}\nVehicle: ${vehicle}\nModel: ${model}\n\nSENTINEL-1 pre-order — first production allocation.`,
                );
                setSent(true);
                window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
              }}
            >
              <label className="grid gap-2 text-xs tracking-widest text-bronze uppercase">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="min-h-11 border border-border bg-transparent px-3 text-sm tracking-normal text-fg normal-case"
                />
              </label>
              <label className="grid gap-2 text-xs tracking-widest text-bronze uppercase">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="min-h-11 border border-border bg-transparent px-3 text-sm tracking-normal text-fg normal-case"
                />
              </label>
              <label className="grid gap-2 text-xs tracking-widest text-bronze uppercase">
                Vehicle
                <input
                  required
                  name="vehicle"
                  placeholder="Make, model, year"
                  className="min-h-11 border border-border bg-transparent px-3 text-sm tracking-normal text-fg normal-case placeholder:text-muted"
                />
              </label>
              <label className="grid gap-2 text-xs tracking-widest text-bronze uppercase">
                Model
                <select
                  name="model"
                  defaultValue="SENTINEL-1 Core"
                  className="min-h-11 border border-border bg-bg px-3 text-sm tracking-normal text-fg normal-case"
                >
                  {MODELS.map((model) => (
                    <option key={model.name}>{model.name}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="mt-2 min-h-11 bg-bronze px-6 text-sm tracking-widest text-bg uppercase">
                Pre-order today
              </button>
            </form>
          )}
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Questions</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Frequently asked questions</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {FAQS.map(([q, a], i) => (
              <div key={q}>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={faq === i}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  <span className="text-base">{q}</span>
                  <span className="text-xs text-muted" aria-hidden="true">
                    {faq === i ? "–" : "+"}
                  </span>
                </button>
                {faq === i && <p className="pb-5 text-sm leading-6 text-muted">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs tracking-widest text-bronze uppercase">Partnership and development</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">We’re seeking partners.</h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-fg/85">
            PROJECT SENTINEL-1 is currently at prototype stage — architectural design and engineering
            diligence are complete, but the unit has not yet been tested in real-world conditions.
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
              SENTINEL-1 is a prototype concept only. No public-road testing or fleet deployment will occur
              without written independent safety authorization. Progression through our development programme
              is gated — each stage requires documented evidence and independent approval.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              If your organisation can provide technical expertise, test access, manufacturing capability,
              fleet vehicles for pilot evaluation, or funding pathways, we welcome a technical discovery
              discussion.
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

      <footer id="contact" className="relative overflow-hidden border-t border-border">
        <img src="/img/world-map.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/35" />
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
          Confidential and concept-stage. This material is provided for preliminary evaluation only. No
          prototype performance, certification, or commercial offering is implied. © 2026 PROJECT SENTINEL-1.
          All rights reserved.
        </p>
      </footer>
    </main>
  );
}
