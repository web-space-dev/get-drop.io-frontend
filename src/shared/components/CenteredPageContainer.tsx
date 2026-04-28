import Box, { type BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledCenteredPageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

export type CenteredPageContainerProps = BoxProps;

export default function CenteredPageContainer({
  ...props
}: CenteredPageContainerProps) {
  return <StyledCenteredPageContainer {...props} />;
}
