server 'merck-react.staging.devguru.co', user: 'deploy', roles: %w[app db web]
set :branch, 'release'
set :capose_commands, -> {
  [
    'build',
    'up -d web'
  ]
}
