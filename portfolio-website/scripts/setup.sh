#!/bin/bash
set -u

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/logs/setup"

GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m"

has_screen_session() {
  screen -list | awk -v session="$1" '$1 ~ "\\." session "$" { found = 1 } END { exit found ? 0 : 1 }'
}

start_screen() {
  local session_name="$1"
  local command="$2"
  local log_file="$LOG_DIR/${session_name}.log"

  if has_screen_session "$session_name"; then
    echo -e "${YELLOW}Already running:${NC} ${session_name}"
    return 0
  fi

  echo -e "${BLUE}Starting:${NC} ${session_name}"
  mkdir -p "$LOG_DIR"
  : > "$log_file"
  screen -dmS "$session_name" bash -lc "$command >> '$log_file' 2>&1"

  if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}Started:${NC} ${session_name}"
  else
    echo -e "${RED}Failed:${NC} ${session_name}"
    return 1
  fi
}

first_existing_dir() {
  for dir in "$@"; do
    if [[ -d "$dir" ]]; then
      echo "$dir"
      return 0
    fi
  done

  return 1
}

echo -e "${BLUE}Setting up portfolio website services...${NC}"

start_screen "react-app" "cd '$ROOT_DIR' && npm run react-start"

GPTSCRATCH_DIR="${GPTSCRATCH_DIR:-}"
if [[ -z "$GPTSCRATCH_DIR" ]]; then
  GPTSCRATCH_DIR="$(first_existing_dir \
    "$ROOT_DIR/../../gptscratch" \
    "$HOME/Code/gptscratch" \
    "$HOME/Developer/gptscratch" \
  )"
fi

if [[ -n "${GPTSCRATCH_DIR:-}" && -f "$GPTSCRATCH_DIR/server.py" ]]; then
  GPTSCRATCH_PYTHON="${GPTSCRATCH_PYTHON:-python3}"

  if [[ ! -f "$GPTSCRATCH_DIR/checkpoint.pt" ]]; then
    echo -e "${YELLOW}Skipping shakespeare-api:${NC} missing $GPTSCRATCH_DIR/checkpoint.pt."
  elif ! "$GPTSCRATCH_PYTHON" -c "import uvicorn" >/dev/null 2>&1; then
    echo -e "${YELLOW}Skipping shakespeare-api:${NC} $GPTSCRATCH_PYTHON cannot import uvicorn."
  else
    start_screen "shakespeare-api" "cd '$GPTSCRATCH_DIR' && '$GPTSCRATCH_PYTHON' -m uvicorn server:app --host 127.0.0.1 --port 8000"
  fi
else
  echo -e "${YELLOW}Skipping shakespeare-api:${NC} set GPTSCRATCH_DIR to the gptscratch repo if this demo should run."
fi

if [[ -n "${CHESS_SERVER_CMD:-}" ]]; then
  start_screen "chess-ws-api" "$CHESS_SERVER_CMD"
else
  echo -e "${YELLOW}Skipping chess-ws-api:${NC} set CHESS_SERVER_CMD to the legacy Chess AI WebSocket server command if needed."
fi

echo
echo -e "${BLUE}Active screen sessions:${NC}"
screen -list
echo
echo "Attach examples:"
echo "  screen -r react-app"
echo "  screen -r shakespeare-api"
echo
echo "Logs:"
echo "  $LOG_DIR"
