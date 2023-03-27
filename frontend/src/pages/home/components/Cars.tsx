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

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 150 },
  { field: "model", headerName: "Modelo", width: 150 },
  { field: "power", headerName: "Potência", width: 150 },
  { field: "brand", headerName: "Marca", width: 150 },
  { field: "licensePlate", headerName: "Placa", width: 150 },
  { field: "renavam", headerName: "Renavam", width: 150 },
];

const Cars = () => {
  const { data, error, loading } = useFetching<ICar>({ url: "/car" });
  const rows: any = data.map((item) => {
    return {
      id: item.id,
      model: item.model,
      power: item.power,
      brand: item.brand,
      licensePlate: item.licensePlate,
      renavam: item.renavam,
    };
  });
  return (
    <div style={{ height: 300, width: "80%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Cars;
