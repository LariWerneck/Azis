export function getApiUrl(path: string) {
  const base = (import.meta.env.VITE_API_URL as string) || `${window.location.protocol}//${window.location.hostname}:3000`
  return `${base.replace(/\/$/, "")}${path}`
}

export function getAuthHeaders() {
  const token = localStorage.getItem("azis_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function getApiOptions(options: RequestInit = {}): RequestInit {
  const extraHeaders = options.headers ? { ...(options.headers as Record<string, string>) } : {}
  return {
    credentials: "include",
    ...options,
    headers: {
      ...extraHeaders,
      ...getAuthHeaders(),
    },
  }
}

export function fetchApi(path: string, options: RequestInit = {}) {
  return fetch(getApiUrl(path), getApiOptions(options))
}
