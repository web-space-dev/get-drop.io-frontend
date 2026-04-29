import { designSystemColors } from "@/config/theme";
import { type Direction } from "@/types/Order";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type OrderTypeToggleProps = {
  value: Direction;
  onChange: (value: Direction) => void;
};

export default function OrderTypeToggle({
  value,
  onChange,
}: OrderTypeToggleProps) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, nextValue: Direction | null) => {
        if (nextValue) {
          onChange(nextValue);
        }
      }}
      sx={(theme) => ({
        width: "fit-content",
        border: 0,
        borderRadius: 1.5,
        backgroundColor: theme.palette.action.hover,
        p: 0.5,
        gap: 0.5,
        "& .MuiToggleButtonGroup-grouped": {
          border: 0,
          borderRadius: 1.25,
          minWidth: 154,
          textTransform: "none",
          color: theme.palette.text.primary,
          ...theme.typography.h6,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          px: 1.5,
          py: 1,
        },
        "& .MuiToggleButtonGroup-grouped.Mui-selected": {
          backgroundColor: designSystemColors.neutralBlack,
          color: theme.palette.common.white,
        },
        "& .MuiToggleButtonGroup-grouped.Mui-selected:hover": {
          backgroundColor: designSystemColors.neutralBlack,
        },
      })}
    >
      <ToggleButton value="outbound">
        <LocalShippingOutlinedIcon fontSize="small" />
        Outbound
      </ToggleButton>
      <ToggleButton value="inbound">
        <Inventory2OutlinedIcon fontSize="small" />
        Inbound
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
