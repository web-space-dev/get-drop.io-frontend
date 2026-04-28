import Button from "@/shared/components/Button";
import CenteredPageContainer from "@/shared/components/CenteredPageContainer";
import ContentSectionCard from "@/shared/components/ContentSectionCard";
import InlineErrorText from "@/shared/components/InlineErrorText";
import PageHeading from "@/shared/components/PageHeading";
import { signOut } from "@/utils/firebaseServer/firebaseAuth";
import { useRouter } from "next/router";
import * as React from "react";

export default function SellerDashboard() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [signOutError, setSignOutError] = React.useState<string | null>(null);

  const handleSignOut = () => {
    void (async () => {
      setSignOutError(null);
      setIsSigningOut(true);

      try {
        await signOut();
        await router.push("/auth/login");
      } catch {
        setSignOutError("Unable to sign out right now. Please try again.");
        setIsSigningOut(false);
      }
    })();
  };

  return (
    <CenteredPageContainer>
      <ContentSectionCard>
        <PageHeading>Seller Dashboard</PageHeading>
        {signOutError ? (
          <InlineErrorText>{signOutError}</InlineErrorText>
        ) : null}
        <Button onClick={handleSignOut} disabled={isSigningOut}>
          {isSigningOut ? "Signing out..." : "Sign out"}
        </Button>
      </ContentSectionCard>
    </CenteredPageContainer>
  );
}
