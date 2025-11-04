"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { fetchSlideshows } from "@/app/store/actions/slideshow";
import { SlideshowType } from "@/app/types";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideshowForm from "./Form";
import AddIcon from "@mui/icons-material/Add";

const Slideshow = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const slideshows = useSelector((state: RootState) => state.slideshow.slideshows) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSlideshows()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = slideshows.map((p) => ({ ...p, id: p._id }));

  const handleEditRow = (
    params: GridRenderCellParams<
      SlideshowType & { id: string },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    setOpenModal({ open: true, id: params.row._id });
  };

  const columns: GridColDef<SlideshowType & { id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 180 },
    { field: "description", headerName: "Content", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <Box
          component="img"
          src={Array.isArray(params.row.image) ? params.row.image[0] : params.row.image}
          alt={params.row.title}
          sx={{
            width: 100,
            height: 60,
            borderRadius: 2,
            objectFit: "cover",
            boxShadow: 2,
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.row.status === "enable" ? (
          <Button size="small" color="success" variant="outlined" sx={{ textTransform: "none" }}>
            Enable
          </Button>
        ) : (
          <Button size="small" color="error" variant="outlined" sx={{ textTransform: "none" }}>
            Disabled
          </Button>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleEditRow(params)}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            px: 2,
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600}>
          Slideshow Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal({ open: true, id: "" })}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 2.5,
            py: 1,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Add New
        </Button>
      </Stack>

      {/* Data Grid */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <CustomDataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
          }}
        />
      </Paper>

      {/* Modal */}
      <CustomModal open={openModal.open} handleClose={() => setOpenModal({ open: false, id: "" })}>
        <SlideshowForm
          openModal={openModal}
          handleClose={() => setOpenModal({ open: false, id: "" })}
        />
      </CustomModal>
    </Box>
  );
};

export default Slideshow;
