import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import * as React from "react";
import {
  getUnauthenticatedRedirectPath,
  requiresAuthentication,
} from "./helpers/routePerms";

type UnauthenticatedGuardProps = {
  children: React.ReactNode;
};

export default function UnauthenticatedGuard({
  children,
}: UnauthenticatedGuardProps) {
  const router = useRouter();
  const { authUser, isLoading } = useUser();

  const isSellerDashboardRoute = requiresAuthentication(router.pathname);
  const shouldRedirectToLogin =
    isSellerDashboardRoute && !isLoading && authUser === null;
  const redirectPath = getUnauthenticatedRedirectPath(router.pathname);

  React.useEffect(() => {
    if (shouldRedirectToLogin) {
      void router.replace(redirectPath);
    }
  }, [redirectPath, router, shouldRedirectToLogin]);

  if (isSellerDashboardRoute && (isLoading || shouldRedirectToLogin)) {
    return null;
  }

  return children;
}
