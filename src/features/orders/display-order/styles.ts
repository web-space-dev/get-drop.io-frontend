import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Switch from "@mui/material/Switch";
import Button from "@/components/ui/Button";
import { alpha, styled } from "@mui/material/styles";
import { designSystemColors } from "@/config/theme";

export const Page = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  maxWidth: 1240,
  margin: "0 auto",
  padding: theme.spacing(3, 2.5, 5),
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 1),
  },
}));

export const Grid = styled("section")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  },
}));

export const MainColumn = styled("section")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
}));

export const SideColumn = styled("aside")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  alignSelf: "start",
}));

export const Card = styled(Paper)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(1.25),
  backgroundColor: theme.palette.background.paper,
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: designSystemColors.neutralBlack,
}));

export const OrderName = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  margin: 0,
}));

export const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

export const GhostButton = styled(Button)(({ theme }) => ({
  minHeight: theme.spacing(4.5),
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  border: `1px solid ${alpha(theme.palette.text.secondary, 0.25)}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  minHeight: theme.spacing(4.5),
  backgroundColor: designSystemColors.neutralBlack,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: designSystemColors.neutralBlack,
  },
}));

export const DangerButton = styled(Button)(({ theme }) => ({
  minHeight: theme.spacing(4.5),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
}));

export const ActionButton = styled(GhostButton)(({ theme }) => ({
  justifyContent: "flex-start",
  paddingLeft: theme.spacing(1.5),
}));

export const SummaryGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1.5, 3),
}));

export const SummaryInlineItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  flexWrap: "nowrap",
  gap: theme.spacing(1),
  minWidth: 0,
  whiteSpace: "nowrap",
}));

export const SummaryInlineItemBreak = styled(SummaryInlineItem)(() => ({
  flexBasis: "100%",
}));

export const SummaryInlineLabel = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  color: designSystemColors.neutralMeta,
  fontWeight: 400,
}));

export const SummaryInlineValue = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  color: designSystemColors.neutralBlack,
  fontWeight: 400,
}));

export const StatItem = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.5),
}));

export const MutedLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

export const StrongValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

export const StatusPill = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  width: "fit-content",
  backgroundColor: "transparent",
  color: designSystemColors.neutralMeta,
  border: `1px solid ${alpha(designSystemColors.neutralMeta, 0.35)}`,
  padding: theme.spacing(0.2, 1),
  borderRadius: theme.spacing(1),
}));

export const TrackingRow = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
}));

export const TrackingActions = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
}));

export const TrackingActionButton = styled(GhostButton)(() => ({
  color: designSystemColors.neutralBlack,
}));

export const TrackingLinkBox = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: designSystemColors.neutralBlack,
  border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 1.25),
  backgroundColor: theme.palette.action.hover,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const BuyerLine = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "24px minmax(0, 1fr)",
  gap: theme.spacing(1),
  alignItems: "start",
  padding: theme.spacing(1.25, 0),
  borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
  "&:last-of-type": {
    borderBottom: 0,
  },
}));

export const BuyerIconWrap = styled("span")(({ theme }) => ({
  width: 20,
  height: 20,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.1),
}));

export const BuyerLineContent = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.25),
}));

export const BuyerLineLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

export const BuyerLineValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: designSystemColors.neutralBlack,
  fontWeight: 500,
}));

export const KeyValueGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: theme.spacing(1.5, 2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const UpdateOption = styled("div")(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.75, 1),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const UpdateOptionText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
}));

export const UpdateSwitch = styled(Switch)(({ theme }) => ({
  width: 34,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + .MuiSwitch-track": {
        backgroundColor: designSystemColors.neutralBlack,
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16,
    backgroundColor: alpha(theme.palette.text.secondary, 0.45),
    opacity: 1,
  },
}));

export const AutomatedHint = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

export const CenteredHint = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  textAlign: "center",
}));

export const Dot = styled("span", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  width: theme.spacing(1.5),
  height: theme.spacing(1.5),
  borderRadius: "50%",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: active ? designSystemColors.neutralBlack : "transparent",
}));

export const Timeline = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.1),
}));

export const TimelineItem = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "16px 50px minmax(0, 1fr)",
  alignItems: "start",
  gap: theme.spacing(1),
}));

export const TimelineMarker = styled("div")(() => ({
  display: "grid",
  justifyItems: "center",
  alignItems: "start",
}));

export const TimelineDot = styled("span", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  marginTop: 4,
  backgroundColor: active
    ? designSystemColors.neutralBlack
    : theme.palette.action.disabled,
}));

export const TimelineLine = styled("span")(({ theme }) => ({
  width: 1,
  minHeight: theme.spacing(2.5),
  marginTop: theme.spacing(0.35),
  backgroundColor: alpha(theme.palette.text.secondary, 0.25),
}));

export const TimelineTime = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: designSystemColors.neutralBlack,
}));

export const DividerLine = styled("div")(({ theme }) => ({
  borderTop: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
}));

export const EditDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: 560,
    borderRadius: theme.spacing(1.5),
  },
}));

export const DeleteDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: 560,
    borderRadius: theme.spacing(1.5),
  },
}));

export const EditDialogTitleRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

export const EditDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 2.5),
}));

export const EditDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5, 2),
  justifyContent: "space-between",
}));

export const DeleteDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5, 2),
  justifyContent: "space-between",
}));

export const EditTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  margin: 0,
  padding: theme.spacing(2.5, 2.5, 1),
}));

export const EditSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

export const DeleteDialogBody = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "32px minmax(0, 1fr)",
  gap: theme.spacing(1.5),
  alignItems: "start",
  padding: theme.spacing(0.5, 0),
}));

export const DeleteIconWrap = styled("span")(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.error.main, 0.12),
  color: theme.palette.error.main,
}));

export const DeleteTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
}));

export const DeleteText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export const DeleteOrderName = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(0.5),
}));

export const Value = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: designSystemColors.neutralBlack,
}));
