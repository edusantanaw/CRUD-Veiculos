import { IDeleteUsecase } from "../../domain/usecases/delete";
import { badRequest, error, httpResponse, success } from "../helpers/http-response";
import { IController } from "../presentational/controller";

type data = {
    id: string;
  };
  

export class DeleteController implements IController {
    constructor(private readonly deleteUsecase: IDeleteUsecase) {}
  
    public async handle({ id }: data): Promise<httpResponse> {
      try {
        if (!id) return badRequest("O id é necessario!");
        const data = await this.deleteUsecase.delete(id);
        return success(data);
      } catch (err) {
        return error(err as Error);
      }
    }
  }