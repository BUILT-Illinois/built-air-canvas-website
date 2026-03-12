module "web_app_s3" {
  source = "./modules/web_app_s3"

  cloudfront_arn = module.web_app_cloudfront.cloudfront_arn
}

module "web_app_cloudfront" {
  source = "./modules/cloudfront"

  web_bucket_region_domain_name = module.web_app_s3.web_bucket_region_domain_name
  web_bucket_name               = module.web_app_s3.web_bucket_name
}