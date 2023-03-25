import { Router } from "express";
import { adapter } from "../adapter/express-adapter";
import { makeAuthController } from "../factory/controller/auth";
import { makeCreateUserController } from "../factory/controller/createUser";

export default function (router: Router) {
  router.post("signin", adapter(makeAuthController()));
  router.post("signup", adapter(makeCreateUserController()));
}
