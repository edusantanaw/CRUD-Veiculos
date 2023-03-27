import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useFetching } from "../../../shared/hooks/useFetching";
import { ICar } from "../../../shared/types/car";
import { carColumns } from "../../../shared/utils/dataGrid";

const Cars = () => {
  const { data, error, loading } = useFetching<ICar>({ url: "/car" });
  const rows = data.map((item) => {
    return {
      ...item,
      edit: item.id,
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
        columns={carColumns}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Cars;
