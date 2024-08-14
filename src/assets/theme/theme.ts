"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const primaryFontSize = 14;
const PrimaryTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: primaryFontSize,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    body1: {
      fontSize: primaryFontSize,
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          boxShadow: "none",
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: "0px",
        },
      },
    },
  },
});

export default PrimaryTheme;
