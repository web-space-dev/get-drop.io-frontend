import Typography, { type TypographyProps } from "@mui/material/Typography";

export type PageHeadingProps = TypographyProps;

export default function PageHeading({
  component = "h1",
  variant = "h4",
  sx,
  ...props
}: PageHeadingProps) {
  return (
    <Typography
      component={component}
      variant={variant}
      sx={{ m: 0, ...sx }}
      {...props}
    />
  );
}
