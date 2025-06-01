variable "region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "sa-west-2"
}

variable "jwt_secret_name" {
  description = "SSM Parameter Store name for JWT secret"
  type        = string
  default     = "/cpf-auth/jwt-secret"
}