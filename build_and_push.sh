#!/bin/bash

docker build --pull -t msb-infocenter . --platform="linux/amd64" &&
docker tag msb-infocenter falkkuehnel/msb-infocenter:latest &&
docker push falkkuehnel/msb-infocenter:latest
