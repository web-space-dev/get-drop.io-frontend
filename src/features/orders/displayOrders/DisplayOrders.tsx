import { designSystemColors } from "@/config/theme";
import { useGetOrders } from "@/queries/orders/getOrders";
import { type OrderQueryModel } from "@/queries/orders/types";
import { useUpdateOrder } from "@/queries/orders/updateOrder";
import InputField from "@/shared/components/InputField";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import DisplayOrdersDesktop from "./components/DisplayOrdersDesktop";
import DisplayOrdersMobile from "./components/DisplayOrdersMobile";
import { filterOrders, getStatusOptions } from "./utils/ordersFiltering";

export type DisplayOrdersProps = {
  sellerId?: string;
  onAddOrder?: () => void;
};

export type DisplayOrdersListProps = {
  orders: OrderQueryModel[];
  onArchiveOrder?: (orderId: string) => void;
  onUnarchiveOrder?: (orderId: string) => void;
  archivingOrderId?: string | null;
};

export type StatusTone = "default" | "error" | "neutral";

export type StatusFilter = "all" | "archived" | string;

const filterFieldSx = {
  "& .MuiInputBase-root": {
    borderRadius: 1.25,
    backgroundColor: "action.hover",
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
} as const;

export default function DisplayOrders({
  sellerId,
  onAddOrder,
}: DisplayOrdersProps) {
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [archiveError, setArchiveError] = React.useState<string | null>(null);
  const [archivingOrderId, setArchivingOrderId] = React.useState<string | null>(
    null,
  );

  const { data: orders = [], isLoading, isError } = useGetOrders(sellerId);
  const updateOrderMutation = useUpdateOrder();

  const statusOptions = React.useMemo(() => getStatusOptions(orders), [orders]);

  const filteredOrders = React.useMemo(
    () => filterOrders(orders, statusFilter, searchTerm),
    [orders, searchTerm, statusFilter],
  );

  const handleArchiveOrder = React.useCallback(
    (orderId: string) => {
      void (async () => {
        setArchiveError(null);
        setArchivingOrderId(orderId);

        try {
          await updateOrderMutation.mutateAsync({
            id: orderId,
            updates: { archivedAt: new Date() },
          });
        } catch {
          setArchiveError("Unable to update archive status right now.");
        } finally {
          setArchivingOrderId(null);
        }
      })();
    },
    [updateOrderMutation],
  );

  const handleUnarchiveOrder = React.useCallback(
    (orderId: string) => {
      void (async () => {
        setArchiveError(null);
        setArchivingOrderId(orderId);

        try {
          await updateOrderMutation.mutateAsync({
            id: orderId,
            updates: { archivedAt: null },
          });
        } catch {
          setArchiveError("Unable to update archive status right now.");
        } finally {
          setArchivingOrderId(null);
        }
      })();
    },
    [updateOrderMutation],
  );

  if (isLoading) {
    return (
      <Box
        sx={(theme) => ({
          minHeight: theme.spacing(20),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Unable to load orders right now.</Alert>;
  }

  return (
    <Box component="section" sx={{ display: "grid", gap: 2 }}>
      {archiveError ? <Alert severity="error">{archiveError}</Alert> : null}

      <Box
        sx={(theme) => ({
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
          [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "minmax(0, 1fr) auto",
            alignItems: "center",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: "grid",
            gap: 1,
            gridTemplateColumns: "1fr",
            [theme.breakpoints.up("md")]: {
              gridTemplateColumns: "220px minmax(0, 1fr)",
              maxWidth: 720,
            },
          })}
        >
          <InputField
            fullWidth
            select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            aria-label="Filter orders by status"
            sx={filterFieldSx}
          >
            {statusOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ typography: "body2" }}
              >
                {option === "all"
                  ? "Active"
                  : option === "archived"
                    ? "Archived"
                    : option}
              </MenuItem>
            ))}
          </InputField>

          <InputField
            fullWidth
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by order name or tracking..."
            sx={filterFieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ color: "text.secondary" }}
                  >
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {onAddOrder ? (
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon fontSize="small" />}
            onClick={onAddOrder}
            sx={(theme) => ({
              ...theme.typography.button,
              minHeight: theme.spacing(5),
              borderRadius: theme.spacing(1.25),
              backgroundColor: designSystemColors.neutralBlack,
              color: theme.palette.common.white,
              px: 2,
              py: 1,
              textTransform: "none",
              justifySelf: "start",
              "&:hover": {
                backgroundColor: designSystemColors.neutralBlack,
              },
              [theme.breakpoints.up("md")]: {
                justifySelf: "end",
              },
            })}
          >
            Add Order
          </Button>
        ) : null}
      </Box>

      {filteredOrders.length === 0 ? (
        <Box
          sx={(theme) => ({
            p: theme.spacing(4, 2),
            textAlign: "center",
            borderRadius: theme.spacing(1.5),
            border: `1px dashed ${theme.palette.divider}`,
            display: "grid",
            gap: theme.spacing(0.5),
          })}
        >
          <Typography variant="h6">No orders found</Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing your filters or create a new order.
          </Typography>
        </Box>
      ) : (
        <>
          <DisplayOrdersDesktop
            orders={filteredOrders}
            onArchiveOrder={handleArchiveOrder}
            onUnarchiveOrder={handleUnarchiveOrder}
            archivingOrderId={archivingOrderId}
          />
          <DisplayOrdersMobile
            orders={filteredOrders}
            onArchiveOrder={handleArchiveOrder}
            onUnarchiveOrder={handleUnarchiveOrder}
            archivingOrderId={archivingOrderId}
          />
        </>
      )}
    </Box>
  );
}
