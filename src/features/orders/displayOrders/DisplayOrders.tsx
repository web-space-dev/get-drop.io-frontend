import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputField from "@/components/ui/InputField";
import { designSystemColors } from "@/config/theme";
import { useDisplayOrders } from "./hooks/useDisplayOrders";
import { type DisplayOrdersProps } from "./types";
import DisplayOrdersDesktop from "./components/DisplayOrdersDesktop";
import DisplayOrdersMobile from "./components/DisplayOrdersMobile";

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
  const {
    filteredOrders,
    isError,
    isLoading,
    searchTerm,
    setSearchTerm,
    setStatusFilter,
    statusFilter,
    statusOptions,
  } = useDisplayOrders({ sellerId });

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
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter orders by status"
            sx={filterFieldSx}
          >
            {statusOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ typography: "body2" }}
              >
                {option === "all" ? "Active" : option}
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
          <DisplayOrdersDesktop orders={filteredOrders} />
          <DisplayOrdersMobile orders={filteredOrders} />
        </>
      )}
    </Box>
  );
}
