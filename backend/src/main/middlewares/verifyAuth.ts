import { Request, Response, NextFunction } from "express";
import { JwtToken } from "../../utils/jwtToken";

function getToken(req: Request) {
  const authorization = req.headers.authorization;
  if (!authorization) throw "Missing token!";
  const [, token] = authorization.split(" ");
  return token;
}
const jwtToken = new JwtToken();

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json("Unauthorized!");
    jwtToken.verify(token);
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
}
