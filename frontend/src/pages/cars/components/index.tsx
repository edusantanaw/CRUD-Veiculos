import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Grid from "../../../shared/components/dataGrid/DataGridGeneric";
import {
  carColumns,
  makeEdit,
  makeRemove,
} from "../../../shared/utils/dataGrid";
import Top from "./Top";
import { ICar } from "../../../shared/types/car";
import { useFetching } from "../../../shared/hooks/useFetching";
import { handlePost } from "../../../shared/utils/postOrPut";
import {Box} from '@mui/material'

interface props {
  handleEdit: (car: ICar | null) => void;
  handleRemove: (car: ICar | null) => void;
  id?: string;
  dependeces: unknown[];
}

export function Car({ handleEdit, handleRemove, dependeces }: props) {
  const [newItem, setNewItem] = useState<ICar>();

  const { data, error, loading, addItem } = useFetching<ICar>({
    url: "/car",
    dependeces: [newItem, ...dependeces],
  });

  const carColumn = [
    ...carColumns,
    makeEdit(handleEdit),
    makeRemove(handleRemove),
  ] as GridColDef<any, any, any>[];

  async function handleCreate(data: any) {
    const response = await handlePost<any, ICar>({
      url: "/car",
      data,
      method: "post",
    });
    if (response.success) {
      setNewItem(() => response.data);
    }
    return response;
  }
  return (
    <Box sx={{width: "80%"}} >
      <Top handleCreate={handleCreate} />
      <Grid column={carColumn} rows={data} />
    </Box>
  );
}
