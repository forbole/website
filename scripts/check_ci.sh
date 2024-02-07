#!/usr/bin/env bash

set -e

yarn lint
yarn type-check
yarn test

QUICK_BUILD=true yarn build
