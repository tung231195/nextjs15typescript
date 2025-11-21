"use client";

import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const InstagramLayout = () => {
  const t = useTranslations("Instagram");

  const data = [
    { image: "/images/fs5_i1.jpg" },
    { image: "/images/fs5_i2.jpg" },
    { image: "/images/fs5_i3.jpg" },
    { image: "/images/fs5_i4.jpg" },
  ];

  return (
    <Box mt={6} px={{ xs: 2, sm: 4, md: 6 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #000, #000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("title")}
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
            maxWidth: 600,
            color: "text.secondary",
          }}
        >
          {t("description")}
        </Typography>
      </Box>

      {/* Instagram Images */}
      <Grid container spacing={2}>
        {data.map((i) => (
          <Grid key={i.image} size={{ xs: 6, md: 3 }}>
            <CardMedia
              sx={{
                height: 280,
                borderRadius: 2,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                },
              }}
              image={i.image}
            />
          </Grid>
        ))}
      </Grid>

      {/* Follow Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50px",
            px: 6,
            py: 1.5,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #ff6b6b, #ff4757, #ff7f50)",
            boxShadow: "0 8px 20px rgba(255, 90, 90, 0.4)",
            "&:hover": {
              boxShadow: "0 10px 26px rgba(255, 90, 90, 0.55)",
              transform: "translateY(-2px)",
            },
            transition: "0.25s ease",
          }}
        >
          {t("followButton")}
        </Button>
      </Box>
    </Box>
  );
};

export default InstagramLayout;
