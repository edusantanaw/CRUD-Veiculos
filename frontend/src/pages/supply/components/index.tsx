import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Grid from "../../../shared/components/dataGrid/DataGridGeneric";
import { useFetching } from "../../../shared/hooks/useFetching";
import { dataSupply, ISupply } from "../../../shared/types/supply";
import {
  makeEdit,
  makeRemove,
  supplyColumns,
} from "../../../shared/utils/dataGrid";
import { handlePost } from "../../../shared/utils/postOrPut";
import Top from "./Top";

interface props {
  handleEdit: (supply: ISupply | null) => void;
  handleRemove: (supply: ISupply | null) => void;
  dependeces: unknown[]
}

const Index = ({ handleEdit, handleRemove, dependeces }: props) => {
  const [newItem, setNewItem] = useState<ISupply>();

  const { data, error, loading } = useFetching<ISupply>({
    url: "/supply",
    dependeces: [newItem, ...dependeces],
  });

  const columns = [
    ...supplyColumns,
    makeEdit(handleEdit),
    makeRemove(handleRemove),
  ] as GridColDef<any, any, any>[];

  async function handleCreate(data: dataSupply) {
    const response = await handlePost<dataSupply, ISupply>({
      url: "/supply",
      data,
      method: "post",
    });
    if (response.success) {
      setNewItem(() => response.data);
    }
    return response;
  }

  return (
    <>
      <Top handleCreate={handleCreate} />
      <Grid rows={data} column={columns} />
    </>
  );
};

export default Index;
