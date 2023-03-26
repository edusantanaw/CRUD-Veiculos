import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useFetching } from "../../../hooks/useFetching";
// import { ICar } from "../../../shared/types/car";

export type ICar = {
  id: string;
  model: string;
  licensePlate: string;
  color: string;
  power: number;
  brand: string;
  renavam: string;
};

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

const Cars = () => {
  const { data, error, loading } = useFetching<ICar>({ url: "/car" });
  console.log(data);
  return (
    <div style={{ height: 300, width: "80%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Cars;
