resource "aws_ssm_parameter" "jwt_secret" {
  name        = var.jwt_secret_name
  type        = "SecureString"
  value       = "PLACEHOLDER"  # Trocar para o valor real do JWT secret
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-auth-cpf-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "lambda.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda-auth-cpf-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "ssm:GetParameter",
          "ssm:GetParameters"
        ],
        Resource = aws_ssm_parameter.jwt_secret.arn
      },
      {
        Effect   = "Allow",
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_lambda_function" "auth_by_cpf" {
  function_name    = "auth-by-cpf"
  filename         = "${path.module}/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda.zip")
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  role             = aws_iam_role.lambda_role.arn
  timeout          = 10

  environment {
    variables = {
      COGNITO_USER_POOL_ID = aws_cognito_user_pool.this.id
      JWT_SECRET_PARAM     = var.jwt_secret_name
    }
  }
}
