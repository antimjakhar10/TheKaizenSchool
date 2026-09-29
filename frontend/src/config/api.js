export const BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export const API_URL = `${BASE_URL}/api`;

/**
 * Helper to get absolute asset URL for files served by backend
 * @param {string} path - Relative path or full URL
 * @returns {string} - Full valid URL
 */
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

export default API_URL;