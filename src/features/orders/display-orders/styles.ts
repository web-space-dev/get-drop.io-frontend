import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InputField from "@/components/ui/InputField";
import { designSystemColors } from "@/config/theme";

export const Container = styled("section")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
}));

export const Toolbar = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
  },
}));

export const ToolbarFilters = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "220px minmax(0, 1fr)",
    maxWidth: 720,
  },
}));

export const FilterField = styled(InputField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.spacing(1.25),
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiInputBase-input": {
    color: designSystemColors.neutralBlack,
    "&::placeholder": {
      color: designSystemColors.neutralMeta,
      opacity: 1,
    },
  },
  "& .MuiSelect-select": {
    color: designSystemColors.neutralBlack,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    borderWidth: 1,
  },
}));

export const FilterAdornment = styled(InputAdornment)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const FilterOption = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.body2,
}));

export const ToolbarAddButton = styled(Button)(({ theme }) => ({
  ...theme.typography.button,
  minHeight: theme.spacing(5),
  borderRadius: theme.spacing(1.25),
  backgroundColor: designSystemColors.neutralBlack,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  textTransform: "none",
  justifySelf: "start",
  "&:hover": {
    backgroundColor: designSystemColors.neutralBlack,
  },
  [theme.breakpoints.up("md")]: {
    justifySelf: "end",
  },
}));

export const OrdersPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  border: `1px solid ${designSystemColors.white}`,
  overflow: "hidden",
}));

export const OrdersTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: 8,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: 999,
  },
}));

export const OrdersTable = styled(Table)(() => ({
  minWidth: 1100,
}));

export const OrdersTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    ...theme.typography.subtitle2,
    color: designSystemColors.neutralBlack,
    backgroundColor: designSystemColors.white,
    borderBottom: `1px solid ${designSystemColors.white}`,
    padding: theme.spacing(1.75, 1.75),
  },
}));

export const OrdersCell = styled(TableCell)(({ theme }) => ({
  ...theme.typography.body2,
  color: designSystemColors.neutralBlack,
  borderBottom: `1px solid ${designSystemColors.white}`,
  whiteSpace: "nowrap",
  padding: theme.spacing(1.5, 1.75),
  maxWidth: 260,
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const MutedCellText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "statusTone",
})<{ statusTone: "default" | "error" | "neutral" }>(
  ({ theme, statusTone }) => ({
    ...theme.typography.body2,
    height: 34,
    borderRadius: theme.spacing(1),
    border: `1px solid ${
      statusTone === "error"
        ? theme.palette.error.main
        : statusTone === "neutral"
          ? theme.palette.divider
          : designSystemColors.neutralBlack
    }`,
    backgroundColor:
      statusTone === "error"
        ? theme.palette.error.main
        : statusTone === "neutral"
          ? "transparent"
          : designSystemColors.neutralBlack,
    color:
      statusTone === "error" || statusTone === "default"
        ? theme.palette.common.white
        : designSystemColors.neutralBlack,
    "& .MuiChip-label": {
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
    },
  }),
);

export const TypeChip = styled(Chip)(({ theme }) => ({
  ...theme.typography.body2,
  height: 34,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  color: designSystemColors.neutralBlack,
  "& .MuiChip-label": {
    paddingLeft: theme.spacing(1.25),
    paddingRight: theme.spacing(1.25),
  },
}));

export const EmptyState = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 2),
  textAlign: "center",
  borderRadius: theme.spacing(1.5),
  border: `1px dashed ${theme.palette.divider}`,
  display: "grid",
  gap: theme.spacing(0.5),
}));

export const MobileList = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.25),
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const MobileCard = styled("article")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  display: "grid",
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
}));

export const MobileCardTop = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

export const MobileMeta = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: theme.spacing(0.75, 1),
}));

export const MobileMetaRow = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.25),
}));

export const LoadingWrap = styled("div")(({ theme }) => ({
  minHeight: theme.spacing(20),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const DesktopOnly = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));
