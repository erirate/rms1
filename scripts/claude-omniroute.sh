#!/usr/bin/env bash
# Launch Claude Code routed through a local OmniRoute gateway (opt-in).
# Model auto/thrifty: subscription quota first (ChatGPT/Codex, Google/Antigravity),
# then keyless and free providers, falling through as each quota runs out.
# Extra args pass through to claude, e.g. ./scripts/claude-omniroute.sh -p "hi"
set -euo pipefail

PORT="${OMNIROUTE_PORT:-20128}"
MODEL="${OMNIROUTE_MODEL:-auto/thrifty}"

if ! curl -s -o /dev/null --max-time 3 "http://127.0.0.1:${PORT}/"; then
  echo "OmniRoute is not running on port ${PORT}. Start it with:" >&2
  echo "  OMNIROUTE_SERVER_HOST=127.0.0.1 omniroute serve --daemon --no-open" >&2
  exit 1
fi

exec omniroute launch --port "$PORT" -- --model "$MODEL" "$@"
