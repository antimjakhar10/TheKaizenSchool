import API_URL from "../config/api";

export const getPublicHero = async () => {
  try {
    const res = await fetch(`${API_URL}/hero`);
    const data = await res.json();
    return data.success ? data.hero : null;
  } catch (err) {
    console.error("Fetch Hero Error:", err);
    return null;
  }
};

export const getPublicAbout = async () => {
  try {
    const res = await fetch(`${API_URL}/about`);
    const data = await res.json();
    return data.success ? data.about : null;
  } catch (err) {
    console.error("Fetch About Error:", err);
    return null;
  }
};

export const getPublicAcademics = async () => {
  try {
    const res = await fetch(`${API_URL}/academics`);
    const data = await res.json();
    return data.success ? data.academics : null;
  } catch (err) {
    console.error("Fetch Academics Error:", err);
    return null;
  }
};

export const getPublicFacilities = async () => {
  try {
    const res = await fetch(`${API_URL}/facilities`);
    const data = await res.json();
    return data.success ? { facilities: data.facilities, pageInfo: data.pageInfo } : null;
  } catch (err) {
    console.error("Fetch Facilities Error:", err);
    return null;
  }
};

export const getPublicGallery = async () => {
  try {
    const res = await fetch(`${API_URL}/gallery`);
    const data = await res.json();
    return data.success ? data.items : null;
  } catch (err) {
    console.error("Fetch Gallery Error:", err);
    return null;
  }
};

export const getPublicTestimonials = async () => {
  try {
    const res = await fetch(`${API_URL}/testimonials`);
    const data = await res.json();
    return data.success ? data.testimonials : null;
  } catch (err) {
    console.error("Fetch Testimonials Error:", err);
    return null;
  }
};

export const getPublicEvents = async () => {
  try {
    const res = await fetch(`${API_URL}/events`);
    const data = await res.json();
    return data.success ? data.events : null;
  } catch (err) {
    console.error("Fetch Events Error:", err);
    return null;
  }
};

export const getPublicSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/settings`);
    const data = await res.json();
    return data.success ? data.settings : null;
  } catch (err) {
    console.error("Fetch Settings Error:", err);
    return null;
  }
};

export const getPublicAdmissions = async () => {
  try {
    const res = await fetch(`${API_URL}/admissions`);
    const data = await res.json();
    return data.success ? data.admissions : null;
  } catch (err) {
    console.error("Fetch Admissions Error:", err);
    return null;
  }
};

export const submitPublicEnquiry = async (formData) => {
  const res = await fetch(`${API_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to submit enquiry");
  }
  return data;
};
