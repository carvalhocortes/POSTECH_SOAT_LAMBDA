import * as jwt from "jsonwebtoken";
import { JwtService } from "../../application/AuthenticateByCpf";
import { Client } from "../../domain/Client";

export class JwtServiceImpl implements JwtService {
  constructor(private secret: string) {}
  sign({ cpf }: Client) {
    return jwt.sign({ cpf }, this.secret, { expiresIn: "15m" });
  }
}
