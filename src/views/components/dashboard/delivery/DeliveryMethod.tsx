"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { deleteDeliveryMethod, fetchDeliveryMethods } from "@/app/store/actions/delivery";
import { DeliveryMethodType } from "@/app/types";
import { Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeliveryMethodForm from "./Form";

const DeliveryMethodMethod = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const deliverys = useSelector((state: RootState) => state.delivery.deliveryMethods) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDeliveryMethods()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = deliverys.map((p) => ({ ...p, id: p._id }));

  const handleEditRow = (
    params: GridRenderCellParams<
      DeliveryMethodType & {
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
      DeliveryMethodType & {
        id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    dispatch(deleteDeliveryMethod(params.row._id));
  };

  const columns: GridColDef<DeliveryMethodType & { id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "method",
      headerName: "Delivery Method",
      width: 150,
      editable: true,
    },
    {
      field: "shippingFee",
      headerName: "Shipping Fee",
      width: 150,
      editable: true,
    },
    { field: "status", headerName: "Status", width: 150, editable: true },
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
      <Button onClick={() => setOpenModal({ open: true, id: "" })}>Add New DeliveryMethod</Button>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <CustomModal
          open={openModal.open}
          handleClose={() => setOpenModal({ open: false, id: openModal.id })}
        >
          <DeliveryMethodForm
            openModal={openModal}
            handleClose={() => setOpenModal({ open: false, id: openModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default DeliveryMethodMethod;
