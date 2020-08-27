# frozen_string_literal: true

class HomeController < AuthenticatedController
  DEFAULT_COMPETITORS = ["https://www.amazon.com"]

  def index
    # Effectively a noop API call but a necessary one as well to validate
    # that the granted tokens are still valid - e.g. if the store owner
    # uninstalls the app, this is the only way to find out immediately as
    # Shopify will invalidate the granted keys.
    @scopes = ShopifyAPI::AccessScope.find(:all)

    @shop = Shop.find_by(shopify_domain: helpers.get_primary_shop_domain)
    @competitors = @shop.competitors.pluck(:origin)
    @competitors = DEFAULT_COMPETITORS if @competitors.empty?
  end
end
