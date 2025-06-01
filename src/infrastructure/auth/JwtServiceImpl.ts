import jwt from "jsonwebtoken";
import { JwtService } from "../../application/AuthenticateByCpf";

export class JwtServiceImpl implements JwtService {
  constructor(private secret: string) {}
  sign(payload: object) {
    return jwt.sign(payload, this.secret, { expiresIn: "15m" });
  }
}
