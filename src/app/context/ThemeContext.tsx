"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getDesignTokens } from "@/theme/theme";

type ThemeContextType = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // MUI theme thay đổi theo context
  const theme = useMemo(() => getDesignTokens(mode), [mode]);
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Reset style theo theme */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// Hook tiện dùng
export function useAppTheme() {
  return useContext(ThemeContext);
}
