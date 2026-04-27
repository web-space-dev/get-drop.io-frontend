import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { type AddOrderModalMode, type Step } from "../types";
import { Header, Title } from "../styles";

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
    <Header>
      <Title>
        {titlePrefix} - Step {step} of 2
        {step === 1 ? " (Order Details)" : " (Buyer Updates)"}
      </Title>
      <IconButton aria-label="Close" onClick={onClose} size="small">
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </Header>
  );
}
