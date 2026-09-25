import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRowsProp,
} from "@mui/x-data-grid";
interface DataTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  emptyMessage?: string;
}
function TableLoadingOverlay() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={32} />
      <Typography variant="body2" color="text.secondary">
        Loading files...
      </Typography>
    </Box>
  );
}
interface NoRowsOverlayProps {
  message: string;
}
function NoRowsOverlay({ message }: NoRowsOverlayProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
function DataTable({
  rows,
  columns,
  loading = false,
  emptyMessage = "No records found.",
}: DataTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        pagination
        paginationMode="client"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        slots={{
          loadingOverlay: TableLoadingOverlay,
          noRowsOverlay: () => <NoRowsOverlay message={emptyMessage} />,
        }}
        sx={{
          border: 0,
          minHeight: 420,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            color: "#0f172a",
            borderBottom: "1px solid #e2e8f0",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f1f5f9",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f8fafc",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e2e8f0",
          },
        }}
      />
    </Box>
  );
}
export default DataTable;
