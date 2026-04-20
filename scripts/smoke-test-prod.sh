#!/usr/bin/env bash
# ============================================================================
# Smoke test for the production Docker container.
# Run AFTER `docker compose --profile production up -d` to verify the prod
# build is healthy. Exits 0 on success, non-zero with a clear message on
# failure.
#
# Usage:
#   ./scripts/smoke-test-prod.sh                    # default: http://localhost:8080
#   BASE_URL=http://example.com ./scripts/smoke-test-prod.sh
# ============================================================================
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8080}"
PASS=0
FAIL=0

pass() { echo "  ✓ $1"; PASS=$((PASS+1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }

echo "Smoke-testing prod container at $BASE_URL ..."

# Test 1: root returns 200
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
if [ "$code" = "200" ]; then
  pass "root responds 200"
else
  fail "root responds $code (expected 200)"
fi

# Test 2: SPA deep link falls back to index.html
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/player/matches")
if [ "$code" = "200" ]; then
  pass "SPA deep link /player/matches responds 200"
else
  fail "SPA deep link /player/matches responds $code"
fi

# Test 3: response is Angular SPA (has <app-root>)
body=$(curl -s "$BASE_URL/")
if echo "$body" | grep -q "<app-root>"; then
  pass "root HTML contains <app-root>"
else
  fail "root HTML missing <app-root> — build output wrong?"
fi

# Test 4: hashed JS asset loads (pick the first one referenced in index.html)
js_asset=$(echo "$body" | grep -oE 'main\.[a-z0-9]+\.js' | head -1 || true)
if [ -n "$js_asset" ]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$js_asset")
  if [ "$code" = "200" ]; then
    pass "main JS bundle ($js_asset) responds 200"
  else
    fail "main JS bundle ($js_asset) responds $code"
  fi
else
  fail "could not extract hashed main.js filename from index.html"
fi

# Test 5: static cache headers are set on hashed assets
if [ -n "$js_asset" ]; then
  cache_header=$(curl -sI "$BASE_URL/$js_asset" | grep -i "cache-control:" | tr -d '\r' || true)
  if echo "$cache_header" | grep -qi "immutable"; then
    pass "hashed asset has 'immutable' cache-control"
  else
    fail "hashed asset missing 'immutable' cache-control — got: $cache_header"
  fi
fi

# Test 6: index.html is NOT cached (so new deploys land immediately)
cache_header=$(curl -sI "$BASE_URL/" | grep -i "cache-control:" | tr -d '\r' || true)
if echo "$cache_header" | grep -qi "no-cache\|no-store"; then
  pass "index.html has no-cache headers"
else
  fail "index.html is cached — got: $cache_header"
fi

echo
echo "Result: $PASS passed, $FAIL failed"
exit $FAIL
