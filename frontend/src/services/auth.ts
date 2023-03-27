import { data } from "../shared/types/auth";
import { IUser } from "../shared/types/user";
import { Api } from "../shared/utils/Api";

type authResponse = {
  user: IUser;
  token: string;
};

export const signinService = async (data: data) => {
  try {
    const response = await Api.post<authResponse>("/signin", data);
    return response.data;
  } catch (error) {
    const message = error as { response: { data: string } };
    throw message.response.data;
  }
};

export const signupService = async (data: data) => {
  try {
    const response = await Api.post<authResponse>("/signup", data);
    return response.data;
  } catch (error) {
    const message = error as { response: { data: string } };
    throw message.response.data;
  }
};
