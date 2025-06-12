# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Medusa.js v2.8.4 e-commerce backend server with custom Mediabox branding. The project uses a unique architecture where:
- The API server runs separately without the admin panel
- The admin panel is built and deployed as a static site at `/app`
- Customizations are applied via a patch script after building

## Essential Commands

### Development
```bash
# Start development server (port 9000)
yarn dev

# Run database migrations
yarn medusa migrations run

# Seed database with sample data
yarn seed

# Build for production (includes admin patching)
yarn build

# Start production server
yarn start
```

### Testing
```bash
# Run unit tests
yarn test:unit

# Run HTTP integration tests
yarn test:integration:http

# Run module integration tests
yarn test:integration:modules

# Run a specific test file
NODE_OPTIONS=--experimental-vm-modules jest path/to/test.spec.ts
```

### Admin Customization
```bash
# Test admin customizations locally
npx medusa build && node patch-admin.js

# Clear Vite cache after customization changes
rm -rf node_modules/@medusajs/admin-bundler/node_modules/.vite
```

## Architecture & Key Patterns

### Module Structure
The codebase follows Medusa's modular architecture:
- `src/api/` - Custom API routes extending Medusa's base endpoints
- `src/modules/` - Custom business logic modules
- `src/workflows/` - Reusable business workflows
- `src/subscribers/` - Event listeners for Medusa events
- `src/jobs/` - Background job definitions
- `src/links/` - Module linking configurations

### Admin Panel Customization
**Important**: The admin panel is NOT built in this repository!
- Admin is disabled here (`admin.disable: true`)
- Admin is built and deployed from separate repo: `TheBigRigZA/medusa-admin`
- The `patch-admin.js` script exists here but CANNOT run without admin files
- Customizations must be applied in the admin repository during its build process

The patch script approach:
1. Should run in the admin repository
2. Modifies compiled chunk files to apply Mediabox branding
3. Replaces logos, text, and removes unwanted menu items
4. Uses helper functions to find and modify specific chunks

### Configuration
- **Database**: PostgreSQL via Supabase (connection string in `DATABASE_URL`)
- **Cache**: Redis (optional, via `REDIS_URL`)
- **Admin**: Disabled in main config (`admin.disable: true`)
- **CORS**: Configured for production domains
- **Environment**: All secrets via environment variables

### Testing Strategy
Tests are organized by type:
- **Unit tests**: `src/**/__tests__/**/*.unit.spec.ts`
- **HTTP integration**: `integration-tests/http/*.spec.ts`
- **Module integration**: `src/modules/*/__tests__/**/*.ts`

Test setup uses `integration-tests/setup.js` for initialization.

## Deployment Architecture

The project deploys to Digital Ocean App Platform as two separate components:
1. **API Server** (this repo): Runs at https://shop.mediabox.co
2. **Admin Static Site**: Built from this repo, served at https://shop.mediabox.co/app

Build process for admin deployment:
```bash
cd .. && yarn install && NODE_OPTIONS='--max-old-space-size=2048' npx medusa build && node patch-admin.js && mkdir -p admin-deployment/dist && cp -r .medusa/admin/* admin-deployment/dist/
```

## Important Notes

- Always clear Vite cache after modifying admin customizations
- The baseline working commit is `43de6b02f5a13e37b5d1b1adfde31d007dca847b`
- Node.js version must be >= 20
- Admin panel customizations are based on Igor Khomenko's patch methodology
- Environment variables are loaded from `.env` file (see `.env.template`)