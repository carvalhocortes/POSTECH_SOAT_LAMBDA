variable "region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-west-2"
}

variable "jwt_secret_name" {
  description = "SSM Parameter Store name for JWT secret"
  type        = string
  default     = "/cpf-auth/jwt-secret"
}

variable "labRole" {
  type    = string
  default = "arn:aws:iam::734524367597:role/LabRole"
}