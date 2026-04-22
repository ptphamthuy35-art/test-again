const WORKS = [
  {
    title: "Fragments",
    year: "2026",
    role: "Design + Front-end",
    stack: ["Figma", "HTML/CSS", "JS"],
    summary:
      "A minimal portfolio system with bold type, framed imagery, and lightweight interactions.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Jooma",
    year: "2025",
    role: "Product design",
    stack: ["Design system", "Prototyping"],
    summary:
      "A clean ecommerce experience with a modular component library and tight rhythm.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Adidas — Studio",
    year: "2024",
    role: "Brand + Web",
    stack: ["Brand", "Web", "Motion"],
    summary:
      "An editorial landing page emphasizing typography, whitespace, and content-first structure.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1520975867597-0f7ac21adf11?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Lacoste — Campaign",
    year: "2023",
    role: "Creative dev",
    stack: ["WebGL (lite)", "Animation"],
    summary:
      "A campaign microsite that balances motion with performance and readability.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1520975693411-b5b69aefc9ae?auto=format&fit=crop&w=1800&q=80",
  },
];

function qs(sel, el = document) {
  return el.querySelector(sel);
}

function setYear() {
  const el = qs("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function renderWorks() {
  const list = qs("#worksList");
  const img = qs("#workPreviewImg");
  const details = qs("#workDetails");
  if (!list || !img || !details) return;

  list.innerHTML = "";

  WORKS.forEach((w, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "works__item";
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", "false");
    btn.dataset.index = String(idx);

    const name = document.createElement("span");
    name.className = "works__name";
    name.textContent = w.title;

    const meta = document.createElement("span");
    meta.className = "works__meta";
    meta.textContent = w.year;

    btn.append(name, meta);
    li.append(btn);
    list.append(li);
  });

  function select(index) {
    const safe = Math.max(0, Math.min(WORKS.length - 1, index));
    const w = WORKS[safe];

    qsAll(".works__item", list).forEach((b) => b.setAttribute("aria-selected", "false"));
    const active = list.querySelector(`.works__item[data-index="${safe}"]`);
    if (active) active.setAttribute("aria-selected", "true");

    img.src = w.image;
    img.alt = `${w.title} preview image.`;

    details.innerHTML = `
      <h3>${escapeHtml(w.title)}</h3>
      <p>${escapeHtml(w.summary)}</p>
      <div class="row">
        <span class="pill">${escapeHtml(w.year)}</span>
        <span class="pill">${escapeHtml(w.role)}</span>
        ${w.stack.map((s) => `<span class="pill">${escapeHtml(s)}</span>`).join("")}
      </div>
      ${
        w.href && w.href !== "#"
          ? `<p style="margin-top:12px"><a class="text-link" href="${escapeAttr(
              w.href,
            )}" target="_blank" rel="noreferrer">View case study</a></p>`
          : ""
      }
    `;
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".works__item");
    if (!btn) return;
    select(Number(btn.dataset.index || "0"));
  });

  select(0);
}

function qsAll(sel, el = document) {
  return Array.from(el.querySelectorAll(sel));
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll("`", "&#096;");
}

function setupMenu() {
  const btn = qs(".menu-btn");
  const overlay = qs("#menu");
  if (!btn || !overlay) return;

  function open() {
    overlay.setAttribute("data-open", "true");
    overlay.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.removeAttribute("data-open");
    overlay.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    const isOpen = overlay.getAttribute("data-open") === "true";
    if (isOpen) close();
    else open();
  });

  overlay.addEventListener("click", (e) => {
    const link = e.target.closest?.("a");
    const inner = e.target.closest?.(".overlay__inner");
    if (link) close();
    else if (!inner) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setupContactForm() {
  const form = qs("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry — ${name || "Hello"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}\n`);

    // Uses the email shown in the page (single source of truth).
    const emailLink = qs('[data-field="email"]');
    const to = emailLink?.getAttribute("href")?.replace(/^mailto:/, "") || "hello@example.com";

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

setYear();
renderWorks();
setupMenu();
setupContactForm();
