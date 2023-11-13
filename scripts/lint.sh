#!/usr/bin/env bash

set -e

npm run lint:eslint

npm run lint:prettier

npx ts-unused-exports tsconfig.json \
  --excludePathsFromReport='.*pages.*$' \
  --excludePathsFromReport='playwright.config'
