import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const designSystemColors = {
  lightBlue: "#bbdefb",
  offWhite: "#fafafa",
  offBlack: "#1a1a1a",
  blue: "#0907d0",
  navy: "#001c79",
  red: "#d50000",
  yellow: "#f6b704",
  green: "#006621",
  grey: "#757575",
  mediumGrey: "#464646",
  darkGrey: "#202020",
  lightGrey: "#e9e9e9",
  lavendar: "#f1f0fd",
  brightBlue: "#1976d2",
  darkNavy: "#01005e",
  greyLavendar: "#dcd2e8",
  paleBlue: "#e3f2fd",
  powderBlue: "#d8edff",
  lightPink: "#ffeafc",
  peach: "#ffead9",
  plum900: "#371b3d",
  plum700: "#553055",
  purple: "#813c7a",
  brown: "#873600",
  violet: "#8c038e"
} as const;

export const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

const headingDesktop = {
  h1: {
    fontSize: "58px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0"
  },
  h2: {
    fontSize: "42px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0"
  },
  h3: {
    fontSize: "28px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0"
  },
  h4: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0"
  },
  h5: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0"
  },
  h6: { fontSize: "18px", fontWeight: 600, lineHeight: 1.5, letterSpacing: "0" }
} as const;

const headingMobile = {
  h1: { fontSize: "32px" },
  h2: { fontSize: "28px" },
  h3: { fontSize: "24px" },
  h4: { fontSize: "20px" },
  h5: { fontSize: "18px" },
  h6: { fontSize: "16px" }
} as const;

export const layoutGrid = {
  desktop: {
    columns: 12,
    containerWidth: 1440,
    marginX: 72,
    gutter: 24,
    columnHeight: 120
  },
  mobile: {
    columns: 6,
    containerWidth: 392,
    marginX: 24,
    gutter: 16,
    columnHeight: 120
  }
} as const;

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: designSystemColors.blue,
      light: designSystemColors.brightBlue,
      dark: designSystemColors.darkNavy,
      contrastText: designSystemColors.offWhite
    },
    secondary: {
      main: designSystemColors.navy,
      light: designSystemColors.lightBlue,
      dark: designSystemColors.darkNavy,
      contrastText: designSystemColors.offWhite
    },
    error: {
      main: designSystemColors.red,
      contrastText: designSystemColors.offWhite
    },
    warning: {
      main: designSystemColors.yellow,
      contrastText: designSystemColors.offBlack
    },
    success: {
      main: designSystemColors.green,
      contrastText: designSystemColors.offWhite
    },
    info: {
      main: designSystemColors.brightBlue,
      contrastText: designSystemColors.offWhite
    },
    background: {
      default: designSystemColors.offWhite,
      paper: "#ffffff"
    },
    text: {
      primary: designSystemColors.offBlack,
      secondary: designSystemColors.mediumGrey
    },
    divider: designSystemColors.lightGrey,
    common: {
      black: designSystemColors.offBlack,
      white: designSystemColors.offWhite
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      ...headingDesktop.h1,
      "@media (max-width:600px)": headingMobile.h1
    },
    h2: {
      ...headingDesktop.h2,
      "@media (max-width:600px)": headingMobile.h2
    },
    h3: {
      ...headingDesktop.h3,
      "@media (max-width:600px)": headingMobile.h3
    },
    h4: {
      ...headingDesktop.h4,
      "@media (max-width:600px)": headingMobile.h4
    },
    h5: {
      ...headingDesktop.h5,
      "@media (max-width:600px)": headingMobile.h5
    },
    h6: {
      ...headingDesktop.h6,
      "@media (max-width:600px)": headingMobile.h6
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0"
    },
    subtitle2: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0"
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0"
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0"
    },
    button: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0.5px",
      textTransform: "none"
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.5px"
    },
    overline: {
      fontSize: "10px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.5px",
      textTransform: "none"
    }
  }
});

export default theme;
