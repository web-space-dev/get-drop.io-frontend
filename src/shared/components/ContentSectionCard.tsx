import Box, { type BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledContentSectionCard = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  textAlign: "center",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export type ContentSectionCardProps = BoxProps;

export default function ContentSectionCard({
  ...props
}: ContentSectionCardProps) {
  return <StyledContentSectionCard {...props} />;
}
