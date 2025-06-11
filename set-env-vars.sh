#!/bin/bash

# Load environment variables from deployment-secrets.env
source deployment-secrets.env

# Set environment variables for the DigitalOcean app
echo "Setting environment variables for app: $DO_APP_ID"

# Database and Redis
doctl apps config set $DO_APP_ID DATABASE_URL="$DATABASE_URL" --verbose
doctl apps config set $DO_APP_ID REDIS_URL="$REDIS_URL" --verbose

# Security secrets
doctl apps config set $DO_APP_ID JWT_SECRET="$JWT_SECRET" --verbose
doctl apps config set $DO_APP_ID COOKIE_SECRET="$COOKIE_SECRET" --verbose

# CORS settings
doctl apps config set $DO_APP_ID STORE_CORS="$STORE_CORS" --verbose
doctl apps config set $DO_APP_ID ADMIN_CORS="$ADMIN_CORS" --verbose
doctl apps config set $DO_APP_ID AUTH_CORS="$AUTH_CORS" --verbose

# Other settings
doctl apps config set $DO_APP_ID NODE_ENV="production" --verbose
doctl apps config set $DO_APP_ID MEDUSA_ADMIN_ONBOARDING_TYPE="default" --verbose
doctl apps config set $DO_APP_ID MEDUSA_BACKEND_URL="$MEDUSA_BACKEND_URL" --verbose

# DigitalOcean Spaces settings
doctl apps config set $DO_APP_ID S3_REGION="$S3_REGION" --verbose
doctl apps config set $DO_APP_ID S3_BUCKET="$S3_BUCKET" --verbose
doctl apps config set $DO_APP_ID S3_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" --verbose
doctl apps config set $DO_APP_ID S3_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" --verbose
doctl apps config set $DO_APP_ID S3_ENDPOINT="$S3_ENDPOINT" --verbose
doctl apps config set $DO_APP_ID S3_PREFIX="$S3_PREFIX" --verbose

echo "Environment variables set successfully!"