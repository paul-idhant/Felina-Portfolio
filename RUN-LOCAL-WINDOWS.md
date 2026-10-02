# Run Felina's Portfolio on Windows

## Fastest option

1. Extract the ZIP completely (do not run it while it is still compressed).
2. Open the extracted `felina-portfolio` folder.
3. Double-click **`START-LOCAL-WINDOWS.bat`**.
4. When the command window says Vite is ready, open the address it prints, normally `http://localhost:5173`.

The launcher uses `npm ci --include=dev`, so it installs Tailwind CSS and the other build-time dependencies needed by Vite.

## Run it manually in Command Prompt

Open Command Prompt in the extracted `felina-portfolio` folder, then run:

```cmd
npm ci --include=dev
npm run dev
```

## If you see “Cannot find module 'tailwindcss'”

This means the project's development dependencies were not installed completely. Stop Vite with `Ctrl+C`, then run this exact recovery sequence in Command Prompt:

```cmd
cd /d "C:\Users\Family\Downloads\felina port\felina-portfolio"
rmdir /s /q node_modules
npm ci --include=dev
npm run dev
```

## Requirements

- Node.js **20.19 or newer** (Node.js 22 LTS is recommended)
- Internet access for the first `npm ci` installation

Check your installed version with:

```cmd
node --version
npm --version
```
