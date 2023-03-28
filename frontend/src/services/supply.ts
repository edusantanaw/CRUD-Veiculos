import { Api } from "../shared/utils/Api";
import { makeHeaders } from "../shared/utils/makeHeaders";

export async function deleteSupply(id: string) {
  const response = await Api.delete(`/supply/${id}`, makeHeaders());
  return response.data;
}
