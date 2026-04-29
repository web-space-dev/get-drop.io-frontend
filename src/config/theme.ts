import { createTheme } from "@mui/material/styles";
import { Parkinsans } from "next/font/google";

export const designSystemColors = {
  dropBlue: "#001FDD",
  deepNavy: "#00024F",
  brightGreen: "#00F8A9",
  lightBlue: "#bbdefb",
  background: "#F8FAFC",
  white: "#FFFFFF",
  error: "#FD2D4C",
  textSecondary: "#334155",
} as const;

export const parkinsans = Parkinsans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  adjustFontFallback: false, // This silences the warning
});
const headingDesktop = {
  h1: {
    fontSize: "58px",
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "0",
  },
  h2: {
    fontSize: "42px",
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "0",
  },
  h3: {
    fontSize: "28px",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "0",
  },
  h4: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "0",
  },
  h5: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "0",
  },
  h6: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "0",
  },
} as const;

const headingMobile = {
  h1: { fontSize: "36px" },
  h2: { fontSize: "28px" },
  h3: { fontSize: "24px" },
  h4: { fontSize: "20px" },
  h5: { fontSize: "18px" },
  h6: { fontSize: "16px" },
} as const;

export const layoutGrid = {
  desktop: {
    columns: 12,
    containerWidth: 1440,
    marginX: 72,
    gutter: 24,
    columnHeight: 120,
  },
  mobile: {
    columns: 6,
    containerWidth: 392,
    marginX: 24,
    gutter: 16,
    columnHeight: 120,
  },
} as const;

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: designSystemColors.dropBlue,
      dark: designSystemColors.deepNavy,
      contrastText: designSystemColors.white,
    },
    secondary: {
      main: designSystemColors.deepNavy,
      contrastText: designSystemColors.white,
    },
    error: {
      main: designSystemColors.error,
      contrastText: designSystemColors.white,
    },
    success: {
      main: designSystemColors.brightGreen,
      contrastText: designSystemColors.deepNavy,
    },
    info: {
      main: designSystemColors.lightBlue,
      contrastText: designSystemColors.deepNavy,
    },
    background: {
      default: designSystemColors.background,
      paper: designSystemColors.white,
    },
    text: {
      primary: designSystemColors.deepNavy,
      secondary: designSystemColors.textSecondary,
    },
    divider: designSystemColors.deepNavy,
  },
  typography: {
    fontFamily:
      '"Parkinsans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      ...headingDesktop.h1,
      "@media (max-width:600px)": headingMobile.h1,
    },
    h2: {
      ...headingDesktop.h2,
      "@media (max-width:600px)": headingMobile.h2,
    },
    h3: {
      ...headingDesktop.h3,
      "@media (max-width:600px)": headingMobile.h3,
    },
    h4: {
      ...headingDesktop.h4,
      "@media (max-width:600px)": headingMobile.h4,
    },
    h5: {
      ...headingDesktop.h5,
      "@media (max-width:600px)": headingMobile.h5,
    },
    h6: {
      ...headingDesktop.h6,
      "@media (max-width:600px)": headingMobile.h6,
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0",
    },
    subtitle2: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0",
    },
    button: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0.5px",
      textTransform: "none",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.5px",
    },
    overline: {
      fontSize: "10px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.5px",
      textTransform: "none",
    },
  },
});

export default theme;
