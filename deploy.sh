#!/bin/bash

docker build --platform=linux/amd64 --tag registry.digitalocean.com/magicbackend/magicbackend-ui-amd:3 .

docker push registry.digitalocean.com/magicbackend/magicbackend-ui-amd:3

kubectl set image deployments/magicbackend-ui magicbackend-ui-amd=registry.digitalocean.com/magicbackend/magicbackend-ui-amd:3
