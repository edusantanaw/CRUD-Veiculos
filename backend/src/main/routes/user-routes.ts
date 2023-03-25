import { Router } from "express";
import { adapter } from "../adapter/express-adapter";
import { makeAuthController } from "../factory/controller/auth";
import { makeCreateUserController } from "../factory/controller/createUser";
import { makeDeleteUserController } from "../factory/controller/deleteUser";
import { makeLoadUserByIdController } from "../factory/controller/loadUserById";
import { verifyAuth } from "../middlewares/verifyAuth";

export default function (router: Router) {
  router.post("/signin", adapter(makeAuthController()));
  router.post("/signup", adapter(makeCreateUserController()));
  router.get("/user/:id", verifyAuth, adapter(makeLoadUserByIdController()));
  router.delete("/user/:id", verifyAuth, adapter(makeDeleteUserController()));
}
