import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface props<T, R> {

  column: GridColDef<any, any, any>[];
  rows: R[];
}

function Grid<T, R>({  column, rows }: props<T, R>) {
  return (
    <div style={{ height: 300, width: "80%" }}>
      <DataGrid
        autoHeight={true}
        checkboxSelection={true}
        rows={rows}
        disableColumnMenu
        hideFooterPagination
        columns={column}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default Grid;
