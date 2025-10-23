"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { deleteProduct, fetchProducts } from "@/app/store/actions/product";
import { ProductType } from "@/app/types";
import { Box, Button, CardMedia } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./Form";

const Product = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const products = useSelector((state: RootState) => state.product.products) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = products.map((p) => ({ ...p, id: p._id }));
  console.log("row", rows);
  const handleEditRow = (
    params: GridRenderCellParams<
      ProductType & {
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
      ProductType & {
        id: string;
      },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    dispatch(deleteProduct(params.row._id));
  };

  const columns: GridColDef<ProductType & { id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "images",
      headerName: "Images",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <CardMedia
            component="img"
            height="194"
            image={params?.row.images ? params.row.images[0] : ""}
            alt="Paella dish"
          />
        );
      },
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
      <Button onClick={() => setOpenModal({ open: true, id: "" })}>Add New Product</Button>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <CustomModal
          open={openModal.open}
          handleClose={() => setOpenModal({ open: false, id: openModal.id })}
        >
          <ProductForm
            openModal={openModal}
            handleClose={() => setOpenModal({ open: false, id: openModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default Product;
