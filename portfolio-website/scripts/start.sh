#!/bin/bash
SESSION_NAME="react-app"

# Colors for clarity
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m" # no color

# Check if user wants to attach
if [[ "$1" == "--attach" ]]; then
  if screen -list | grep -q "$SESSION_NAME"; then
    echo -e "${BLUE}🔗 Attaching to screen session '${SESSION_NAME}'...${NC}"
    exec screen -r "$SESSION_NAME"
  else
    echo -e "${RED}❌ No active screen session named '${SESSION_NAME}' found.${NC}"
    echo -e "${YELLOW}💡 Hint:${NC} Start one with: npm start"
    exit 1
  fi
fi

# Check if a session already exists
if screen -list | grep -q "$SESSION_NAME"; then
  echo -e "${YELLOW}⚠️  Screen session '${SESSION_NAME}' already exists.${NC}"
  echo -e "${BLUE}   To attach: npm run start:attach${NC}"
  echo -e "${BLUE}   To restart: npm run restart${NC}"
  exit 0
fi

# Start a new screen session
echo -e "${BLUE}🚀 Launching React app in a new screen session '${SESSION_NAME}'...${NC}"
screen -dmS "$SESSION_NAME" bash -c "npm run react-start"

# Check success
if [[ $? -eq 0 ]]; then
  echo -e "${GREEN}✅ React app started successfully in screen session '${SESSION_NAME}'.${NC}"
  echo -e "${BLUE}   To attach: npm run start:attach${NC}"
  echo -e "${BLUE}   To stop or restart: npm run restart${NC}"
else
  echo -e "${RED}❌ Failed to start React app in screen session.${NC}"
  exit 1
fi