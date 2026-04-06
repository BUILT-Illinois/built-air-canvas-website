output "cognito_identity_pool_id" {
  description = "Set as REACT_APP_COGNITO_IDENTITY_POOL_ID in the web app .env"
  value       = module.cognito.identity_pool_id
}

output "iot_policy_name" {
  description = "Set as REACT_APP_AWS_IOT_POLICY_NAME in the web app .env"
  value       = module.cognito.iot_policy_name
}
