import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddOrderModal from "@/features/orders/add-order/AddOrderModal";
import DisplayOrders from "@/features/orders/display-orders/DisplayOrders";
import { useUser } from "@/context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import { getOrdersQueryKey } from "@/queries/orders/getOrders";

const Page = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4, 3),
}));

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

const AddOrderButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
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
    <Page>
      <Header>
        <Heading>Orders</Heading>
        <AddOrderButton
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Add Order
        </AddOrderButton>
      </Header>

      <DisplayOrders sellerId={authUser?.uid} />

      <AddOrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleOrderCreated}
      />
    </Page>
  );
}
