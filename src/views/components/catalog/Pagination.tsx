import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // số trang hiển thị trước/sau current
  boundaryCount?: number; // số trang đầu/cuối hiển thị
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} alignItems="center" my={3}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default Pagination;
