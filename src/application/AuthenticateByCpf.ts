import { Client } from "../domain/Client";

export interface AuthenticateByCpfDto {
  cpf: string;
}
export interface ClientRepository {
  authorizeByCpf(cpf: string): Promise<boolean>;
}
export interface JwtService {
  sign(payload: Client): string;
}

export class AuthenticateByCpf {
  constructor(private repo: ClientRepository, private jwt: JwtService) {}

  async execute(dto: AuthenticateByCpfDto) {
    const client = new Client(dto.cpf);
    const isClientAuthorized = await this.repo.authorizeByCpf(client.cpf);
    if (!isClientAuthorized) throw new Error("Ocorreu um erro ao autenticar o cliente");
    return { token: this.jwt.sign(client) };
  }
}
