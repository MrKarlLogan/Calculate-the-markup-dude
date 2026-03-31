export const parseCookies = (cookieHeader?: string) => {
  const cookies: Map<string, string> = new Map();
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) cookies.set(name, decodeURIComponent(value));
  });

  return cookies;
};
