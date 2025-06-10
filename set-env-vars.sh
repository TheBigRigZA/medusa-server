#!/bin/bash

# Load environment variables from deployment-secrets.env
source deployment-secrets.env

# Set environment variables for the DigitalOcean app
echo "Setting environment variables for app: $DO_APP_ID"

# Database and Redis
doctl apps config set --app-id $DO_APP_ID DATABASE_URL="$DATABASE_URL" --verbose
doctl apps config set --app-id $DO_APP_ID REDIS_URL="$REDIS_URL" --verbose

# Security secrets
doctl apps config set --app-id $DO_APP_ID JWT_SECRET="$JWT_SECRET" --verbose
doctl apps config set --app-id $DO_APP_ID COOKIE_SECRET="$COOKIE_SECRET" --verbose

# CORS settings
doctl apps config set --app-id $DO_APP_ID STORE_CORS="$STORE_CORS" --verbose
doctl apps config set --app-id $DO_APP_ID ADMIN_CORS="$ADMIN_CORS" --verbose
doctl apps config set --app-id $DO_APP_ID AUTH_CORS="$AUTH_CORS" --verbose

# Other settings
doctl apps config set --app-id $DO_APP_ID NODE_ENV="production" --verbose
doctl apps config set --app-id $DO_APP_ID MEDUSA_ADMIN_ONBOARDING_TYPE="default" --verbose

echo "Environment variables set successfully!"