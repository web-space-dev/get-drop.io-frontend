import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

type OrderViewButtonProps = {
  href?: string | null;
  compact?: boolean;
};

export default function OrderViewButton({
  href,
  compact = false,
}: OrderViewButtonProps) {
  if (!href) {
    return (
      <Typography
        variant={compact ? "caption" : "body2"}
        color="text.secondary"
      >
        View
      </Typography>
    );
  }

  return (
    <Link
      component={NextLink}
      href={href}
      underline="none"
      sx={(theme) => ({
        ...(compact ? theme.typography.caption : theme.typography.body2),
        color: "inherit",
        fontWeight: compact ? 500 : 600,
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 0 : theme.spacing(0.5),
        textDecoration: "none",
        "&:hover": {
          textDecoration: "none",
        },
      })}
    >
      View
      {compact ? null : <ArrowForwardRoundedIcon fontSize="small" />}
    </Link>
  );
}
