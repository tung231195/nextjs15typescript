"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { deleteCategory, fetchCategories } from "@/app/store/actions/category";
import { CategoryType } from "@/app/types";
import { Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./Form";

const Category = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const categories = useSelector((state: RootState) => state.cate.categories) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = categories.map((p) => ({ ...p, id: p._id }));

  const handleEditRow = (
    params: GridRenderCellParams<
      CategoryType & {
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
      CategoryType & {
        id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    dispatch(deleteCategory(params.row._id));
  };

  const columns: GridColDef<CategoryType & { id: string }>[] = [
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
      <Button onClick={() => setOpenModal({ open: true, id: "" })}>Add New Category</Button>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <CustomModal
          open={openModal.open}
          handleClose={() => setOpenModal({ open: false, id: openModal.id })}
        >
          <CategoryForm
            openModal={openModal}
            handleClose={() => setOpenModal({ open: false, id: openModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default Category;
