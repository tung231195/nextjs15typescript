"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import NavigationAdmin from "./NavigationAdmin";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled("div")<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

type SidebarItem = {
  label: string;
  icon?: string;
  path?: string;
  children?: SidebarItem[];
};

type TPropContentAdmin = {
  children: React.ReactNode;
};

export default function MiniDrawer({ children }: TPropContentAdmin) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const toggleSubMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarItems: SidebarItem[] = [
    {
      label: "Catalog",
      icon: "lucide:shopping-bag",
      children: [
        { label: "Products", path: "/dashboard/catalog/product" },
        { label: "Categories", path: "/dashboard/catalog/category" },
        { label: "Attributes", path: "/dashboard/catalog/attributes" },
      ],
    },
    {
      label: "Orders",
      icon: "lucide:receipt",
      path: "/dashboard/orders",
    },
    {
      label: "Customers",
      icon: "lucide:users",
      children: [
        { label: "All Customers", path: "/dashboard/customers" },
        { label: "Groups", path: "/dashboard/customers/groups" },
        { label: "Reviews", path: "/dashboard/reviews" },
      ],
    },
    {
      label: "Blog",
      icon: "lucide:file-text",
      children: [
        { label: "Posts", path: "/dashboard/posts" },
        { label: "Categories", path: "/dashboard/categories" },
      ],
    },
    {
      label: "Slideshow",
      icon: "lucide:file-text",
      path: "/dashboard/slideshow",
    },
    {
      label: "Settings",
      icon: "lucide:settings",
      children: [
        { label: "General", path: "/dashboard/settings/general" },
        { label: "Users & Roles", path: "/dashboard/settings/users" },
        { label: "Payments", path: "/dashboard/payment" },
        { label: "Shipping", path: "/dashboard/delivery" },
        { label: "Email", path: "/dashboard/settings/email" },
      ],
    },
  ];

  const renderItem = (item: SidebarItem) => {
    const active = pathname === item.path;

    if (item.children) {
      const isOpen = openMenus[item.label] || false;
      return (
        <React.Fragment key={item.label}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => toggleSubMenu(item.label)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon && <Icon icon={item.icon} width={22} />}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              {open && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItemButton
                  key={child.label}
                  sx={{
                    pl: open ? 8 : 2,
                    backgroundColor: pathname === child.path ? "action.selected" : "transparent",
                  }}
                  onClick={() => router.push(child.path!)}
                >
                  <ListItemText primary={child.label} sx={{ opacity: open ? 1 : 0.8 }} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={() => item.path && router.push(item.path)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            backgroundColor: active ? "action.selected" : "transparent",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {item.icon && <Icon icon={item.icon} width={22} />}
          </ListItemIcon>
          <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavigationAdmin open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box
        component="nav"
        sx={{
          width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{sidebarItems.map((item) => renderItem(item))}</List>
        <Divider />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 2, mt: "60px" }}>
        {children}
      </Box>
    </Box>
  );
}
