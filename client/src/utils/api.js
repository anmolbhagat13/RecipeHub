const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = async (endpoint, options = {}) => {
  const headers = new Headers(options.headers);

  // Set default headers for JSON requests
  headers.set("Accept", "application/json");

  // Don't set Content-Type for FormData
  if (
    options.body &&
    typeof options.body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers,
  });

  // Handle empty and non-JSON responses
  const contentType = response.headers.get("content-type");

  let data = null;

  if (response.status !== 204) {
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  }

  // Handle API errors
  if (!response.ok) {
    throw new Error(
      data?.message || data || "Something went wrong"
    );
  }

  return data;
};
