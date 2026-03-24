#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  # Installs the version from .nvmrc if needed, then switches to it (first run may download).
  nvm install
else
  echo "nvm not found at \$NVM_DIR ($NVM_DIR). Install Node 18+ from https://nodejs.org/ or install nvm."
fi
major=$(node -p "parseInt(process.versions.node,10)" 2>/dev/null || echo 0)
if (( major < 18 )); then
  echo "Node.js 18+ is required for Vite 6 (you have $(node -v 2>/dev/null || echo unknown))."
  echo "From this folder with nvm: nvm install"
  exit 1
fi
exec npm run dev
