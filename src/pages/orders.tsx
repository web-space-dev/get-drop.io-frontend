import * as React from "react";
import { styled } from "@mui/material/styles";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddOrderModal from "@/features/orders/add-order/AddOrderModal";
import DisplayOrders from "@/features/orders/display-orders/DisplayOrders";
import { useUser } from "@/context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import { getOrdersQueryKey } from "@/queries/orders/getOrders";

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const Heading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
}));

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
      <Header>
        <Heading>Orders</Heading>
      </Header>

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
