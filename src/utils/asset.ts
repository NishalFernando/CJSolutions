/** Prefix a /public path with the site's base URL (needed when hosted under a sub-path, e.g. GitHub Pages). */
export const asset = (path: string) =>
  path.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + path : path
