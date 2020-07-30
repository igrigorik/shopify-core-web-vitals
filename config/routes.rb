Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'

  get    '/competitors', to: 'competitors#show'
  post   '/competitors', to: 'competitors#create'
  delete '/competitors', to: 'competitors#destroy'
end
