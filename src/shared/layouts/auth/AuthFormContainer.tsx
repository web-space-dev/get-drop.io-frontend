import { styled } from "@mui/material/styles";
import Image from "next/image";
import * as React from "react";

type FormShellProps = {
  fieldGap?: number;
};

export type FormContainerProps = React.ComponentPropsWithoutRef<"form"> &
  FormShellProps;

const StyledFormContainer = styled("form", {
  shouldForwardProp: (prop) => prop !== "fieldGap",
})<FormShellProps>(({ theme, fieldGap = 2 }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(fieldGap),
}));

const LogoContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
}));

const LogoImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxWidth: theme.spacing(22),
}));

export default function AuthFormContainer({
  children,
  fieldGap = 2,
  ...props
}: FormContainerProps) {
  return (
    <StyledFormContainer noValidate fieldGap={fieldGap} {...props}>
      <LogoContainer>
        <LogoImage
          src={"/logos/Drop-Logo-Full-Blue.png"}
          alt="Drop logo"
          width={400}
          height={120}
          priority
        />
      </LogoContainer>
      {children}
    </StyledFormContainer>
  );
}
