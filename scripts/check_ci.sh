#!/usr/bin/env bash

set -e

yarn lint
yarn type-check

QUICK_BUILD=true yarn build
