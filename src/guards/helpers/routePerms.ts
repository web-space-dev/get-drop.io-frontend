const AUTH_REQUIRED_ROUTES = new Set<string>(["/seller/dashboard"]);

export function requiresAuthentication(pathname: string): boolean {
  return AUTH_REQUIRED_ROUTES.has(pathname);
}

export function getUnauthenticatedRedirectPath(pathname: string): string {
  if (requiresAuthentication(pathname)) {
    return "/auth/register";
  }

  return "/auth/login";
}
