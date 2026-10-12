import { asset } from "../utils/asset.js";

export const siteConfig = {
  name: "Vallamsetti Sairamya",
  shortName: "Sairamya",
  location: "Hyderabad, India",
  email: "vallamsettisairamya@gmail.com",
  // Present in the existing portfolio. Clear a value to hide that link.
  github: "https://github.com/flintnthread/ecommerce-mobile",
  linkedin: "https://www.linkedin.com/in/sairamya-vallamsetti-b84757249/",
  profileImage: asset("profile.jpg"),
  heroImage: asset("hero-plain.png"),
  resume: asset("resume.pdf"),
  // Drop the files in /public, then set these to true. Empty requests are avoided until then.
  walkingVideo: asset("walking-girl.mp4"),
  walkingPoster: asset("walking-girl-poster.jpg"),
  enableWalkingVideo: false,
  enableWalkingPoster: false,
  about:
    "Detail-oriented and tech-savvy Computer Science graduate with a strong foundation in system troubleshooting, network support and full stack development.",
  heroSummary:
    "Computer Science graduate and full stack developer focused on building responsive interfaces, scalable applications and meaningful digital experiences.",
  contactNote: "Looking for an opportunity to contribute, learn and build meaningful digital experiences.",
};
