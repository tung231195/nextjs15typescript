"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, DataGridProps, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export type TPropDataGrid<T extends GridValidRowModel> = {
  rows: T[];
  columns: GridColDef<T>[];
  pageSize: number;
} & Omit<DataGridProps, "rows" | "columns">;

const CustomDataGrid = <T extends { id?: string; _id?: string }>({
  rows,
  columns,
  pageSize,
  ...rest
}: TPropDataGrid<T>) => {
  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      {rows && rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => (row.id ?? row._id) as string}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          {...rest}
        />
      ) : (
        <span>Loading...</span>
      )}
    </Box>
  );
};

export default CustomDataGrid;
