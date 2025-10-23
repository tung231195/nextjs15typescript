"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentMethodForm from "./Form";
import { PaymentMethodType } from "@/app/types";
import { deletePaymentMethod, fetchPaymentMethods } from "@/app/store/actions/payment";

const PaymentMethod = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const paymentMethods =
    useSelector((state: RootState) => state.paymentMethod.paymentMethods) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPaymentMethods()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = paymentMethods.map((p) => ({ ...p, id: p._id }));

  const handleEditRow = (
    params: GridRenderCellParams<
      PaymentMethodType & {
        id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    setOpenModal({ open: true, id: params.row._id });
  };

  const handleDeleteRow = (
    params: GridRenderCellParams<
      PaymentMethodType & {
        id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    dispatch(deletePaymentMethod(params.row._id));
  };

  const columns: GridColDef<PaymentMethodType & { id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "method",
      headerName: "Payment Method",
      width: 150,
      editable: true,
    },
    { field: "status", headerName: "Status", width: 150, editable: true },
    { field: "transactionId", headerName: "transactionId", width: 150, editable: true },
    { field: "paidAt", headerName: "paidAt", width: 150, editable: true },
    { field: "amount", headerName: "amount", width: 150, editable: true },
    { field: "currency", headerName: "currency", width: 150, editable: true },
    { field: "rawResponse", headerName: "rawResponse", width: 150, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleEditRow(params)}>Edit</Button>
            <Button onClick={() => handleDeleteRow(params)}>Delete</Button>
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setOpenModal({ open: true, id: "" })}>Add New PaymentMethod</Button>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <CustomModal
          open={openModal.open}
          handleClose={() => setOpenModal({ open: false, id: openModal.id })}
        >
          <PaymentMethodForm
            openModal={openModal}
            handleClose={() => setOpenModal({ open: false, id: openModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default PaymentMethod;
