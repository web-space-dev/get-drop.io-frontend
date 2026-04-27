import * as React from "react";
import { styled } from "@mui/material/styles";

type AuthLinkButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const LinkButton = styled("button")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.main,
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  textDecoration: "underline",
  textDecorationColor: theme.palette.primary.main,
  textUnderlineOffset: "0.2em",
  alignSelf: "center",
}));

export default function AuthLinkButton({
  children,
  onClick,
}: AuthLinkButtonProps) {
  return (
    <LinkButton type="button" onClick={onClick}>
      {children}
    </LinkButton>
  );
}
