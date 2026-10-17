#!/bin/bash
cd /Users/krupapatel/Documents/GitHub/take-home
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
echo "Starting Alto on http://127.0.0.1:43127 ..."
exec /usr/local/bin/node ./node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 43127
