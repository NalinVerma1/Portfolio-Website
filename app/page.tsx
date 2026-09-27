import Scene from "@/components/v3/Scene";

const NAV = [
  { n: "01", t: "About", href: "#about" },
  { n: "02", t: "Work", href: "#work" },
  { n: "03", t: "Building", href: "#building" },
  { n: "04", t: "Markets", href: "#markets" },
  { n: "05", t: "Contact", href: "#contact" },
];

const ROLES = [
  {
    org: "SHARE Lab",
    href: "https://uwshare-lab.ca",
    role: "Undergraduate Research Assistant",
    meta: "Human-AI interaction · University of Waterloo",
    body: "I work in the SHARE Lab at the University of Waterloo, led by Prof. Sharon Ferguson. We study the human-facing benchmarks used to judge frontier AI, the ones where people write the items or make the calls. The aim is to pin down what these benchmarks catch and what they miss, then build better ones.",
    when: "Sep 2026 → now",
    live: true,
  },
  {
    org: "Click A Diet",
    href: "https://www.clickadiet.com",
    role: "Co-founder",
    meta: "AI nutrition platform",
    body: "I launched an AI service that emails subscribers a personalised 28-day diet plan every month, now reaching around 200 paying customers. Quality was the hard part. I built an evaluation harness that pairs each generated plan with a blind second-model recheck, lifting the pass rate from 5% to 89%. A verification layer sits in front of the customer and blocks any plan failing a calorie floor, a macro target or a condition-specific limit, which cut nutritional error by roughly 95%.",
    when: "Mar 2025 → now",
    live: true,
  },
  {
    org: "Tiger Analytics",
    href: "",
    role: "Analytics Consulting Intern",
    meta: "Banking & Financial Services · Santa Clara, USA",
    body: "I turned transaction-level records into model-ready customer features, writing SQL and Python pipelines that leaned on window functions and CTEs over large banking datasets. That work fed a client's personalized-offer project: I assembled the customer dataset behind the logic deciding which offer each customer saw, and through which channel. Every deliverable shipped with its methodology, assumptions and findings documented, so a reviewer could trace the path from raw data to final output.",
    when: "May → Aug 2026",
    live: false,
  },
  {
    org: "WAT.ai",
    href: "https://insightpulse-watai.vercel.app",
    role: "ML Researcher, InsightPulse",
    meta: "Cross-asset financial intelligence",
    body: "I built the team's baseline regression model in scikit-learn, mapping 8 macroeconomic indicators onto 6 market targets across 10 years of monthly data. The more useful result was a negative one: I found CBOE Volatility Index data leaking into the equity targets, which had inflated our test R² to +0.30. Removing it revealed the true value of −0.52, and that honest baseline is what the rest of the work now builds on.",
    when: "Jan 2026 → now",
    live: true,
  },
  {
    org: "Purple MicroPort Cardiovascular",
    href: "",
    role: "Operations & Corporate Intern",
    meta: "Medical devices",
    body: "My first time using data to drive operational decisions in a regulated industry. I wrote Excel VBA scripts that automated budgeting and cost-tracking during finance reviews, cutting about 20% off the monthly reporting cycle, then broke spend down across cost centres so the finance and operations team could see where costs were actually concentrated.",
    when: "May → Aug 2024",
    live: false,
  },
];


