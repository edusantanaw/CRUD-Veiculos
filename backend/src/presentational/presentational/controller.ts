import { httpResponse } from "../helpers/http-response";

export interface IController {
  handle: (data: any) => Promise<httpResponse>;
}
