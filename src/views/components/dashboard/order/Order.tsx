"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import { useUpdateOrderStatusMutation } from "@/app/hooks/useOrderMutation";
import { getAllOrdertsService } from "@/app/services/orderService";
import { OrderItem } from "@/app/types";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const getOrders = async () => {
  const res = await axios.get("/api/orders");
  return res.data;
};

const OrderManager = () => {
  const router = useRouter();
  const [action, setAction] = useState<OrderItem["status"]>("pending");
  const updateStatus = useUpdateOrderStatusMutation();
  // 🔹 Lấy danh sách đơn hàng
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdertsService,
  });
  const rows = orders && orders.data.map((p: OrderItem) => ({ ...p }));

  const handleViewOrder = (
    params: GridRenderCellParams<
      OrderItem & {
        _id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    router.push(`orders/${params.id}`);
  };

  const handleDeleteRow = (
    params: GridRenderCellParams<
      OrderItem & {
        _id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    console.log(params);
  };

  const columns: GridColDef<OrderItem & { _id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "User Name",
      width: 90,
      renderCell: (params) => {
        const user = params.row.user;
        const name = typeof user === "object" && user ? user.name : "—";
        return <Typography variant="inherit">{name}</Typography>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 90,
      renderCell: (params) => {
        const user = params.row.user;
        const email = typeof user === "object" && user ? user.email : "—";
        return <Typography variant="inherit">{email}</Typography>;
      },
    },
    {
      field: "createdAt",
      headerName: "Order Time",
      width: 180,
      renderCell: (params) => {
        const createdAt = params.row.createdAt;
        const formatted = createdAt
          ? new Date(createdAt).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "—";

        return <Typography variant="inherit">{formatted}</Typography>;
      },
    },

    {
      field: "method",
      headerName: "Address",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return <Typography variant="inherit">{params.row.shippingAddress.address}</Typography>;
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",

      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <Typography sx={{ verticalAlign: "center" }} variant="inherit">
            {params.row.paymentMethod}
          </Typography>
        );
      },
    },
    {
      field: "shippingPrice",
      headerName: "Shipping Fee",
      width: 100,
      editable: true,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 100,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      renderCell: (params) => {
        const status = params.row?.status ?? "pending";
        let color: "error" | "info" | "success" | "warning" = "error";
        switch (status) {
          case "pending":
            color = "warning";
            break;
          case "processing":
            color = "info";
            break;
          case "delivered":
            color = "success";
            break;
          case "cancel":
            color = "error";
            break;
          default:
            color = "warning";
            break;
        }

        return (
          <>
            <Chip label={status} color={color} size="medium" />
          </>
        );
      },
    },
    {
      field: "status_action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const orderId = params.row._id;
        const handleChange = (event: SelectChangeEvent) => {
          const newStatus = event.target.value as OrderItem["status"];
          setAction(newStatus);
          updateStatus.mutate({
            reference: orderId,
            status: newStatus,
          });
        };
        return (
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={action}
              onChange={handleChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="cancel">Cancel</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "actions",
      headerName: "View",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleViewOrder(params)}>View</Button>
            <Button onClick={() => handleDeleteRow(params)}>Delete</Button>
          </>
        );
      },
    },
  ];

  if (isLoading)
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </Box>
    );

  if (!orders) return <Typography textAlign="center">Order not found</Typography>;

  return (
    <Box>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
};
export default OrderManager;
