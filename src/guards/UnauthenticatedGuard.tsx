import * as React from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
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
  const shouldRedirectToRegister =
    isSellerDashboardRoute && !isLoading && authUser === null;
  const redirectPath = getUnauthenticatedRedirectPath(router.pathname);

  React.useEffect(() => {
    if (shouldRedirectToRegister) {
      void router.replace(redirectPath);
    }
  }, [redirectPath, router, shouldRedirectToRegister]);

  if (isSellerDashboardRoute && (isLoading || shouldRedirectToRegister)) {
    return null;
  }

  return children;
}
