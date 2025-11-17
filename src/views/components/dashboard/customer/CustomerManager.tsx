"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import { useUpdateUserStatusMutation } from "@/app/hooks/useOrderMutation";
import { getAllCustomers } from "@/app/services/userService";
import { Customer } from "@/app/types";
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
import { useState } from "react";
import CustomerForm from "./Form";
import CustomModal from "@/app/components/custom/CustomModal";

export const getOrders = async () => {
  const res = await axios.get("/api/customers");
  return res.data;
};
const style = {
  position: "absolute",
  top: 10,
  right: 0,
  maxWidth: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "100vh",
  overflow: "scroll",
};
const CustomerManager = () => {
  const [action, setAction] = useState<Customer["status"]>("enable");
  const updateStatus = useUpdateUserStatusMutation();
  const [openUserModal, setOpenUserModal] = useState<{ open: boolean; id: string }>({
    open: false,
    id: "",
  });
  // 🔹 Lấy danh sách Customers
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  const rows = customers && customers.map((p: Customer) => ({ ...p }));
  const handleChange = (event: SelectChangeEvent, userId: string) => {
    const newStatus = event.target.value as Customer["status"];
    setAction(newStatus);
    updateStatus.mutate({
      customerId: userId,
      status: newStatus,
    });
  };

  if (isError)
    return (
      <Typography color="error" textAlign="center">
        Lỗi khi tải danh sách khách hàng
      </Typography>
    );

  const handleViewOrder = (
    params: GridRenderCellParams<
      Customer & {
        _id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    setOpenUserModal({ open: true, id: params.row._id });
  };

  const handleDeleteRow = (
    params: GridRenderCellParams<
      Customer & {
        _id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    console.log(params);
  };

  const columns: GridColDef<Customer & { _id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "auprovider",
      headerName: "Provider",
      width: 150,
      renderCell: (params) => {
        const name = params.row.authProvider;
        return <Typography variant="inherit">{name}</Typography>;
      },
    },
    {
      field: "name",
      headerName: "User Name",
      width: 150,
      renderCell: (params) => {
        const name = params.row.name;
        return <Typography variant="inherit">{name}</Typography>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 120,
      renderCell: (params) => {
        const email = params.row?.email;
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
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      renderCell: (params) => {
        const status = params.row?.status ?? "disable";
        let color: "error" | "info" | "success" | "warning" = "error";
        switch (status) {
          case "enable":
            color = "success";
            break;
          case "disabled":
            color = "warning";
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
        return (
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={params.row.status}
              onChange={(e) => handleChange(e, params.row._id)}
            >
              <MenuItem value="enable">Enable</MenuItem>
              <MenuItem value="disabled">Disabled</MenuItem>
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

  if (!customers) return <Typography textAlign="center">Order not found</Typography>;

  return (
    <Box>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openUserModal && (
        <CustomModal
          sx={style}
          open={openUserModal.open}
          handleClose={() => setOpenUserModal({ open: false, id: openUserModal.id })}
        >
          <CustomerForm
            openUserModal={openUserModal}
            handleClose={() => setOpenUserModal({ open: false, id: openUserModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default CustomerManager;
