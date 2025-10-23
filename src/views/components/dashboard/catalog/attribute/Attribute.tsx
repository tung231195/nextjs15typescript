"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { deleteAttribute, fetchAttributes } from "@/app/store/actions/attribute";
import { AttributeType } from "@/app/types";
import { Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttributeForm from "./Form";

const Attribute = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const attributes = useSelector((state: RootState) => state.attribute.attributes) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAttributes()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = attributes.map((p) => ({ ...p, id: p._id }));

  const handleEditRow = (
    params: GridRenderCellParams<
      AttributeType & {
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
      AttributeType & {
        id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    dispatch(deleteAttribute(params.row._id));
  };

  const columns: GridColDef<AttributeType & { id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    { field: "slug", headerName: "Slug", width: 150, editable: true },
    { field: "type", headerName: "Type", width: 150, editable: true },
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
      <Button onClick={() => setOpenModal({ open: true, id: "" })}>Add New Attribute</Button>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <CustomModal
          open={openModal.open}
          handleClose={() => setOpenModal({ open: false, id: openModal.id })}
        >
          <AttributeForm
            openModal={openModal}
            handleClose={() => setOpenModal({ open: false, id: openModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default Attribute;
