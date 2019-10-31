lock '3.9.0'

set :application, "merck-react"
set :repo_url, "git@gitlab.com:liquid-design/liquid-design-react.git"
set :deploy_to, -> { "/home/deploy/apps/#{fetch(:application)}" }
