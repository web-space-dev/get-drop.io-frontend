import * as React from "react";
import { useRouter } from "next/router";
import DisplayOrder from "@/features/orders/displayOrder/DisplayOrder";

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return null;
  }

  return <DisplayOrder id={id} />;
}
