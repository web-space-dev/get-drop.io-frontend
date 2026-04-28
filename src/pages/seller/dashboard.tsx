import Button from "@/shared/components/Button";
import CenteredPageContainer from "@/shared/components/CenteredPageContainer";
import ContentSectionCard from "@/shared/components/ContentSectionCard";
import InlineErrorText from "@/shared/components/InlineErrorText";
import PageHeading from "@/shared/components/PageHeading";
import { signOut } from "@/utils/firebaseServer/firebaseAuth";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/compat/router";
import * as React from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

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

        if (router) {
          await router.push("/auth/login");
        } else if (typeof window !== "undefined") {
          window.location.assign("/auth/login");
        }
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
