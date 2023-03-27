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
import { usePostOrPut } from "../../../shared/hooks/usePostOrPutt";

interface props {
  handleEdit: (car: ICar | null) => void;
  handleRemove: (car: ICar | null) => void;
  id?: string;
}

export function Car({ handleEdit, handleRemove }: props) {
  const [newItem, setNewItem] = useState<ICar | null>(null);

  const { data, error, loading } = useFetching<ICar>({
    url: "/car",
    dependeces: [newItem],
  });

  const post = usePostOrPut<ICar>({ method: "post" });

  const carColumn = [
    ...carColumns,
    makeEdit(handleEdit),
    makeRemove(handleRemove),
  ] as GridColDef<any, any, any>[];

  async function handleCreate(data: any) {
    const response = await post({ url: "/car", data });
    if (response.response) {
      setNewItem(() => response.response);
    }
    return response;
  }

  return (
    <>
      <Top handleCreate={handleCreate} />
      <Grid column={carColumn} rows={data} />
    </>
  );
}
