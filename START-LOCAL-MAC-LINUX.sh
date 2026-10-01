#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo ""
echo "=== Felina Portfolio Local Launcher ==="
echo "Installing dependencies..."
npm install

echo ""
echo "Starting local Vite dev server..."
echo "Opening http://localhost:5173 ..."
npm run dev
