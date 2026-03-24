#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm use
fi
major=$(node -p "parseInt(process.versions.node,10)" 2>/dev/null || echo 0)
if (( major < 18 )); then
  echo "Node.js 18+ is required for Vite 6 (you have $(node -v 2>/dev/null || echo unknown))."
  echo "With nvm: nvm install && nvm use"
  exit 1
fi
exec npm run dev
