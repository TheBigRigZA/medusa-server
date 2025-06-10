# Medusa Server

This is the backend API server for our Medusa-powered e-commerce platform.

## Baseline Working Commit

**Commit Hash**: `43de6b02f5a13e37b5d1b1adfde31d007dca847b`  
**Message**: "Disable admin in Medusa config - serve via static site"

To checkout this baseline version:
```bash
git checkout 43de6b02f5a13e37b5d1b1adfde31d007dca847b
```

## Overview

This server provides the core Medusa API functionality with the following key configurations:
- **Database**: Supabase (PostgreSQL)
- **Admin Panel**: Disabled (served separately as static site)
- **Deployment**: Digital Ocean App Platform
- **API URL**: https://shop.mediabox.co

## Prerequisites

- Node.js >= 20
- PostgreSQL database (we use Supabase)
- Redis instance (optional but recommended)

## Environment Variables

Create a `.env` file based on `.env.template`:

```bash
# Database
DATABASE_URL=your_supabase_connection_string

# Redis (optional)
REDIS_URL=your_redis_url

# CORS Configuration
STORE_CORS=https://your-storefront-domain.com
ADMIN_CORS=https://shop.mediabox.co
AUTH_CORS=https://shop.mediabox.co

# Security
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret

# Backend URL
MEDUSA_BACKEND_URL=https://shop.mediabox.co
```

## Installation

```bash
# Install dependencies
yarn install

# Run database migrations
yarn medusa migrations run

# Seed the database (optional)
yarn seed
```

## Development

```bash
# Start development server
yarn dev
```

The server will run on http://localhost:9000

## Production Build

```bash
# Build for production
yarn build

# Start production server
yarn start
```

## Key Configuration

The server configuration is in `medusa-config.ts`:
- Admin panel is disabled (`admin.disable: true`)
- CORS settings are configured for production domains
- Database connection uses Supabase

## API Documentation

The Medusa API follows RESTful conventions. Key endpoints include:
- `/store/*` - Storefront API
- `/admin/*` - Admin API (requires authentication)
- `/auth/*` - Authentication endpoints

Full API documentation: https://docs.medusajs.com/api/store

## Deployment

This server is deployed to Digital Ocean App Platform. The deployment is configured to:
1. Build the server
2. Run migrations automatically
3. Start the production server

## Project Structure

```
medusa-server/
├── src/
│   ├── api/          # Custom API routes
│   ├── jobs/         # Background jobs
│   ├── links/        # Module links
│   ├── modules/      # Custom modules
│   ├── scripts/      # Utility scripts
│   ├── subscribers/  # Event subscribers
│   └── workflows/    # Custom workflows
├── medusa-config.ts  # Main configuration
├── package.json      # Dependencies
└── README.md         # This file
```

## Troubleshooting

### Database Connection Issues
- Ensure your Supabase connection string is correct
- Check if SSL is required (add `?sslmode=require` to connection string)

### CORS Errors
- Verify CORS environment variables match your frontend domains
- Ensure trailing slashes are consistent

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && yarn install`
- Check Node.js version (must be >= 20)

## Related Repositories

- **Admin Panel**: Served separately as a static site at https://shop.mediabox.co/app
- See `admin-deployment/README.md` for admin customization details

## Support

For Medusa-specific issues, refer to:
- [Medusa Documentation](https://docs.medusajs.com)
- [Medusa GitHub](https://github.com/medusajs/medusa)
- [Medusa Discord](https://discord.gg/medusajs)
