const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3001";

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(errorBody.message || "Request failed");
    error.response = {
      status: response.status,
      data: errorBody,
    };
    throw error;
  }

  const data = await response.json();
  return { data };
};

export const apiClient = {
  get: (endpoint, options) => fetchWithAuth(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) => fetchWithAuth(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body, options) => fetchWithAuth(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint, options) => fetchWithAuth(endpoint, { ...options, method: "DELETE" }),
};

export const attachToken = () => {
  // No-op for fetch implementation as token is read from localStorage on every request
};
