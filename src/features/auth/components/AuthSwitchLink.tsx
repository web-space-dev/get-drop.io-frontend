import * as React from "react";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";

type AuthSwitchLinkProps = {
  promptText: string;
  actionText: string;
  href: string;
};

const Text = styled("p")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  margin: 0,
  textAlign: "center",
}));

const ActionLink = styled(NextLink)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.main,
  textDecoration: "underline",
  textDecorationColor: theme.palette.primary.main,
  textUnderlineOffset: "0.2em",
  cursor: "pointer",
}));

export default function AuthSwitchLink({
  promptText,
  actionText,
  href,
}: AuthSwitchLinkProps) {
  return (
    <Text>
      {promptText} <ActionLink href={href}>{actionText}</ActionLink>
    </Text>
  );
}
