resource "aws_ssm_parameter" "jwt_secret" {
  name        = var.jwt_secret_name
  type        = "SecureString"
  value       = "PLACEHOLDER"  # Trocar para o valor real do JWT secret
}

resource "aws_lambda_function" "auth_by_cpf" {
  function_name    = "auth-by-cpf"
  filename         = "./lambda.zip"
  source_code_hash = filebase64sha256("./lambda.zip")
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  role             = var.labRole
  timeout          = 10

  environment {
    variables = {
      COGNITO_USER_POOL_ID = aws_cognito_user_pool.this.id
      JWT_SECRET_PARAM     = var.jwt_secret_name
    }
  }
}
