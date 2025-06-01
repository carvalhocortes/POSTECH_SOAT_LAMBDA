import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { ClientRepository } from "../../application/AuthenticateByCpf";

export class CognitoClientRepository implements ClientRepository {
  private client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  });
  private poolId = process.env.COGNITO_USER_POOL_ID!;

  async findByCpf(cpf: string): Promise<boolean> {
    try {
      await this.client.send(
        new AdminGetUserCommand({ UserPoolId: this.poolId, Username: cpf })
      );
      return true;
    } catch {
      return false;
    }
  }
}
