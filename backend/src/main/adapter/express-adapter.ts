import { IController } from "../../presentational/presentational/controller";
import { Request, Response } from "express";

export const adapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await controller.handle({
        ...req.body,
        ...req.params,
        ...req.query,
      });
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      return res.status(500).json("Internal server error!");
    }
  };
};
