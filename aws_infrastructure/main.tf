
terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "eoh_bucket" {
    bucket = "eoh.built-illinois.org"
}

resource "aws_cloudfront_origin_access_control" "eoh_oac" {
    name = "eoh_oac"
    origin_access_control_origin_type = "s3"
    signing_behavior = "always"
    signing_protocol = "sigv4"
}

resource "aws_cloudfront_distribution" "eoh_distribution" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.eoh_bucket.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.eoh_oac.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
}

resource "aws_s3_bucket_policy" "eoh_policy" {
    bucket = aws_s3_bucket.eoh_bucket.id
    policy = data.aws_iam_policy_document.eoh_policy_document.json
}

data "aws_iam_policy_document" "eoh_policy_document" {
    statement {
      actions = ["s3:GetObject"]
      resources = ["${aws_s3_bucket.eoh_bucket.arn}/*"]

      principals {
        type = "Service"
        identifiers = ["cloudfront.amazonaws.com"]
      }

      condition {
        test = "StringEquals"
        variable = "AWS:SourceArn"
        values = [aws_cloudfront_distribution.eoh_distribution.arn]
      }
    }
}