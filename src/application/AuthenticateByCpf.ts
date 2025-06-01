import { Client } from "../domain/Client";

export interface AuthenticateByCpfDto {
  cpf: string;
}
export interface ClientRepository {
  findByCpf(cpf: string): Promise<boolean>;
}
export interface JwtService {
  sign(payload: object): string;
}

export class AuthenticateByCpf {
  constructor(private repo: ClientRepository, private jwt: JwtService) {}

  async execute(dto: AuthenticateByCpfDto) {
    const client = new Client(dto.cpf);
    const exists = await this.repo.findByCpf(client.cpf);
    if (!exists) throw new Error("Cliente não encontrado");
    return { token: this.jwt.sign(client) };
  }
}
