import { siteConfig } from "../data/siteConfig.js";

const marks = [
  {
    title: "Turning challenges into solutions",
    note: "I enjoy analyzing technical challenges, identifying the root cause of issues, and developing practical solutions that make applications more effective and user-friendly.",
  },
  {
    title: "Growing together as a team",
    note: "I value teamwork, clear communication, and continuous learning. I enjoy sharing ideas, accepting feedback, and working together to build better products.",
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="portrait-stage">
          <img src={siteConfig.profileImage} alt="Portrait of Vallamsetti Sairamya" className="portrait" />
        </div>
        <div>
          <span className="kicker">PROFILE</span>
          <h2 className="display">A LITTLE<br />ABOUT ME.</h2>
          <p className="muted" style={{ maxWidth: "62ch" }}>{siteConfig.about}</p>
          <p>{siteConfig.name} · {siteConfig.location}</p>
          <div className="stats">
            {marks.map((mark) => (
              <article className="stat" key={mark.title}>
                <b>{mark.title}</b>
                <span className="muted">{mark.note}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
