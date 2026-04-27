import * as React from "react";
import { styled } from "@mui/material/styles";

const Page = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4, 3),
}));

const Heading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
}));

export default function OrdersPage() {
  return (
    <Page>
      <Heading>Orders</Heading>
    </Page>
  );
}
