#!/bin/bash
# Starts http-server, runs command, ensures cleanup on exit

PORT=8081
SERVER_PID=""

cleanup() {
    if [ -n "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
        echo "Stopping http-server (PID: $SERVER_PID)..."
        kill "$SERVER_PID" 2>/dev/null
        wait "$SERVER_PID" 2>/dev/null
    fi
    # Safety net: kill any orphaned process on the port
    fuser -k "$PORT/tcp" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

# Kill any existing server on the port first
fuser -k "$PORT/tcp" 2>/dev/null || true
sleep 1

# Start http-server in background
http-server . -p "$PORT" -c-1 &
SERVER_PID=$!
echo "Started http-server on port $PORT (PID: $SERVER_PID)"

sleep 2

# Run the provided command
"$@"
EXIT_CODE=$?

exit $EXIT_CODE
