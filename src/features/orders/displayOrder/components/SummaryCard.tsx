import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";

export const SummaryCard = styled(Paper)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(1.25),
  backgroundColor: theme.palette.background.paper,
}));
