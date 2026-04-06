output "identity_pool_id" {
  description = "Cognito Identity Pool ID — set as REACT_APP_COGNITO_IDENTITY_POOL_ID in the web app"
  value       = aws_cognito_identity_pool.main.id
}

output "iot_policy_name" {
  description = "IoT Core policy name — set as REACT_APP_AWS_IOT_POLICY_NAME in the web app"
  value       = aws_iot_policy.unauthenticated.name
}
