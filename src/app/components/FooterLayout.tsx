"use client";

import { Box, Typography } from "@mui/material";

export default function FooterLayout() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        textAlign: "center",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Typography>
    </Box>
  );
}
