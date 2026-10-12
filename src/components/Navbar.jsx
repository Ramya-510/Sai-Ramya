import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about", icon: "about" },
  { label: "Skills", href: "#skills", icon: "skills" },
  { label: "Work", href: "#work", icon: "work" },
  { label: "Education", href: "#education", icon: "education" },
  { label: "Contact", href: "#contact", icon: "contact" },
];

function NavIcon({ name }) {
  const common = { className: "nav-ico", viewBox: "0 0 24 24", "aria-hidden": true };
  if (name === "about") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5.2 19.2c1.3-3.1 3.6-4.6 6.8-4.6s5.5 1.5 6.8 4.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "skills") {
    return (
      <svg {...common}>
        <path d="M8 8.5 4.8 12 8 15.5M16 8.5 19.2 12 16 15.5M13.2 6.5l-2.4 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "work") {
    return (
      <svg {...common}>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 7.5V6.2A1.7 1.7 0 0 1 10.7 4.5h2.6A1.7 1.7 0 0 1 15 6.2v1.3M3.5 12.5h17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "education") {
    return (
      <svg {...common}>
        <path d="M3 10 12 5.5 21 10 12 14.5 3 10Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 12.2V16c1.5 1.4 3.1 2.1 5 2.1s3.5-.7 5-2.1v-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 7 7.5 6L19.5 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function go(event, href) {
  event.preventDefault();
  document.body.classList.remove("menu-open");
  const el = document.querySelector(href);
  if (!el) return;
  const mobile = window.matchMedia("(max-width: 1100px)").matches;
  if (!mobile && window.__lenis) {
    window.__lenis.start();
    window.__lenis.scrollTo(el, { offset: -96 });
    return;
  }
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 96);
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (window.__lenis) {
      if (open) window.__lenis.stop();
      else window.__lenis.start();
    }
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#top" data-cursor="link" onClick={(e) => { setOpen(false); go(e, "#top"); }}>
        <span className="brand-sur">Vallamsetti</span>
        <span className="brand-given">Sai Ramya</span>
      </a>
      <button className={`menu-btn${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
      <nav className={`nav-links${open ? " is-open" : ""}`} aria-label="Primary">
        {links.map(({ label, href, icon }) => (
          <a key={href} href={href} data-cursor="link" onClick={(e) => { setOpen(false); go(e, href); }}>
            <NavIcon name={icon} />
            {label.toUpperCase()}
          </a>
        ))}
      </nav>
    </header>
  );
}
