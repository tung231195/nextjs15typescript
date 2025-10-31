"use client";

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

type SidebarProps = {
  open: boolean;
  toggleDrawer: (open?: boolean) => void;
};

const drawerWidth = 240;

export default function SidebarAdmin({ open, toggleDrawer }: SidebarProps) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={() => toggleDrawer(false)}
      ModalProps={{
        keepMounted: true, // tối ưu mobile
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ mt: 8 }}>
        <List>
          {[
            { text: "Dashboard", icon: "material-symbols:dashboard", href: "/dashboard" },
            { text: "Posts", icon: "material-symbols:article", href: "/dashboard/post" },
            { text: "Users", icon: "material-symbols:group", href: "/dashboard/users" },
            { text: "Settings", icon: "material-symbols:settings", href: "/dashboard/settings" },
          ].map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              href={item.href}
              onClick={() => toggleDrawer(false)}
            >
              <ListItemIcon>
                <Icon icon={item.icon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
