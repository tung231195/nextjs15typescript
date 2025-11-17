"use client";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Badge, Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
interface CommentNotifyEvent {
  data: { user?: { email?: string } };
}
interface OrderNotifyEvent {
  data: { user: string; message: string };
}
const Notifycations = () => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<string[]>([]);
  const { onEvent, emitEvent } = useSocket();
  useEffect(() => {
    if (!onEvent) return;
    if (user?.role === "superadmin") {
      console.log("run to admin");
      emitEvent("join", "superadmin");
    } else {
      // emitEvent("join", user?._id);
    }

    const off = onEvent<CommentNotifyEvent>("comment.notify", (msg) => {
      setNotifications((prev) => [...prev, msg.data.user?.email ?? ""]);
    });

    const offOrder = onEvent<OrderNotifyEvent>("order.create.notify", (msg) => {
      console.log("Order notify", msg);
    });

    // ⚠ chỉ return 1 lần
    return () => {
      if (typeof off === "function") off();
      if (typeof offOrder === "function") offOrder();
    };
  }, [onEvent]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // const handleClickNotification = (postId: string) => {
  //   handleClose();
  // };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 280, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Thông báo
          </Typography>
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              Không có thông báo mới
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((n, index) => (
            <MenuItem key={index}>
              <Typography variant="body2">{n}</Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};
export default Notifycations;
