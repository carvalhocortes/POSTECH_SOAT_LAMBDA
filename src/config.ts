import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: process.env.AWS_REGION });

export async function getJwtSecret(): Promise<string> {
  const name = process.env.JWT_SECRET_PARAM!;
  const res = await ssm.send(
    new GetParameterCommand({ Name: name, WithDecryption: true })
  );
  return res.Parameter?.Value ?? "";
}

export const userPoolId = process.env.COGNITO_USER_POOL_ID!;
