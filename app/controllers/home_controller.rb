# frozen_string_literal: true

class HomeController < AuthenticatedController
  DEFAULT_COMPETITORS = ["https://www.amazon.com"]

  def index
    # @products = ShopifyAPI::Product.find(:all, params: { limit: 10 })
    # @webhooks = ShopifyAPI::Webhook.find(:all)

    @shop = Shop.find_by(shopify_domain: @current_shopify_session.domain)
    @competitors = @shop.competitors.pluck(:origin)
    @competitors = DEFAULT_COMPETITORS if @competitors.empty?
  end
end
