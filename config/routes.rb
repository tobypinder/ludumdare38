Rails.application.routes.draw do
  get 'ld38/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'ld38#index'
end
