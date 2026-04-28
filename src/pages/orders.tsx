import { designSystemColors } from "@/config/theme";
import { useUser } from "@/context/UserContext";
import AddOrderModal from "@/features/orders/addOrder/AddOrderModal";
import DisplayOrders from "@/features/orders/displayOrders/DisplayOrders";
import { getOrdersQueryKey } from "@/queries/orders/getOrders";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const { authUser } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOrderCreated = React.useCallback(() => {
    void queryClient.invalidateQueries({
      queryKey: getOrdersQueryKey(authUser?.uid),
    });
  }, [authUser?.uid, queryClient]);

  return (
    <DashboardLayout>
      <Box
        component="header"
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: theme.spacing(2),
          mb: theme.spacing(3),
        })}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: designSystemColors.neutralBlack }}
        >
          Orders
        </Typography>
      </Box>

      <DisplayOrders
        sellerId={authUser?.uid}
        onAddOrder={() => setIsModalOpen(true)}
      />

      <AddOrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleOrderCreated}
      />
    </DashboardLayout>
  );
}
