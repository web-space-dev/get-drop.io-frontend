import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { designSystemColors, layoutGrid } from "@/config/theme";

const HomeContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  paddingLeft: `max(${theme.spacing(3)}, ${layoutGrid.mobile.marginX}px)`,
  paddingRight: `max(${theme.spacing(3)}, ${layoutGrid.mobile.marginX}px)`,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(10),
  background: `linear-gradient(120deg, ${designSystemColors.offWhite}F2 0%, ${designSystemColors.lavendar}BF 45%, ${designSystemColors.powderBlue}A6 100%)`,
  [theme.breakpoints.up("md")]: {
    paddingLeft: `${layoutGrid.desktop.marginX}px`,
    paddingRight: `${layoutGrid.desktop.marginX}px`,
    paddingTop: `${Math.round(layoutGrid.desktop.columnHeight * (5 / 6))}px`,
    paddingBottom: `${layoutGrid.desktop.columnHeight}px`,
  },
}));

export default function Home() {
  return (
    <HomeContainer>
      <Link href="/about">Go to About</Link>
      <Link href="/auth/register">Go to Register</Link>
      <Link href="/auth/login">Go to Login</Link>
    </HomeContainer>
  );
}
