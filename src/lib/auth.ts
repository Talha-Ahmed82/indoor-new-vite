// Simple localStorage-based auth (dummy/demo)
const KEY = "indoorgo_auth";

export type AuthUser = {
  ownerName: string;
  indoorName: string;
  email: string;
  phone?: string;
  category?: string;
  logo?: string;
  city?: string;
};

export function getAuth(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setAuth(user: AuthUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("indoorgo-auth-change"));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("indoorgo-auth-change"));
}

export function isAuthed() {
  return !!getAuth();
}
