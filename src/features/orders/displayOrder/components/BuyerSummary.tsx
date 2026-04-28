import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@/shared/components/Button";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardTitle } from "./SummaryCardTitle";

type BuyerSummaryProps = {
  buyerName: string | null | undefined;
  buyerEmail: string | null | undefined;
  buyerPhone: string | null | undefined;
  city: string | null | undefined;
  onOpenEditBuyer: () => void;
};

export default function BuyerSummary({
  buyerName,
  buyerEmail,
  buyerPhone,
  city,
  onOpenEditBuyer,
}: BuyerSummaryProps) {
  const safeBuyerName = buyerName?.trim() || "-";
  const safeBuyerEmail = buyerEmail?.trim() || "-";
  const safeBuyerPhone = buyerPhone?.trim() || "-";
  const safeCity = city?.trim() || "-";

  const buyerRows = [
    {
      key: "buyer-name",
      label: "Buyer Name",
      value: safeBuyerName,
      icon: <EditOutlinedIcon fontSize="inherit" />,
    },
    {
      key: "buyer-email",
      label: "Buyer Email",
      value: safeBuyerEmail,
      icon: <MailOutlineRoundedIcon fontSize="inherit" />,
    },
    {
      key: "buyer-phone",
      label: "Buyer Phone",
      value: safeBuyerPhone,
      icon: <LocalPhoneOutlinedIcon fontSize="inherit" />,
    },
    {
      key: "delivery-city",
      label: "Delivery City",
      value: safeCity,
      icon: <LocationOnOutlinedIcon fontSize="inherit" />,
    },
  ];

  return (
    <SummaryCard elevation={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <SummaryCardTitle>Buyer Information</SummaryCardTitle>
        <Button
          variant="outlined"
          startIcon={<EditOutlinedIcon fontSize="small" />}
          onClick={onOpenEditBuyer}
          sx={(theme) => ({
            minHeight: theme.spacing(4.5),
            justifyContent: "flex-start",
            paddingLeft: theme.spacing(1.5),
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            borderColor: "divider",
            "&:hover": {
              borderColor: "divider",
              backgroundColor: theme.palette.action.hover,
            },
          })}
        >
          Edit Buyer Info
        </Button>
      </Box>

      {buyerRows.map((row) => (
        <Box
          key={row.key}
          sx={{
            display: "grid",
            gridTemplateColumns: "24px minmax(0, 1fr)",
            gap: 1,
            alignItems: "start",
            py: 1.25,
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:last-of-type": {
              borderBottom: 0,
            },
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              mt: 0.1,
            }}
          >
            {row.icon}
          </Box>
          <Box sx={{ display: "grid", gap: 0.25 }}>
            <Typography variant="caption" color="text.secondary">
              {row.label}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 500 }}
            >
              {row.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </SummaryCard>
  );
}
