const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

let isRefreshing = false;

export async function fetchWithAuth(input: string, init: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem("token");

  const res = await fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status !== 401) return res;

  if (isRefreshing) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return res;
  }

  isRefreshing = true;
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const refresh = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refresh.ok) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      return res;
    }

    const { accessToken } = await refresh.json();
    localStorage.setItem("token", accessToken);

    return fetch(input, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } finally {
    isRefreshing = false;
  }
}