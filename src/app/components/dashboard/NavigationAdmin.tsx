"use client";

import { Box, Button, styled, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";
import ToogleDarkMode from "../ToogleDarkLight";
import Settings from "../Settings";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
type TPropHeaderAdmin = {
  open: boolean;
  handleDrawerOpen: (open: boolean) => void;
};
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export default function NavigationAdmin({ open, handleDrawerOpen }: TPropHeaderAdmin) {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpen(true)}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        {/* Menu ngang */}
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} href="/dashboard">
            DashBoard
          </Button>
        </Box>
        <LocaleSwitcher />

        <Settings />
        <ToogleDarkMode />
      </Toolbar>
    </AppBar>
  );
}
