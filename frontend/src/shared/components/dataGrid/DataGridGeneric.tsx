import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface props<T, R> {
  column: GridColDef<any, any, any>[];
  rows: R[];
}

function Grid<T, R>({ column, rows }: props<T, R>) {
  const [list, setList] = useState<R[]>([]);

  useEffect(() => {
    setList(() => [...rows]);
  }, [rows]);

  return (
    <div style={{ height: 300, width: "80%" }}>
      <DataGrid
        autoHeight={true}
        checkboxSelection={true}
        rows={list}
        disableColumnMenu
        hideFooterPagination
        columns={column}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default Grid;
