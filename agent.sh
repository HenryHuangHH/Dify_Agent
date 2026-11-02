#!/bin/bash
# Raw curl example of the Dify chat-messages call. Requires DIFY_API_KEY in the environment.

if [ -z "$DIFY_API_KEY" ]; then
  echo 'Missing DIFY_API_KEY environment variable.' >&2
  exit 1
fi

curl -X POST 'https://api.dify.ai/v1/chat-messages' \
  --header "Authorization: Bearer $DIFY_API_KEY" \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "inputs": {},
    "query": "summarize this: hello i am bob",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123"
  }'
