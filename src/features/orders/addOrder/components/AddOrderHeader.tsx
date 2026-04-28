import Box from "@mui/material/Box";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { designSystemColors } from "@/config/theme";
import { type AddOrderModalMode, type Step } from "../types";

type AddOrderHeaderProps = {
  step: Step;
  mode: AddOrderModalMode;
  onClose: () => void;
};

export default function AddOrderHeader({
  step,
  mode,
  onClose,
}: AddOrderHeaderProps) {
  const titlePrefix = mode === "edit" ? "Edit Order" : "Add Order";

  return (
    <Box
      component="header"
      sx={(theme) => ({
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        px: 3,
        pt: 2.5,
        pb: 1.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Typography
        variant="h5"
        sx={{
          m: 0,
          color: designSystemColors.neutralBlack,
        }}
      >
        {titlePrefix} - Step {step} of 2
        {step === 1 ? " (Order Details)" : " (Buyer Updates)"}
      </Typography>
      <IconButton aria-label="Close" onClick={onClose} size="small">
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
