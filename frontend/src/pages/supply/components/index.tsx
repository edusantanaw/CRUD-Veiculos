import { GridColDef } from "@mui/x-data-grid";
import Grid from "../../../shared/components/dataGrid/DataGridGeneric";
import { useFetching } from "../../../shared/hooks/useFetching";
import { ISupply } from "../../../shared/types/supply";
import {
  makeEdit,
  makeRemove,
  supplyColumns,
} from "../../../shared/utils/dataGrid";

interface props {
  handleEdit: (supply: ISupply | null) => void;
  handleRemove: (supply: ISupply | null) => void;
  supply: ISupply | null;
}

const Index = ({ handleEdit, handleRemove, supply }: props) => {
  const { data, error, loading } = useFetching<ISupply>({
    url: "/supply",
    dependeces: [],
  });

  const columns = [
    ...supplyColumns,
    makeEdit(handleEdit),
    makeRemove(handleRemove),
  ] as GridColDef<any, any, any>[];

  return (
    <>
      <Grid rows={data} column={columns} />
    </>
  );
};

export default Index;
