#!/bin/bash
SESSION_NAME="react-app"

# Kill existing screen if running
if screen -list | grep -q "$SESSION_NAME"; then
  echo "🛑 Stopping existing session '$SESSION_NAME'..."
  screen -S "$SESSION_NAME" -X quit
  sleep 1
fi

# Start a new one
echo "🚀 Starting new session '$SESSION_NAME'..."
screen -dmS "$SESSION_NAME" bash -c "npm run react-start"

if [[ $? -eq 0 ]]; then
  echo "✅ Restarted React app successfully in screen session '$SESSION_NAME'."
  echo "   Use 'npm start --attach' to view logs."
else
  echo "❌ Failed to restart React app."
  exit 1
fi