import * as React from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Typography from "@mui/material/Typography";
import { useDisplayOrders } from "./hooks/useDisplayOrders";
import { type DisplayOrdersProps } from "./types";
import {
  Container,
  EmptyState,
  FilterAdornment,
  FilterField,
  FilterOption,
  LoadingWrap,
  MutedCellText,
  Toolbar,
} from "./styles";
import DisplayOrdersDesktop from "./components/DisplayOrdersDesktop";
import DisplayOrdersMobile from "./components/DisplayOrdersMobile";

export default function DisplayOrders({ sellerId }: DisplayOrdersProps) {
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
      <LoadingWrap>
        <CircularProgress size={28} />
      </LoadingWrap>
    );
  }

  if (isError) {
    return <Alert severity="error">Unable to load orders right now.</Alert>;
  }

  return (
    <Container>
      <Toolbar>
        <FilterField
          fullWidth
          select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter orders by status"
        >
          {statusOptions.map((option) => (
            <FilterOption key={option} value={option}>
              {option === "all" ? "All statuses" : option}
            </FilterOption>
          ))}
        </FilterField>

        <FilterField
          fullWidth
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by id, reference, buyer, status, tracking, address"
          slotProps={{
            input: {
              startAdornment: (
                <FilterAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </FilterAdornment>
              ),
            },
          }}
        />
      </Toolbar>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          <Typography variant="h6">No orders found</Typography>
          <MutedCellText>
            Try changing your filters or create a new order.
          </MutedCellText>
        </EmptyState>
      ) : (
        <>
          <DisplayOrdersDesktop orders={filteredOrders} />
          <DisplayOrdersMobile orders={filteredOrders} />
        </>
      )}
    </Container>
  );
}
