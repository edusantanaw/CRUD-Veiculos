import { Router } from "express";
import { adapter } from "../adapter/express-adapter";
import { makeCreateCarController } from "../factory/controller/createCar";
import { makeDeleteCarController } from "../factory/controller/deleteCar";
import { makeLoadAllCarsController } from "../factory/controller/loadAllCars";
import { makeLoadCarByIdController } from "../factory/controller/loadCarById";
import { makeUpdateCarController } from "../factory/controller/updateCar";
import { verifyAuth } from "../middlewares/verifyAuth";

export default (router: Router) => {
  router.post("/car", verifyAuth, adapter(makeCreateCarController()));
  router.put("/car", verifyAuth, adapter(makeUpdateCarController()));
  router.get("/car", verifyAuth, adapter(makeLoadAllCarsController()));
  router.get("/car/:id", verifyAuth, adapter(makeLoadCarByIdController()));
  router.delete("/car/:id", verifyAuth, adapter(makeDeleteCarController()));
};
