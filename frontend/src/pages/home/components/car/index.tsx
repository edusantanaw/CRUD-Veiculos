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

interface props {
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
  id?: string;
}

export function Car({ handleEdit, handleRemove }: props) {
  const post = usePost<IUser>();

  const carColumn = [
    ...carColumns,
    makeEdit(handleEdit),
    makeRemove(handleRemove),
  ] as GridColDef<any, any, any>[];

  async function handleCreate(data: any) {
    const response = await post({ url: "/car", data });
    return response;
  }

  return (
    <>
      <Top handleCreate={handleCreate} />
      <Grid column={carColumn} url="/car" />
    </>
  );
}
