Rails.application.routes.draw do
  root 'appointments#index'
  # post '/' => 'appointments#create' 
  resources :appointments

 
end
