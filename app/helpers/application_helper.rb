module ApplicationHelper
  SHOP_QUERY = <<-'GRAPHQL'
    {
      shop {
        name,
        primaryDomain {
          id,
          url
        }
      }
    }
  GRAPHQL

  def get_primary_shop_domain
    client = ShopifyAPI::GraphQL.client
    result = client.query(client.parse(SHOP_QUERY))

    URI.parse(result.data.shop.primary_domain.url).host
  end
end
