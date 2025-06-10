#!/bin/bash

echo "Building Medusa Admin Dashboard..."

# Set environment variables
export MEDUSA_BACKEND_URL="https://medusa-server-rnupj.ondigitalocean.app"
export NODE_OPTIONS="--max-old-space-size=2048"

# Temporarily enable admin for build
sed -i 's/disable: true/disable: false/g' medusa-config.ts

# Build admin
yarn install
npx medusa build

# Restore config
sed -i 's/disable: false/disable: true/g' medusa-config.ts

echo "Admin build complete! Files are in .medusa/admin"
echo "You can now deploy these files to any static hosting service"