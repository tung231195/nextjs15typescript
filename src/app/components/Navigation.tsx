"use client";

import LocaleSwitcher from "./LocaleSwitcher";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import Settings from "./Settings";
import ToogleDarkMode from "./ToogleDarkLight";
import Notifycations from "./Notification";
import MiniCart from "./MiniCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function Navigation() {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const base = `/${locale}`;

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { label: t("home"), href: base },
    { label: t("catalog"), href: `${base}/catalog` },
    { label: t("blogs"), href: `${base}/blog` },
    { label: t("about"), href: `${base}/about` },
    { label: t("contact"), href: `${base}/contact` },
  ];

  return (
    <Box className="navigation">
      <AppBar position="relative" color="primary">
        <Toolbar>
          {/* Logo */}
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            My Logo
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "1rem",
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Right actions */}
          <LocaleSwitcher />
          <MiniCart />
          <Settings />
          <ToogleDarkMode />
          <Notifycations />
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} href={item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
