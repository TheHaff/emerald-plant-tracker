# Emerald Plant Tracker - PNPM Workspace Setup

This project has been converted to use pnpm workspaces for better dependency management and faster installations.

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0

## Installation

1. Install pnpm globally (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. Install all dependencies for the workspace:
   ```bash
   pnpm install
   ```

## Available Scripts

### Root Level Commands
- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build all packages
- `pnpm start` - Start the backend server
- `pnpm audit` - Run security audit on all packages
- `pnpm audit-fix` - Fix security vulnerabilities
- `pnpm clean` - Remove node_modules from all packages

### Frontend Commands
- `pnpm --filter emerald-plant-tracker-frontend dev` - Start frontend development server
- `pnpm --filter emerald-plant-tracker-frontend build` - Build frontend
- `pnpm --filter emerald-plant-tracker-frontend preview` - Preview frontend build

### Backend Commands
- `pnpm --filter emerald-plant-tracker-backend dev` - Start backend development server
- `pnpm --filter emerald-plant-tracker-backend start` - Start backend production server

## Workspace Structure

```
emerald-plant-tracker/
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
├── pnpm-workspace.yaml # Workspace configuration
├── .npmrc            # PNPM configuration
└── package.json      # Root package.json
```

## Benefits of PNPM Workspaces

1. **Faster installations** - Shared dependencies between packages
2. **Disk space efficiency** - Single copy of shared dependencies
3. **Better dependency management** - Hoisting and deduplication
4. **Parallel execution** - Run commands across multiple packages
5. **Filtering** - Run commands on specific packages

## Migration Notes

- All `npm` commands have been replaced with `pnpm`
- Package lock files (`package-lock.json`) have been removed in favor of `pnpm-lock.yaml`
- Dependencies are now managed at the workspace level
- Scripts have been updated to use pnpm workspace features

## Docker Integration

The Docker setup remains unchanged and will continue to work with the new pnpm workspace structure. 