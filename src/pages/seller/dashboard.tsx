import * as React from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Button from "@/components/ui/Button";
import { signOut } from "@/utils/firebaseServer/firebaseAuth";

const PageContainer = styled("section")(({ theme }) => ({
  minHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const ContentCard = styled("section")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  textAlign: "center",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const Heading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
}));

const ErrorText = styled("p")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.error.main,
  margin: 0,
}));

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
      } finally {
        setIsSigningOut(false);
      }
    })();
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <ContentCard>
          <Heading>Seller Dashboard</Heading>
          {signOutError ? <ErrorText>{signOutError}</ErrorText> : null}
          <Button onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </ContentCard>
      </PageContainer>
    </DashboardLayout>
  );
}
