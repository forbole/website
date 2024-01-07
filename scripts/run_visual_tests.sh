#!/usr/bin/env bash

set -e

rm -rf test-results

if [ "$1" == "--record" ]; then
  rm -rf e2e/visual-comparisons.spec.ts-snapshots

  ./node_modules/.bin/playwright test e2e/visual-comparisons.spec.ts
else

  ./node_modules/.bin/playwright test e2e/visual-comparisons.spec.ts --retries 2
fi
