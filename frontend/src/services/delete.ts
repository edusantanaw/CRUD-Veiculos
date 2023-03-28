import { Api } from "../shared/utils/Api";
import { makeHeaders } from "../shared/utils/makeHeaders";

export async function deleteService(id: string, url: string) {
  const response = await Api.delete(`/${url}/${id}`, makeHeaders());
  return response.data;
}
