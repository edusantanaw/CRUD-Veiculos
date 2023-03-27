import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Grid from "../../../../shared/components/dataGrid/DataGridGeneric";
import { usePost } from "../../../../shared/hooks/usePost";
import { IUser } from "../../../../shared/types/user";
import {
  carColumns,
  makeEdit,
  makeRemove,
} from "../../../../shared/utils/dataGrid";
import Top from "./Top";
import { ICar } from "../../../../shared/types/car";
import { useFetching } from "../../../../shared/hooks/useFetching";

interface props {
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
  id?: string;
}

export function Car({ handleEdit, handleRemove }: props) {
  const [newItem, setNewItem] = useState<ICar | null>(null);

  const { data, error, loading, addItem } = useFetching<ICar>({
    url: "/car",
  });

  const post = usePost<ICar>();

  const carColumn = [
    ...carColumns,
    makeEdit(handleEdit),
    makeRemove(handleRemove),
  ] as GridColDef<any, any, any>[];

  async function handleCreate(data: any) {
    const response = await post({ url: "/car", data });
    if (!response.error && response.response) {
      addItem(response.response);
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
