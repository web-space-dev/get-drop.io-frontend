import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import { type Direction } from "../types";
import { OrderTypeGroup } from "../styles";

type OrderTypeToggleProps = {
  value: Direction;
  onChange: (value: Direction) => void;
};

export default function OrderTypeToggle({
  value,
  onChange,
}: OrderTypeToggleProps) {
  return (
    <OrderTypeGroup
      value={value}
      exclusive
      onChange={(_, nextValue: Direction | null) => {
        if (nextValue) {
          onChange(nextValue);
        }
      }}
    >
      <ToggleButton value="outbound">
        <LocalShippingOutlinedIcon fontSize="small" />
        Outbound
      </ToggleButton>
      <ToggleButton value="inbound">
        <Inventory2OutlinedIcon fontSize="small" />
        Inbound
      </ToggleButton>
    </OrderTypeGroup>
  );
}
