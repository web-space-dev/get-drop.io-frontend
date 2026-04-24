import * as React from "react";
import Box from "@mui/material/Box";
import { styled, type SxProps, type Theme } from "@mui/material/styles";
import { layoutGrid } from "@/config/theme";

type AuthLayoutProps = {
  children: React.ReactNode;
  maxWidth?: number | string;
  minHeight?: string | number;
  gap?: number;
  paddingX?: number;
  paddingY?: number;
  sx?: SxProps<Theme>;
};

type OuterLayoutProps = {
  minHeight: string | number;
  paddingX: number;
  paddingY: number;
};

type InnerLayoutProps = {
  maxWidth: number | string;
  gap: number;
};

const OuterLayout = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "minHeight" && prop !== "paddingX" && prop !== "paddingY",
})<OuterLayoutProps>(({ theme, minHeight, paddingX, paddingY }) => ({
  minHeight,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  paddingTop: `max(${theme.spacing(paddingY)}, ${layoutGrid.mobile.gutter}px)`,
  paddingBottom: `max(${theme.spacing(paddingY)}, ${layoutGrid.mobile.gutter}px)`,
  paddingLeft: `max(${theme.spacing(paddingX)}, ${layoutGrid.mobile.marginX}px)`,
  paddingRight: `max(${theme.spacing(paddingX)}, ${layoutGrid.mobile.marginX}px)`,
  [theme.breakpoints.up("md")]: {
    paddingLeft: `max(${theme.spacing(paddingX + 2)}, ${layoutGrid.desktop.marginX}px)`,
    paddingRight: `max(${theme.spacing(paddingX + 2)}, ${layoutGrid.desktop.marginX}px)`,
  },
}));

const InnerLayout = styled(Box, {
  shouldForwardProp: (prop) => prop !== "maxWidth" && prop !== "gap",
})<InnerLayoutProps>(({ theme, maxWidth, gap }) => ({
  width: "100%",
  maxWidth,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: `max(${theme.spacing(gap)}, ${layoutGrid.mobile.gutter}px)`,
}));

export default function AuthLayout({
  children,
  maxWidth = layoutGrid.mobile.containerWidth,
  minHeight = "100vh",
  gap = 2,
  paddingX = 2,
  paddingY = 3,
  sx,
}: AuthLayoutProps) {
  return (
    <OuterLayout
      minHeight={minHeight}
      paddingX={paddingX}
      paddingY={paddingY}
      sx={sx}
    >
      <InnerLayout maxWidth={maxWidth} gap={gap}>
        {children}
      </InnerLayout>
    </OuterLayout>
  );
}
