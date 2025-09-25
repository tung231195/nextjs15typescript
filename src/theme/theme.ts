import { createTheme } from "@mui/material/styles";

const lightPalette = {
  mode: "light" as const,
  primary: { main: "#1976d2" },
  secondary: { main: "#9c27b0" },
  background: {
    default: "#fafafa",
    paper: "#fff",
  },
  text: {
    primary: "#000",
    secondary: "#555",
  },
};

const darkPalette = {
  mode: "dark" as const,
  primary: { main: "#90caf9" },
  secondary: { main: "#ce93d8" },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#fff",
    secondary: "#aaa",
  },
};

export const getDesignTokens = (mode: "light" | "dark") =>
  createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
});
