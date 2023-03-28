import { data } from "../shared/types/auth";
import { IUser } from "../shared/types/user";
import { Api } from "../shared/utils/Api";

type authResponse = {
  user: IUser;
  token: string;
};

export const authService = async (data: data, url: string) => {
  try {
    const response = await Api.post<authResponse>("/signin", data);
    return response.data;
  } catch (error) {
    const message = error as { response: { data: string } };
    throw message.response.data;
  }
};

