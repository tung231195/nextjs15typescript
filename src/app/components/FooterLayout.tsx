"use client";
import Link from "next/link";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

export default function FooterLayout() {
  const theme = useTheme();
  const t = useTranslations("Footer");

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        py: 6,
        px: 4,
        mt: 8,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ md: 3, xs: 12 }}>
          <Typography variant="h6" mb={2}>
            {t("company")}
          </Typography>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("aboutUs")}
          </Link>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("careers")}
          </Link>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("blog")}
          </Link>
        </Grid>

        <Grid size={{ md: 3, xs: 12 }}>
          <Typography variant="h6" mb={2}>
            {t("support")}
          </Typography>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("contact")}
          </Link>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("faqs")}
          </Link>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("shippingReturns")}
          </Link>
        </Grid>

        <Grid size={{ md: 3, xs: 12 }}>
          <Typography variant="h6" mb={2}>
            {t("legal")}
          </Typography>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("privacyPolicy")}
          </Link>
          <Link href="/" style={{ display: "block", color: "#fff", marginBottom: 4 }}>
            {t("termsOfService")}
          </Link>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={6}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} {t("companyName")}. {t("allRightsReserved")}
        </Typography>
      </Box>
    </Box>
  );
}
