/** Prefix public asset paths with Vite base (needed on GitHub Pages). */
export function asset(path) {
  const cleaned = String(path || "").replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${cleaned}`;
}
