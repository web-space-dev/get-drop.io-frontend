import { designSystemColors } from "@/config/theme";
import Typography, { type TypographyProps } from "@mui/material/Typography";

export type InputTitleProps = Omit<TypographyProps, "variant">;

export default function InputTitle({ sx, ...props }: InputTitleProps) {
  const mergedSx = Array.isArray(sx)
    ? [{ color: designSystemColors.neutralBlack }, ...sx]
    : [{ color: designSystemColors.neutralBlack }, sx];

  return <Typography variant="subtitle2" sx={mergedSx} {...props} />;
}
