import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { type Step } from "../types";
import { Header, Title } from "../styles";

type AddOrderHeaderProps = {
  step: Step;
  onClose: () => void;
};

export default function AddOrderHeader({ step, onClose }: AddOrderHeaderProps) {
  return (
    <Header>
      <Title>
        Add Order - Step {step} of 2
        {step === 1 ? " (Order Details)" : " (Buyer Updates)"}
      </Title>
      <IconButton aria-label="Close" onClick={onClose} size="small">
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </Header>
  );
}
