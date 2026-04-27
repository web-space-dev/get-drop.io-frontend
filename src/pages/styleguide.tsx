import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { designSystemColors, layoutGrid } from "@/config/theme";

const paletteSwatches = [
  { token: "primary.main", value: designSystemColors.dropBlue },
  { token: "primary.dark", value: designSystemColors.deepNavy },
  { token: "success.main", value: designSystemColors.brightGreen },
  { token: "info.main", value: designSystemColors.lightBlue },
  { token: "background.default", value: designSystemColors.background },
  { token: "background.paper", value: designSystemColors.white },
  { token: "error.main", value: designSystemColors.error },
  { token: "text.secondary", value: designSystemColors.textSecondary },
] as const;

const typographyVariants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "button",
  "caption",
  "overline",
] as const;

const logoAssets = [
  {
    label: "Full Logo Blue",
    src: "/logos/Drop-Logo-Full-Blue.png",
    background: "#FFFFFF",
  },
  {
    label: "Full Logo Black",
    src: "/logos/Drop-Logo-Full-Black.png",
    background: "#F8FAFC",
  },
  {
    label: "Full Logo White",
    src: "/logos/Drop-Logo-Full-White.png",
    background: "#00024F",
  },
  {
    label: "Icon Blue",
    src: "/logos/Drop-Icon-Blue.png",
    background: "#FFFFFF",
  },
  { label: "Icon Black", src: "/logos/Drop-Icon.png", background: "#F8FAFC" },
  {
    label: "Icon White",
    src: "/logos/Drop-Icon-White.png",
    background: "#00024F",
  },
] as const;

const iconAssets = [
  {
    label: "Arrow Green 1",
    src: "/icons/Arrow-Green-1.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Green 2",
    src: "/icons/Arrow-Green-2.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Green 3",
    src: "/icons/Arrow-Green-3.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Light Blue 1",
    src: "/icons/Arrow-Light-Blue-1.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Light Blue 2",
    src: "/icons/Arrow-Light-Blue-2.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Light Blue 3",
    src: "/icons/Arrow-Light-Blue-3.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Navy 1",
    src: "/icons/Arrow-Navy-1.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Navy 2",
    src: "/icons/Arrow-Navy-2.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Navy 3",
    src: "/icons/Arrow-Navy-3.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Blue 1",
    src: "/icons/Arrow-Blue-1.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Blue 2",
    src: "/icons/Arrow-Blue-2.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Blue 3",
    src: "/icons/Arrow-Blue-3.png",
    background: "#FFFFFF",
  },
  {
    label: "Arrow Slider",
    src: "/icons/Arrow-Slider.png",
    background: "#FFFFFF",
  },
] as const;

const faviconAssets = [
  { label: "SVG Favicon", src: "/favicon/favicon.svg", background: "#F8FAFC" },
  { label: "ICO Favicon", src: "/favicon/favicon.ico", background: "#F8FAFC" },
  {
    label: "Apple Touch Icon",
    src: "/favicon/apple-touch-icon.png",
    background: "#F8FAFC",
  },
  { label: "96x96", src: "/favicon/favicon-96x96.png", background: "#F8FAFC" },
  {
    label: "192x192",
    src: "/favicon/web-app-manifest-192x192.png",
    background: "#F8FAFC",
  },
  {
    label: "512x512",
    src: "/favicon/web-app-manifest-512x512.png",
    background: "#F8FAFC",
  },
] as const;

