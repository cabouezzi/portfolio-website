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

is_port_listening() {
  local port="$1"
 
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    return 0
  fi

  if command -v ss >/dev/null 2>&1 && ss -ltn | awk '{ print $4 }' | grep -Eq "[:.]${port}$"; then
    return 0
  fi

  return 1
}

print_port_status() {
  local label="$1"
  local port="$2"

  if is_port_listening "$port"; then
    echo -e "${GREEN}Listening:${NC} ${label} on port ${port}"
  else
    echo -e "${YELLOW}Not listening:${NC} ${label} on port ${port}"
  fi
}

wait_for_port() {
  local label="$1"
  local port="$2"
  local attempts="${3:-10}"

  for _ in $(seq 1 "$attempts"); do
    if is_port_listening "$port"; then
      return 0
    fi

    sleep 1
  done

  echo -e "${YELLOW}Still waiting:${NC} ${label} has not opened port ${port}. Check logs if its screen remains active."
  return 1
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

CHESS_AI_PACKAGE_DIR="${CHESS_AI_PACKAGE_DIR:-}"
if [[ -z "$CHESS_AI_PACKAGE_DIR" ]]; then
  CHESS_AI_PACKAGE_DIR="$(first_existing_dir \
    "$ROOT_DIR/../../Chess-AI/Chess-AI-Package" \
    "$HOME/Code/Chess-AI/Chess-AI-Package" \
    "$HOME/Developer/Chess-AI/Chess-AI-Package" \
  )"
fi

if [[ -n "${CHESS_AI_PACKAGE_DIR:-}" && -f "$CHESS_AI_PACKAGE_DIR/Package.swift" ]]; then
  start_screen "chess-ws-api" "cd '$CHESS_AI_PACKAGE_DIR' && swift run chaniels-chess-engine serve --hostname 127.0.0.1 --port 8080"
else
  echo -e "${YELLOW}Skipping chess-ws-api:${NC} set CHESS_AI_PACKAGE_DIR to the Chess-AI package repo if this demo should run."
fi

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

echo
echo -e "${BLUE}Waiting for service ports...${NC}"
wait_for_port "React app" 3001 10 || true
wait_for_port "Chess WebSocket API" 8080 30 || true
if has_screen_session "shakespeare-api"; then
  wait_for_port "Shakespeare API" 8000 10 || true
fi

echo
echo -e "${BLUE}Active screen sessions:${NC}"
screen -list
echo
echo -e "${BLUE}Port status:${NC}"
print_port_status "React app" 3001
print_port_status "Chess WebSocket API" 8080
print_port_status "Shakespeare API" 8000
echo
echo "Attach examples:"
echo "  screen -r react-app"
echo "  screen -r chess-ws-api"
echo "  screen -r shakespeare-api"
echo
echo "Logs:"
echo "  $LOG_DIR"
