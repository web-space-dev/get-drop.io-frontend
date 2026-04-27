import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
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
    gridTemplateColumns: "220px 1fr",
  },
}));

export const FilterField = styled(InputField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.spacing(1.25),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const FilterAdornment = styled(InputAdornment)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const FilterOption = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.body2,
}));

export const OrdersPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
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
    backgroundColor: theme.palette.action.hover,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export const OrdersCell = styled(TableCell)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  whiteSpace: "nowrap",
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
})<{ statusTone: "default" | "error" }>(({ theme, statusTone }) => ({
  ...theme.typography.caption,
  height: 26,
  borderRadius: theme.spacing(1),
  border: `1px solid ${
    statusTone === "error" ? theme.palette.error.main : theme.palette.divider
  }`,
  backgroundColor:
    statusTone === "error"
      ? theme.palette.error.main
      : designSystemColors.neutralBlack,
  color: theme.palette.common.white,
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
