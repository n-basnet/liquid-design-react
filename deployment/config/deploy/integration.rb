server 'merck-react.staging.devguru.co', user: 'deploy', roles: %w[app db web]
set :branch, ENV["REVISION"] || "master"
set :deploy_to, "/home/deploy/apps/#{fetch(:application)}/integration"
set :capose_project, -> { "#{fetch(:application)}#{ENV["PULL_REQUEST_NUMBER"]}" }
set :default_env, {
  "PULL_REQUEST_NUMBER" => ENV["PULL_REQUEST_NUMBER"]
}
set :capose_commands, -> {
  [
    'build',
    'up -d web'
  ]
}
