import { APIGatewayProxyHandler } from "aws-lambda";
import { AuthenticateByCpf } from "./application/AuthenticateByCpf";
import { CognitoClientRepository } from "./infrastructure/auth/CognitoClientRepository";
import { JwtServiceImpl } from "./infrastructure/auth/JwtServiceImpl";
import { getJwtSecret } from "./config";

let useCase: AuthenticateByCpf;

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { cpf } = JSON.parse(event.body || "{}");
    if (!cpf) throw new Error("CPF é obrigatório");

    if (!useCase) {
      const secret = await getJwtSecret();
      useCase = new AuthenticateByCpf(
        new CognitoClientRepository(),
        new JwtServiceImpl(secret)
      );
    }

    const result = await useCase.execute({ cpf });
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err: any) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
  }
};
