terraform {
  backend "s3" {
    bucket       = "terraform-state-azis"
    key          = "azis/terraform.tfstate"
    region       = "us-east-2"
    encrypt      = true
    use_lockfile = true
  }
}
