import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export const supplyColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "carId",
    headerName:"Carro id",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "typeFuel",
    headerName:"Combustivel",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName:"Preço",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "quantitySupplied",
    headerName:"Quantidade",
    width: 150,
    align: "center",
    headerAlign: "center",
  }
]
export const carColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "model",
    headerName: "Modelo",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "power",
    headerName: "Potência",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "licensePlate",
    headerName: "Placa",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "renavam",
    headerName: "Renavam",
    width: 130,
    align: "center",
    headerAlign: "center",
  }
];

type Action<T, R> = (data: T) => R;

export function makeRemove<T, R>(fn: Action<T, R>) {
  return {
    field: "remove",
    headerName: "Remover",
    width: 130,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (
      param: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => (
      <DeleteIcon
        onClick={() => fn(param.row)}
        sx={{ cursor: "pointer", color: "red" }}
      />
    ),
  };
}

export function makeSupply<T, R>(fn: Action<T, R>) {
  return {
    renderCell: (
      param: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => (
      <LocalGasStationIcon
        onClick={() => fn(param.row)}
        sx={{ cursor: "pointer", color: "blueviolet" }}
      />
    ),
  };
}

export function makeEdit<T, R>(fn: Action<T, R>) {
  return {
    field: "edit",
    headerName: "Editar",
    width: 90,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (
      param: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => (
      <ModeEditOutlineIcon
        onClick={() => fn(param.row)}
        sx={{ cursor: "pointer", color: "blueviolet" }}
      />
    ),
  };
}
