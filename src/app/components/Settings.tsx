"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Settings() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, logout } = useAuthContext();
  const router = useRouter();
  return (
    <div>
      <Button
        sx={{ color: "#fff" }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon icon="material-symbols:settings" width="24" height="24" />
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem> {user && <Typography variant="button">{user.email}</Typography>}</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem>
          {!user ? (
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/dashboard">Dashboard</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
