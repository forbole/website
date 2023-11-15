#!/usr/bin/env bash

set -e

npm run lint:eslint

npm run lint:prettier

npx ts-unused-exports tsconfig.json \
  --excludePathsFromReport='.*pages.*$' \
  --excludePathsFromReport='playwright.config'

npm run i18next

MISSING_TRANSLATIONS="$(git status --porcelain | grep 'public/locales' | wc -l)"

if [ "$MISSING_TRANSLATIONS" -gt 0 ]; then
  echo "Missing translations"
  exit 1
fi

EMPTY_TRANSLATIONS="$(grep -r '""' public/locales | wc -l)"

if [ "$EMPTY_TRANSLATIONS" -gt 0 ]; then
  echo "Empty translations"
  exit 1
fi

echo "Linting passed"