const BUILDING = [
  {
    k: "Research",
    t: "InsightPulse",
    d: "A cross-asset financial intelligence platform. Baseline regression mapping 8 macroeconomic indicators onto 6 market targets over a decade of monthly data, plus the leakage audit that kept the result honest.",
    s: "Caught VIX leakage inflating test R² to +0.30; true value −0.52.",
    m: "WAT.ai · Jan 2026 → now",
    href: "https://insightpulse-watai.vercel.app",
  },
  {
    k: "Project",
    t: "Investment Decision Support System",
    d: "A Python and Google Sheets investment engine that ingests live market data, applies portfolio constraints, and selects allocations across 10 asset classes.",
    s: "Ranks portfolios by worst-case rather than expected return; Gemini explains each allocation.",
    m: "Dec 2025",
    href: "https://github.com/NalinVerma1/ai-investment-allocation-engine",
  },
  {
    k: "Startup",
    t: "Click A Diet",
    d: "A nutrition platform running two ways at once: AI-generated personalised diet plans and one-on-one expert dietician consults, under one roof.",
    s: "~200 paying customers; plan pass rate lifted 5% to 89%.",
    m: "Co-founder · Mar 2025 → now",
    href: "https://www.clickadiet.com",
  },
  {
    k: "Paper",
    t: "Digital Gaming & Teen Health",
    d: "Designed the survey and analysed responses from 355 teenagers for a peer-reviewed study on the health effects of digital gaming, with Dr. Vinay Goyal, Director of Neurology at Medanta, The Medicity.",
    s: "Survey design, statistical analysis, academic writing.",
    m: "Int'l Journal of Advanced Research · Aug 2023",
    href: "https://journalijar.com/article/46222",
  },
];

/* Facts panel. A row is [label, value(s), note]: two awards of the same
   standing are two values, not a value and a subtitle. */
const FACTS: [string, string | string[], string?][] = [
  ["Degree", "BASc Management Engineering"],
  ["School", "University of Waterloo"],
  ["Grad", "April 2030, co-op"],
  ["Standing", "87.67% term avg \u00b7 Term Distinction"],
  [
    "Awards",
    [
      "President's Scholarship of Distinction",
      "Engineering International Student Award",
    ],
    "$13,500 total",
  ],
  [
    "Summer 2025",
    "London School of Economics and Political Science",
    "AI for Business (A\u2212)",
  ],
  ["Home", "Waterloo, Canada"],
];

const SKILLS = [
  ["Languages & Databases", "Python (pandas, NumPy, scikit-learn) · SQL (window functions, CTEs, joins) · R · VBA"],
  ["Machine Learning & AI", "Regression · Model evaluation · Benchmark auditing · LLM integration · Evaluation harnesses"],
  ["Systems & Tooling", "PostgreSQL · Supabase · Vercel · Git · Excel (advanced)"],
];

