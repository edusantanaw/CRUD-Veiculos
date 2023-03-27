import { GridColDef } from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export const actions: GridColDef[] = [
  {
    field: "edit",
    headerName: "Editar",
    width: 90,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (param) => (
      <ModeEditOutlineIcon
        onClick={() => console.log(param.row.id)}
        sx={{ cursor: "pointer", color: "blueviolet" }}
      />
    ),
  },
  {
    field: "remove",
    headerName: "Remover",
    width: 130,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (para) => (
      <DeleteIcon sx={{ cursor: "pointer", color: "red" }} />
    ),
  },
];

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
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "power",
    headerName: "Potência",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 100,
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
  },
  {
    field: "supply",
    headerName: "Reabastecer",
    width: 110,
    align: "center",
    headerAlign: "center",
    renderCell: (param) => (
      <LocalGasStationIcon
        onClick={() => console.log(param.row.id)}
        sx={{ cursor: "pointer", color: "blueviolet" }}
      />
    ),
  },
  ...actions,
];
