#!/usr/bin/env bash
# QA smoke test for the Task API (Day 23).
# Usage: ./qa-smoke-test.sh [BASE_URL]
# Adjust BASE and the JSON fields below to match your Task entity.

BASE="${1:-http://localhost:8080/api/tasks}"
PASS=0
FAIL=0

# check <name> <expected_status> <actual_status>
check() {
  if [ "$2" = "$3" ]; then
    echo "PASS  $1 (HTTP $3)"; PASS=$((PASS+1))
  else
    echo "FAIL  $1 (expected $2, got $3)"; FAIL=$((FAIL+1))
  fi
}

# req <method> <url> [json-body]  -> sets $STATUS and $BODY
req() {
  local method="$1" url="$2" data="$3" out
  if [ -n "$data" ]; then
    out=$(curl -s -w '\n%{http_code}' -X "$method" "$url" \
      -H 'Content-Type: application/json' -d "$data")
  else
    out=$(curl -s -w '\n%{http_code}' -X "$method" "$url")
  fi
  STATUS=$(echo "$out" | tail -n1)
  BODY=$(echo "$out" | sed '$d')
}

echo "Testing $BASE"
echo "-----------------------------"

# 1. Create
req POST "$BASE" '{"title":"QA task","description":"created by smoke test","status":"TODO"}'
check "POST create task" 201 "$STATUS"
ID=$(echo "$BODY" | grep -o '"id":[ ]*[0-9]*' | head -1 | grep -o '[0-9]*$')
echo "      created id=$ID"

# 2. Read all / read one
req GET "$BASE";          check "GET all tasks" 200 "$STATUS"
req GET "$BASE/$ID";      check "GET task by id" 200 "$STATUS"

# 3. Update
req PUT "$BASE/$ID" '{"title":"QA task updated","description":"edited","status":"DONE"}'
check "PUT update task" 200 "$STATUS"

# 4. Error cases
req GET "$BASE/999999";   check "GET missing id returns 404" 404 "$STATUS"
req PUT "$BASE/999999" '{"title":"x","description":"x","status":"TODO"}'
check "PUT missing id returns 404" 404 "$STATUS"
req POST "$BASE" '{"title":""}'
check "POST invalid body returns 400" 400 "$STATUS"
req POST "$BASE" 'not-json'
check "POST malformed JSON returns 400" 400 "$STATUS"

# 5. Delete, then confirm it is gone
req DELETE "$BASE/$ID";   check "DELETE task" 204 "$STATUS"
req GET "$BASE/$ID";      check "GET deleted task returns 404" 404 "$STATUS"

echo "-----------------------------"
echo "Passed: $PASS  Failed: $FAIL"
[ "$FAIL" -eq 0 ]