function TokenSection(props: { title: string; children: React.ReactNode }) {
  const { title, children } = props;
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

function AssetCard(props: { label: string; src: string; background: string }) {
  const { label, src, background } = props;
  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: "100%", sm: 220 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 128,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          backgroundColor: background,
        }}
      >
        <Box
          component="img"
          src={src}
          alt={label}
          sx={{
            maxWidth: "100%",
            maxHeight: 88,
            objectFit: "contain",
          }}
        />
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="body2" color="text.secondary">
          {src}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function StyleguidePage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2.5, md: 7 },
        py: { xs: 4, md: 8 },
        backgroundColor: "background.default",
      }}
    >
      <Stack spacing={4}>
        <Box>
          <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
            Drop Styleguide
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Live reference for the current MUI theme values in this project.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            <Link href="/">Back to home</Link>
          </Typography>
        </Box>

        <TokenSection title="Palette">
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
            {paletteSwatches.map((swatch) => (
              <Paper
                key={swatch.token}
                elevation={0}
                sx={{
                  width: { xs: "100%", sm: 220 },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: 84,
                    backgroundColor: swatch.value,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="subtitle2">{swatch.token}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {swatch.value}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </TokenSection>

        <TokenSection title="Logos">
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
            {logoAssets.map((asset) => (
              <AssetCard
                key={asset.label}
                label={asset.label}
                src={asset.src}
                background={asset.background}
              />
            ))}
          </Stack>
        </TokenSection>

        <TokenSection title="Icons">
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
            {iconAssets.map((asset) => (
              <AssetCard
                key={asset.label}
                label={asset.label}
                src={asset.src}
                background={asset.background}
              />
            ))}
          </Stack>
        </TokenSection>

        <TokenSection title="Favicon Assets">
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
            {faviconAssets.map((asset) => (
              <AssetCard
                key={asset.label}
                label={asset.label}
                src={asset.src}
                background={asset.background}
              />
            ))}
          </Stack>
        </TokenSection>

        <TokenSection title="Typography">
          <Stack spacing={1.5}>
            {typographyVariants.map((variant) => (
              <Box key={variant}>
                <Typography variant={variant}>
                  {variant} The quick brown fox jumps over the lazy dog.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  fontSize:{" "}
                  {theme.typography[variant].fontSize?.toString() ?? "-"}
                  {" | "}
                  lineHeight:{" "}
                  {theme.typography[variant].lineHeight?.toString() ?? "-"}
                  {" | "}
                  fontWeight:{" "}
                  {theme.typography[variant].fontWeight?.toString() ?? "-"}
                </Typography>
                <Divider sx={{ mt: 1.5 }} />
              </Box>
            ))}
          </Stack>
        </TokenSection>

        <TokenSection title="Grid Tokens">
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                flex: 1,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Desktop
              </Typography>
              <Typography variant="body2">
                columns: {layoutGrid.desktop.columns}
              </Typography>
              <Typography variant="body2">
                containerWidth: {layoutGrid.desktop.containerWidth}px
              </Typography>
              <Typography variant="body2">
                marginX: {layoutGrid.desktop.marginX}px
              </Typography>
              <Typography variant="body2">
                gutter: {layoutGrid.desktop.gutter}px
              </Typography>
              <Typography variant="body2">
                columnHeight: {layoutGrid.desktop.columnHeight}px
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                flex: 1,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Mobile
              </Typography>
              <Typography variant="body2">
                columns: {layoutGrid.mobile.columns}
              </Typography>
              <Typography variant="body2">
                containerWidth: {layoutGrid.mobile.containerWidth}px
              </Typography>
              <Typography variant="body2">
                marginX: {layoutGrid.mobile.marginX}px
              </Typography>
              <Typography variant="body2">
                gutter: {layoutGrid.mobile.gutter}px
              </Typography>
              <Typography variant="body2">
                columnHeight: {layoutGrid.mobile.columnHeight}px
              </Typography>
            </Paper>
          </Stack>
        </TokenSection>

        <TokenSection title="MUI Baseline Settings">
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ mb: 2, flexWrap: "wrap" }}
          >
            <Chip label={`mode: ${theme.palette.mode}`} />
            <Chip
              label={`cssVariables: ${theme.vars ? "enabled" : "disabled"}`}
            />
            <Chip label={`fontFamily: ${theme.typography.fontFamily}`} />
            <Chip label={`shape.borderRadius: ${theme.shape.borderRadius}`} />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ mb: 2.5, flexWrap: "wrap" }}
          >
            <Chip label={`breakpoint xs: ${theme.breakpoints.values.xs}`} />
            <Chip label={`sm: ${theme.breakpoints.values.sm}`} />
            <Chip label={`md: ${theme.breakpoints.values.md}`} />
            <Chip label={`lg: ${theme.breakpoints.values.lg}`} />
            <Chip label={`xl: ${theme.breakpoints.values.xl}`} />
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Stack>
        </TokenSection>
      </Stack>
    </Box>
  );
}
