import API_URL from "../config/api";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Unable to login");
  }
  return data;
};

export const getAdminProfile = async (token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: getHeaders(token),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }
  return data;
};

// Generic Admin API helper
export const fetchAdminData = async (endpoint, token) => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch data");
  return data;
};

export const updateAdminData = async (endpoint, method, payload, token) => {
  const options = {
    method: method || "POST",
    headers: getHeaders(token),
  };
  if (payload) {
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(`${API_URL}/${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Action failed");
  return data;
};