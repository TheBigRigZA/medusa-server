#!/bin/bash

echo "Testing Mediabox Admin Customizations..."
echo "========================================"

# Check if assets exist
echo "Checking for required assets..."
if [ -f "assets/logo-login.png" ]; then
    echo "✓ logo-login.png found"
else
    echo "✗ logo-login.png missing"
    exit 1
fi

if [ -f "assets/logo-header.png" ]; then
    echo "✓ logo-header.png found"
else
    echo "✗ logo-header.png missing"
    exit 1
fi

if [ -f "assets/favicon.ico" ]; then
    echo "✓ favicon.ico found"
else
    echo "✗ favicon.ico missing"
    exit 1
fi

echo ""
echo "Building Medusa admin..."
echo "This may take a few minutes..."

# Build the admin
NODE_OPTIONS='--max-old-space-size=2048' npx medusa build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✓ Build completed successfully"
else
    echo "✗ Build failed"
    exit 1
fi

echo ""
echo "Running patch script..."

# Run the patch script
node patch-admin.js

# Check if patch was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Patch script completed successfully"
else
    echo "✗ Patch script failed"
    exit 1
fi

echo ""
echo "========================================"
echo "✅ All tests passed!"
echo ""
echo "The admin panel has been built and customized."
echo "You can now:"
echo "1. Deploy to Digital Ocean (git push)"
echo "2. Or test locally by serving the built files"
echo ""
echo "Built files location: .medusa/admin/"
