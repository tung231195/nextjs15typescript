"use client";

import * as React from "react";
import {
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppTheme} from "../context/ThemeContext";
export default function ToogleDarkMode() {
  const {mode,toggleMode} = useAppTheme();
  return (
      <IconButton color="inherit" onClick={toggleMode}>
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
  );
}
