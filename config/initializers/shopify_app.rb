ShopifyApp.configure do |config|
  config.application_name = "Web Vitals Dashboard"
  config.api_key = ENV['SHOPIFY_API_KEY']
  config.secret = ENV['SHOPIFY_API_SECRET']
  config.old_secret = ""
  # In theory, we don't need any scopes at all for this app, but Shopify complains on empty list..
  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.scope = "read_content, read_products"
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = "2020-07"
  config.shop_session_repository = 'Shop'
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
