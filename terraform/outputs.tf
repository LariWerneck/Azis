output "instance_id" {
  description = "ID da instância EC2"
  value       = aws_instance.app_server.id
}

output "public_ip" {
  description = "IP público da instância"
  value       = aws_eip.app_eip.public_ip
}

output "ecr_repository_url" {
  description = "URL do repositório ECR"
  value       = aws_ecr_repository.app.repository_url
}

output "github_actions_role_arn" {
  description = "ARN da role para o GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}
