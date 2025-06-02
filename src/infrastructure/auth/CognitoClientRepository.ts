import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { ClientRepository } from "../../application/AuthenticateByCpf";
import { randomUUID } from "node:crypto";

export class CognitoClientRepository implements ClientRepository {
  private client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  });
  private poolId = process.env.COGNITO_USER_POOL_ID!;

  async authorizeByCpf(cpf: string): Promise<boolean> {
    try {
      await this.client.send(
        new AdminGetUserCommand({ UserPoolId: this.poolId, Username: cpf })
      )
      return true
    } catch {
      try {
        await this.client.send(
          new AdminCreateUserCommand({
            UserPoolId: this.poolId,
            Username: cpf,
            TemporaryPassword: randomUUID(),
            MessageAction: "SUPPRESS",
          })
        )
        return true
      } catch (err) {
        console.error("Falha ao criar usuário:", err)
        return false
      }
    }
  }
}
