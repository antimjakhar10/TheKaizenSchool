const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://api.dedivinedecor.in"
    : "http://localhost:5000");

export const API_URL = `${BASE_URL.replace(/\/+$/, "")}/api`;

export default API_URL;