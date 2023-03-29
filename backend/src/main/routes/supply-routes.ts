import { Router } from "express";
import { adapter } from "../adapter/express-adapter";
import { makeCreateSupplyController } from "../factory/controller/createSupply";
import { makeDeleteSupplyController } from "../factory/controller/deleteSupply";
import { makeLoadAllSupplyController } from "../factory/controller/loadAllSupply";
import { makeLoadSupplyByIdController } from "../factory/controller/loadSupplyById";
import { makeUpdateSupplyController } from "../factory/controller/updateSupply";
import { verifyAuth } from "../middlewares/verifyAuth";

export default (router: Router) => {
  router.post("/supply", verifyAuth, adapter(makeCreateSupplyController()));
  router.get("/supply", verifyAuth, adapter(makeLoadAllSupplyController()));
  router.get(
    "/supply/:id",
    verifyAuth,
    adapter(makeLoadSupplyByIdController())
  );
  router.delete(
    "/supply/:id",
    verifyAuth,
    adapter(makeDeleteSupplyController())
  );
  router.put("/supply/:id", adapter(makeUpdateSupplyController()));
};
