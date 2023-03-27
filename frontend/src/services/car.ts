import { Api } from "../shared/utils/Api";
import { makeHeaders } from "../shared/utils/makeHeaders";

export async function deleteCar(id: string) {
  const response = await Api.delete(`/car/${id}`, makeHeaders());
  return response.data;
}
