import Typography, { type TypographyProps } from "@mui/material/Typography";

export type InlineErrorTextProps = TypographyProps;

export default function InlineErrorText({
  component = "p",
  variant = "body2",
  color = "error.main",
  sx,
  ...props
}: InlineErrorTextProps) {
  return (
    <Typography
      component={component}
      variant={variant}
      color={color}
      sx={{ m: 0, ...sx }}
      {...props}
    />
  );
}
