resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = var.identity_pool_name
  allow_unauthenticated_identities = true
}

# IAM role assumed by unauthenticated (public) browser clients
resource "aws_iam_role" "unauthenticated" {
  name = "${var.identity_pool_name}-unauth-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Federated = "cognito-identity.amazonaws.com" }
      Action    = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "cognito-identity.amazonaws.com:aud" = aws_cognito_identity_pool.main.id
        }
        "ForAnyValue:StringLike" = {
          "cognito-identity.amazonaws.com:amr" = "unauthenticated"
        }
      }
    }]
  })
}

resource "aws_iam_role_policy" "unauthenticated_iot" {
  name = "${var.identity_pool_name}-unauth-iot-policy"
  role = aws_iam_role.unauthenticated.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "iot:Connect",
        "iot:Subscribe",
        "iot:Receive",
        "iot:Publish",
        "iot:AttachPolicy",
      ]
      Resource = "*"
    }]
  })
}

# AWS IoT Core uses dual authorization for Cognito connections:
# the IAM role policy alone is not enough — IoT Core also requires its own
# IoT policy attached to the Cognito identity ID. IAM role ARNs are not valid
# AttachPolicy targets, so the app attaches this policy to each identity ID
# at runtime (idempotent). The IAM role needs iot:AttachPolicy to do that.
resource "aws_iot_policy" "unauthenticated" {
  name = "${var.identity_pool_name}-unauth-iot-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["iot:Connect", "iot:Subscribe", "iot:Receive", "iot:Publish"]
      Resource = "*"
    }]
  })
}

resource "aws_cognito_identity_pool_roles_attachment" "main" {
  identity_pool_id = aws_cognito_identity_pool.main.id

  roles = {
    unauthenticated = aws_iam_role.unauthenticated.arn
  }
}
