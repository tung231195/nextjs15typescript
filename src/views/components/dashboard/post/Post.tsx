"use client";

import CustomDataGrid from "@/app/components/custom/CustomDataGrid";
import CustomModal from "@/app/components/custom/CustomModal";
import { AppDispatch, RootState } from "@/app/store";
import { fetchPosts } from "@/app/store/actions/post";
import { PostType } from "@/app/types";
import { Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "./Form";

const Post = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const posts = useSelector((state: RootState) => state.post.posts) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts()).unwrap().catch(console.error);
  }, [dispatch]);

  const rows = posts.map((p) => ({ ...p, id: p._id }));

  const handleEditRow = (
    params: GridRenderCellParams<
      PostType & { id: string },
      unknown,
      unknown,
      GridTreeNodeWithRender
    >,
  ) => {
    setOpenModal({ open: true, id: params.row._id });
  };

  const columns: GridColDef<PostType & { id: string }>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <span>{typeof params.row.user === "object" ? params.row.user.name : "Guest"}</span>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <Box
          component="img"
          src={Array.isArray(params.row.images) ? params.row.images[0] : params.row.images}
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
    { field: "title", headerName: "Title", width: 150, editable: true },
    { field: "content", headerName: "Content", width: 110, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return <Button onClick={() => handleEditRow(params)}>Edit</Button>;
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setOpenModal({ open: true, id: "" })}>Add New</Button>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <CustomModal
          open={openModal.open}
          handleClose={() => setOpenModal({ open: false, id: openModal.id })}
        >
          <PostForm
            openModal={openModal}
            handleClose={() => setOpenModal({ open: false, id: openModal.id })}
          />
        </CustomModal>
      )}
    </Box>
  );
};
export default Post;
