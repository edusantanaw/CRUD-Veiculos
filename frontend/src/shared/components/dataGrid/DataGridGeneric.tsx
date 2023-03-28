import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface props<T> {
  column: GridColDef<any, any, any>[];
  rows: T[];
}

function Grid<T>({ column = [], rows }: props<T>) {
  const [list, setList] = useState<T[]>([]);

  useEffect(() => {
    setList(() => [...rows]);
  }, [rows]);

  return (
    <div style={{ height: 300, width: "100%" }} id="grid">
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
