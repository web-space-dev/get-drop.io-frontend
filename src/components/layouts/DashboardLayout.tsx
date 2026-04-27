import * as React from "react";
import { styled } from "@mui/material/styles";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const Page = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  maxWidth: 1240,
  margin: "0 auto",
  padding: theme.spacing(3, 2.5, 5),

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 1),
  },
}));

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Page>{children}</Page>;
}
