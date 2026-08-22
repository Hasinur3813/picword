import Cookies from "js-cookie";
import type { IUser, UserRole } from "@/types";

export const AUTH_COOKIE_KEYS = {
  TOKEN: "picword_auth_token",
  USER: "picword_auth_user",
  ROLE: "picword_user_role",
} as const;

/**
 * Save auth credentials to cookies and localStorage for SSR proxy / client sync.
 */
export const setAuthCookies = (
  token: string,
  user: IUser,
  rememberMe: boolean = true
) => {
  const expires = rememberMe ? 30 : 1; // 30 days or 1 day
  const cookieOptions: Cookies.CookieAttributes = {
    expires,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  Cookies.set(AUTH_COOKIE_KEYS.TOKEN, token, cookieOptions);
  Cookies.set(AUTH_COOKIE_KEYS.ROLE, user.role, cookieOptions);
  Cookies.set(AUTH_COOKIE_KEYS.USER, JSON.stringify(user), cookieOptions);

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_COOKIE_KEYS.TOKEN, token);
    localStorage.setItem(AUTH_COOKIE_KEYS.USER, JSON.stringify(user));
  }
};

/**
 * Remove all authentication cookies and local storage tokens.
 */
export const removeAuthCookies = () => {
  Cookies.remove(AUTH_COOKIE_KEYS.TOKEN, { path: "/" });
  Cookies.remove(AUTH_COOKIE_KEYS.ROLE, { path: "/" });
  Cookies.remove(AUTH_COOKIE_KEYS.USER, { path: "/" });

  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_COOKIE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_COOKIE_KEYS.USER);
  }
};

/**
 * Retrieve client auth token.
 */
export const getClientToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return (
    Cookies.get(AUTH_COOKIE_KEYS.TOKEN) ||
    localStorage.getItem(AUTH_COOKIE_KEYS.TOKEN) ||
    null
  );
};

/**
 * Retrieve client user object.
 */
export const getClientUser = (): IUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      Cookies.get(AUTH_COOKIE_KEYS.USER) ||
      localStorage.getItem(AUTH_COOKIE_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw) as IUser;
  } catch {
    return null;
  }
};

/**
 * Retrieve client user role.
 */
export const getClientRole = (): UserRole | null => {
  if (typeof window === "undefined") return null;
  return (Cookies.get(AUTH_COOKIE_KEYS.ROLE) as UserRole) || null;
};
