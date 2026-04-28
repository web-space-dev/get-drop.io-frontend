import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { designSystemColors } from "@/config/theme";

export const SummaryCardTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: designSystemColors.neutralBlack,
}));
