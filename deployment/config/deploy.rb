lock '3.9.0'

set :application, "merck-react"
set :repo_url, "git@github.com:netguru/Merck-React.git"
set :deploy_to, -> { "/home/deploy/apps/#{fetch(:application)}" }
