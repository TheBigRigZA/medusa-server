# Medusa Admin Deployment

This directory contains the configuration for deploying the Medusa admin dashboard separately.

## Setup Instructions

1. Build the admin interface locally
2. Create a new GitHub repository for the admin
3. Deploy to DigitalOcean App Platform as a static site

## Environment Variables

The admin needs to know where your API server is:
- `MEDUSA_BACKEND_URL`: https://medusa-server-rnupj.ondigitalocean.app

## Build Command
```bash
cd .. && yarn install && NODE_OPTIONS="--max-old-space-size=2048" npx medusa build
```

## Output Directory
`.medusa/admin`