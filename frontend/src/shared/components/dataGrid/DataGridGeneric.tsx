import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFetching } from "../../hooks/useFetching";

interface props<T> {
  url: string;
  column: GridColDef<any, any, any>[];
  newItem?: T;
}

function Grid<T>({ url, column, newItem }: props<T>) {
  const { data, error, loading, addItem } = useFetching<T>({ url });
  useEffect(() => {
    if (newItem) addItem(newItem);
  }, [newItem]);

  const rows = data.map((item) => {
    return {
      ...item,
    };
  });

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
