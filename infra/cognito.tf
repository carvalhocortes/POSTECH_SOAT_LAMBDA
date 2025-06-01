resource "aws_cognito_user_pool" "this" {
  name = "cpf-auth-pool"
}

resource "aws_cognito_user_pool_client" "this" {
  name               = "cpf-auth-client"
  user_pool_id       = aws_cognito_user_pool.this.id
  generate_secret    = false
  explicit_auth_flows = [
    "ALLOW_ADMIN_USER_PASSWORD_AUTH",
    "ALLOW_USER_PASSWORD_AUTH"
  ]
}