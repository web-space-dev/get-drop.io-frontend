import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Switch from "@mui/material/Switch";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { designSystemColors } from "@/config/theme";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: 760,
    borderRadius: theme.spacing(2.5),
    overflow: "hidden",
  },
}));

export const Header = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  padding: theme.spacing(2.5, 3, 1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  margin: 0,
  color: designSystemColors.neutralBlack,
}));

export const Content = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
}));

export const ContentLayout = styled("section")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2.25),
}));

export const FieldBlock = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
}));

export const FieldLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: designSystemColors.neutralBlack,
}));

export const FieldInput = styled(InputField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(1.5),
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.secondary,
    borderWidth: 1,
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

export const OptionalSection = styled("section")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  paddingTop: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const OptionalDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
}));

export const OrderTypeGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: "fit-content",
  border: 0,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(0.5),
  gap: theme.spacing(0.5),
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
    borderRadius: theme.spacing(1.25),
    minWidth: 154,
    textTransform: "none",
    color: theme.palette.text.primary,
    ...theme.typography.h6,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
  },
  "& .MuiToggleButtonGroup-grouped.Mui-selected": {
    backgroundColor: designSystemColors.neutralBlack,
    color: theme.palette.common.white,
  },
  "& .MuiToggleButtonGroup-grouped.Mui-selected:hover": {
    backgroundColor: designSystemColors.neutralBlack,
  },
}));

export const ChannelGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
}));

export const ChannelCard = styled("button", {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  border: `2px solid ${selected ? designSystemColors.neutralBlack : theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1.5),
  cursor: "pointer",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  textAlign: "left",
  padding: theme.spacing(2),
  transition: "border-color 150ms ease, background-color 150ms ease",
}));

export const ChannelCardLeft = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  minWidth: 0,
}));

export const ChannelIconTile = styled("div", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  width: theme.spacing(5.5),
  height: theme.spacing(5.5),
  borderRadius: theme.spacing(1),
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: active
    ? designSystemColors.neutralBlack
    : theme.palette.action.hover,
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  flexShrink: 0,
}));

export const ChannelText = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.25),
}));

export const ChannelTitleRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}));

export const ChannelDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
}));

export const ChannelSelectionDot = styled("span", {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  borderRadius: "50%",
  border: `2px solid ${designSystemColors.neutralBlack}`,
  backgroundColor: selected
    ? designSystemColors.neutralBlack
    : theme.palette.background.paper,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "&::after": {
    content: '""',
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "50%",
    backgroundColor: theme.palette.common.white,
    opacity: selected ? 1 : 0,
  },
}));

export const UpdateCard = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

export const UpdateCardText = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.25),
}));

export const StepTwoIntro = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.secondary,
}));

export const IosSwitch = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    margin: 0,
    transitionDuration: "200ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: theme.palette.common.white,
      "& + .MuiSwitch-track": {
        backgroundColor: designSystemColors.neutralBlack,
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 24,
    height: 24,
  },
  "& .MuiSwitch-track": {
    borderRadius: 14,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${designSystemColors.neutralBlack}`,
    opacity: 1,
  },
}));

export const Footer = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2.25, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: "space-between",
}));

export const FooterCancelButton = styled(Button)(({ theme }) => ({
  color: designSystemColors.neutralBlack,
  backgroundColor: "transparent",
  minWidth: 96,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const FooterPrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: designSystemColors.neutralBlack,
  color: theme.palette.common.white,
  minWidth: 220,
  "&:hover": {
    backgroundColor: designSystemColors.neutralBlack,
  },
}));

export const FooterOutlinedButton = styled(Button)(({ theme }) => ({
  color: designSystemColors.neutralBlack,
  borderColor: designSystemColors.neutralBlack,
  "&:hover": {
    borderColor: designSystemColors.neutralBlack,
    backgroundColor: theme.palette.action.hover,
  },
}));