export default function V3() {
  return (
    <div className="v3-root">
      {/* fixed 3D artifact behind everything */}
      <Scene className="pointer-events-none fixed inset-0 z-[1]" />
      <div className="v3-vignette pointer-events-none fixed inset-0 z-[2]" />

      <main className="relative z-10">
        {/* ── masthead ─────────────────────────────── */}
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-end gap-8 overflow-hidden px-6 py-6 sm:px-10">
          <div className="hidden min-w-0 shrink gap-7 md:flex">
            {NAV.map((i) => (
              <a
                key={i.n}
                href={i.href}
                className="whitespace-nowrap text-[13px] text-[var(--v3-dim)] transition-colors hover:text-[var(--v3-fg)]"
              >
                {i.t}
              </a>
            ))}
          </div>
        </nav>

        {/* ── hero ─────────────────────────────────── */}
        <header className="relative">
          <div className="mx-auto flex min-h-[calc(100svh-84px)] max-w-7xl flex-col justify-center px-6 pb-24 sm:px-10">
          <h1 className="v3-display text-[clamp(3.4rem,9.5vw,8.5rem)] leading-[0.88] tracking-[-0.05em]">
            Nalin
            <br />
            Verma
          </h1>

          <p className="v3-veil mt-9 max-w-[24ch] text-[clamp(1.35rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.02em] text-[var(--v3-fg)]">
            I build applied AI, and I point it at{" "}
            <em className="v3-em">markets</em>.
          </p>

          <p className="v3-veil mt-7 max-w-[46ch] text-[clamp(1rem,1.25vw,1.1rem)] leading-[1.65] text-[var(--v3-muted)]">
            I&rsquo;m a Management Engineering student at Waterloo. I like the
            part where a messy pile of text turns into something you can
            actually act on, and I put my own money behind the thesis,
            which is a good way to find out fast when I&rsquo;m wrong.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
            {[
              ["GitHub", "https://github.com/NalinVerma1"],
              ["LinkedIn", "https://www.linkedin.com/in/nalinv11/"],
              ["Email", "mailto:nalin.verma@uwaterloo.ca"],
            ].map(([l, h]) => (
              <a
                key={l}
                href={h}
                target={h.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="border-b border-[var(--v3-line)] pb-1 text-[14px] text-[var(--v3-dim)] transition-colors hover:border-[var(--v3-fg)] hover:text-[var(--v3-fg)]"
              >
                {l}
              </a>
            ))}
          </div>


          </div>
        </header>

        {/* ── 01 about ─────────────────────────────── */}
        <Section id="about" n="01" title="About">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="flex flex-col gap-10 sm:flex-row sm:items-start md:col-span-7">
            <p className="v3-veil order-1 flex-1 text-[clamp(1.15rem,1.9vw,1.6rem)] leading-[1.45] text-[var(--v3-fg)] sm:order-2">
              I spent this summer building data and AI solutions for banking
              clients at <em className="v3-em">Tiger Analytics</em>{" "}
              in Santa Clara.
              This term I&rsquo;m a research assistant in Waterloo&rsquo;s{" "}
              <em className="v3-em">SHARE Lab</em>, working with Prof. Sharon
              Ferguson on whether the benchmarks we use to judge frontier AI
              measure what they say they do. I&rsquo;m also an ML researcher at
              WAT.ai on{" "}
              <em className="v3-em">InsightPulse</em>, and co-founder of{" "}
              <em className="v3-em">Click A Diet</em>, an AI nutrition platform with
              ~200 paying customers. My interest sits at one intersection: applied
              AI, capital markets, and the discipline of putting real money into
              live ones.
            </p>

            {/* Full frame at its native ratio and desaturated, so the bright
                plate reads as a deliberate monochrome insert on the dark page. */}
            <figure className="v3-portrait order-2 w-full max-w-[240px] shrink-0 sm:order-1">
              <div className="relative aspect-[800/1239] w-full overflow-hidden rounded-sm border border-[var(--v3-line)]">
                <img
                  src="/portrait.jpg"
                  alt="Nalin Verma"
                  width={800}
                  height={1239}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            </div>

            {/* Opaque plate: the point cloud runs behind this column and the
                labels are faint by design, so the panel gives them a ground to
                sit on instead of competing with the particles. */}
            <div className="self-start rounded-sm border border-[var(--v3-line)] bg-[var(--v3-bg)] p-6 md:col-span-4 md:col-start-9">
            <dl className="v3-mono space-y-3 text-[12px]">
              {FACTS.map(([k, v, note]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-dashed border-[var(--v3-line)] pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="shrink-0 uppercase tracking-[0.2em] text-[var(--v3-dim)]">
                    {k}
                  </dt>
                  <dd className="text-right text-[var(--v3-muted)]">
                    {(Array.isArray(v) ? v : [v]).map((line) => (
                      <span key={line} className="block first:mt-0 mt-1.5">
                        {line}
                      </span>
                    ))}
                    {note ? (
                      <span className="mt-1 block text-[11px] text-[var(--v3-faint)]">
                        {note}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-[var(--v3-line)] bg-[var(--v3-line)] md:grid-cols-3">
            {SKILLS.map(([k, v]) => (
              <div key={k} className="bg-[var(--v3-bg)] p-7">
                <div className="v3-mono text-[10px] uppercase tracking-[0.28em] text-[var(--v3-warm)]">
                  {k}
                </div>
                <p className="v3-mono mt-4 text-[12px] leading-[1.9] text-[var(--v3-muted)]">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 02 work ──────────────────────────────── */}
        <Section id="work" n="02" title="Work history">
          <div className="divide-y divide-[var(--v3-line)]">
            {ROLES.map((r) => (
              <article
                key={r.org}
                className="v3-row v3-veil group grid gap-4 py-8 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-5">
                  <h3 className="v3-display text-[1.6rem] leading-tight tracking-[-0.02em]">
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-2 transition-colors hover:text-[var(--v3-warm)]"
                      >
                        {r.org}
                        <span className="text-[0.75rem] text-[var(--v3-faint)]">↗</span>
                      </a>
                    ) : (
                      r.org
                    )}
                  </h3>
                  <div className="v3-mono mt-2 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-[var(--v3-faint)]">
                    {r.live && <span className="v3-pulse h-1 w-1 rounded-full bg-[var(--v3-cool)]" />}
                    {r.when}
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="text-[var(--v3-fg)]">{r.role}</div>
                  <div className="v3-mono mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--v3-faint)]">
                    {r.meta}
                  </div>
                  <p className="mt-4 max-w-2xl leading-[1.75] text-[var(--v3-muted)]">
                    {r.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ── 03 building ──────────────────────────── */}
        <Section id="building" n="03" title="Things I'm building">
          <div className="grid gap-px overflow-hidden rounded-sm border border-[var(--v3-line)] bg-[var(--v3-line)] sm:grid-cols-2">
            {BUILDING.map((b) => (
              <article
                key={b.t}
                className="v3-card group bg-[var(--v3-bg)] p-8 transition-colors hover:bg-[var(--v3-bg-2)]"
              >
                <div className="v3-mono text-[10px] uppercase tracking-[0.28em] text-[var(--v3-warm)]">
                  {b.k}
                </div>
                <h3 className="v3-display mt-4 text-[1.75rem] leading-tight tracking-[-0.02em]">
                  {b.href ? (
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline gap-2 transition-colors hover:text-[var(--v3-warm)]"
                    >
                      {b.t}
                      <span className="text-[0.8rem] text-[var(--v3-faint)]">↗</span>
                    </a>
                  ) : (
                    b.t
                  )}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--v3-muted)]">{b.d}</p>
                <div className="v3-mono mt-6 border-t border-[var(--v3-line)] pt-4 text-[11px] text-[var(--v3-dim)]">
                  {b.s}
                </div>
                <div className="v3-mono mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--v3-faint)]">
                  {b.m}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ── 04 markets ───────────────────────────── */}
        <Section id="markets" n="04" title="What the money is doing">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.6] text-[var(--v3-muted)] md:col-span-7">
              A personal portfolio kept since June 2025. Real money, modest sums,
              tracked carefully. The exposure is ETF-driven and thematic: broad
              indexes, precious metals, US tech, and one targeted bet on defence.
              It is a small sum. The point is the process.
            </p>
            <dl className="v3-mono space-y-3 text-[12px] md:col-span-4 md:col-start-9">
              {[
                ["Since", "June 2025"],
                ["Holdings", "5 sectors, ETFs"],
                ["Return", "+19%"],
                ["Horizon", "5 years plus"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-dashed border-[var(--v3-line)] pb-3"
                >
                  <dt className="uppercase tracking-[0.2em] text-[var(--v3-faint)]">{k}</dt>
                  <dd className="text-right text-[var(--v3-muted)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[var(--v3-line)] bg-[var(--v3-line)] sm:grid-cols-5">
            {[
              ["01", "Broad market", "Core", "The base the rest sits on."],
              ["02", "Gold", "Hedge", "Carry for the tail."],
              ["03", "Silver", "Hedge", "The same trade, more beta."],
              ["04", "Nasdaq 100", "US tech", "Where the growth still is."],
              ["05", "Defence", "Thematic", "A policy cycle, not a whim."],
            ].map(([n, name, tag, note]) => (
              <div key={n} className="flex flex-col bg-[var(--v3-bg)] p-6">
                <div className="v3-mono text-[10px] text-[var(--v3-faint)]">{n}</div>
                <div className="mt-3 text-[1.05rem] text-[var(--v3-fg)]">{name}</div>
                <div className="v3-mono mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--v3-warm)]">
                  {tag}
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--v3-dim)]">
                  {note}
                </p>
              </div>
            ))}
          </div>

          {/* the thesis, which is the part actually worth reading */}
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {[
              [
                "Why ETFs, mostly",
                "At my size, any edge from individual stock picking gets eaten by execution friction and the urge to fiddle. ETFs let me express a thematic view with single-digit expense ratios, no idiosyncratic blow-up risk, and a process I can actually stick to.",
              ],
              [
                "Why I'm holding defence",
                "Defence is in a structural reshoring cycle globally: multi-decade capex commitments, indigenization mandates across major economies, a long order book. It is policy-backed rather than cyclical, and the thesis plays out across European primes, US defence, or any clean expression of the trade.",
              ],
            ].map(([h, body]) => (
              <div key={h}>
                <h3 className="v3-display text-[1.35rem] tracking-[-0.02em] text-[var(--v3-fg)]">
                  {h}
                </h3>
                <p className="mt-4 leading-[1.75] text-[var(--v3-muted)]">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--v3-line)] pt-10">
            <div className="v3-mono mb-6 text-[10px] uppercase tracking-[0.3em] text-[var(--v3-faint)]">
              The rules
            </div>
            <ol className="max-w-3xl">
              {[
                "Process before picks.",
                "Uncorrelated bets.",
                "If it's not a 5-year hold, it's not a buy.",
                "Cash is a position.",
                "Don't fiddle.",
              ].map((r, i) => (
                <li
                  key={r}
                  className="flex items-baseline gap-6 border-b border-dashed border-[var(--v3-line)] py-4 last:border-0"
                >
                  <span className="v3-mono text-[11px] text-[var(--v3-warm)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.05rem] text-[var(--v3-fg)]">{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="v3-mono mt-10 text-[10px] uppercase tracking-[0.24em] text-[var(--v3-faint)]">
            Five sectors, ETF-driven. Not investment advice.
          </p>
        </Section>

        {/* ── 05 contact ───────────────────────────── */}
        <Section id="contact" n="05" title="Write to me">
          <p className="v3-veil max-w-2xl text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.4] text-[var(--v3-fg)]">
            I&rsquo;m looking for an Applied AI / ML Engineering internship for{" "}
            <em className="v3-em">Winter 2027</em>{" "}
            at firms that take both AI and
            capital markets seriously. If that sounds like you, I&rsquo;d love to
            talk.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[var(--v3-line)] bg-[var(--v3-line)] sm:grid-cols-3">
            {[
              ["GitHub", "@NalinVerma1", "https://github.com/NalinVerma1"],
              ["LinkedIn", "in/nalinv11", "https://www.linkedin.com/in/nalinv11/"],
              ["Email", "nalin.verma@uwaterloo.ca", "mailto:nalin.verma@uwaterloo.ca"],
            ].map(([l, v, h]) => (
              <a
                key={l}
                href={h}
                target={h.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group bg-[var(--v3-bg)] p-8 transition-colors hover:bg-[var(--v3-bg-2)]"
              >
                <div className="v3-mono text-[10px] uppercase tracking-[0.28em] text-[var(--v3-faint)]">
                  {l}
                </div>
                <div className="mt-3 flex items-baseline gap-2 text-[var(--v3-fg)]">
                  <span className="group-hover:text-[var(--v3-warm)]">{v}</span>
                  <span className="text-[var(--v3-faint)] transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="v3-mono mt-24 flex items-center justify-between border-t border-[var(--v3-line)] pt-6 text-[10px] uppercase tracking-[0.25em] text-[var(--v3-faint)]">
            <span>Nalin Verma · 2026</span>
            <span>Waterloo, Canada</span>
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-28 sm:px-10 md:py-36">
      <div className="v3-mono mb-14 flex items-baseline gap-4 text-[11px] uppercase tracking-[0.3em]">
        <span className="text-[var(--v3-warm)]">{n}</span>
        <span className="text-[var(--v3-dim)]">{title}</span>
        <span className="ml-2 h-px flex-1 bg-[var(--v3-line)]" />
      </div>
      {children}
    </section>
  );
}
