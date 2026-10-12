import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects, sellerShots, storefrontShots } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

function Modal({ project, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-back" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div className="project-no">PROJECT {project.number}</div>
            <h3 id="project-title">{project.title}</h3>
          </div>
          <button ref={closeRef} className="close-x" type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className="muted">{project.description}</p>
        <h4>TECHNOLOGIES</h4>
        <div className="tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h4>FEATURES</h4>
        <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <h4>LINKS</h4>
        {project.live ? (
          <a className="site-link" href={project.live} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {project.visual === "seller" ? (
                <>
                  <path d="M4 10.5 6.2 5.5h11.6L20 10.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M5 10.5h14V19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10 20v-5h4v5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </>
              ) : (
                <>
                  <circle cx="9" cy="19" r="1.2" fill="currentColor" />
                  <circle cx="17" cy="19" r="1.2" fill="currentColor" />
                  <path d="M4 5h2.2l1.5 9.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 8H7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </>
              )}
            </svg>
            {project.live}
          </a>
        ) : <p className="muted">Link not added yet.</p>}
      </div>
    </div>,
    document.body
  );
}

function ShotZoom({ shot, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [onClose]);

  return createPortal(
    <div className="shot-zoom" onClick={onClose} role="presentation">
      <button ref={closeRef} className="close-x shot-zoom-close" type="button" onClick={onClose} aria-label="Close image">×</button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={shot.src} alt={shot.alt} />
        <figcaption>{shot.alt}</figcaption>
      </figure>
    </div>,
    document.body
  );
}

function StorefrontReel({ shots, label }) {
  const [shot, setShot] = useState(null);
  const loop = [...shots, ...shots];
  return (
    <>
      <div className="shot-reel" aria-label={label}>
        <div className="shot-track">
          {loop.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              className="shot-frame"
              type="button"
              aria-label={`Open ${item.alt}`}
              onClick={() => setShot(item)}
            >
              <img src={item.src} alt={index < shots.length ? item.alt : ""} />
            </button>
          ))}
        </div>
      </div>
      {shot ? <ShotZoom shot={shot} onClose={() => setShot(null)} /> : null}
    </>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="work-head">
          <div>
            <span className="kicker">PORTFOLIO</span>
            <h2 className="display">SELECTED<br />WORK.</h2>
          </div>
          <p className="muted">Customer shopping and seller tools for Flint &amp; Thread.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-block" key={project.id}>
              <ProjectCard project={project} onOpen={setOpen} />
              {project.visual === "commerce" ? <StorefrontReel shots={storefrontShots} label="Flint & Thread storefront" /> : null}
              {project.visual === "seller" ? <StorefrontReel shots={sellerShots} label="Flint & Thread seller application" /> : null}
            </div>
          ))}
        </div>
      </div>
      {open ? <Modal project={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
