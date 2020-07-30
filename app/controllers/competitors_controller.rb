# frozen_string_literal: true

class CompetitorsController < AuthenticatedController
  before_action do
    @shop = Shop.find_by(shopify_domain: @current_shopify_session.domain)
  end

  def show
    render :json => @shop.competitors
  end

  def create
    @shop.competitors << Competitor.new(origin: params[:origin])
    render :json => @shop.save
  end

  def destroy
    if (c = @shop.competitors.find_by(origin: params[:origin]))
      render :json => c.destroy
    else
      render :json => { :error => "not found" }
    end
  end
end
