#!/bin/bash

# https://gist.github.com/Taytay/4b463d3e7ebf9915107251b3abad7073

HUB_DIST=linux-amd64
HUB_VERSION=`curl -w "%{url_effective}\n" -I -L -s -S github.com/github/hub/releases/latest -o /dev/null | awk -F'releases/tag/v' '{ print $2 }'`
curl "https://github.com/github/hub/releases/download/v$HUB_VERSION/hub-$HUB_DIST-$HUB_VERSION.tgz" -L | tar xvz
sudo ./hub-$HUB_DIST-$HUB_VERSION/install
rm -r ./hub-$HUB_DIST-$HUB_VERSION
