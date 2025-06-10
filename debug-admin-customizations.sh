#!/bin/bash

echo "Debugging Mediabox Admin Customizations..."
echo "========================================"

# Check if we're in the right directory
if [ ! -f "patch-admin.js" ]; then
    echo "❌ Error: patch-admin.js not found. Please run this from the medusa-server directory."
    exit 1
fi

# Check if admin is built
if [ ! -d "node_modules/@medusajs/dashboard/dist" ]; then
    echo "❌ Admin not built yet. Please run 'npx medusa build' first."
    exit 1
fi

echo ""
echo "1. Checking for 'Welcome to Medusa' text in chunk files..."
echo "-----------------------------------------------------------"
grep -l "Welcome to Medusa" node_modules/@medusajs/dashboard/dist/chunk-*.mjs 2>/dev/null || echo "⚠️  No files found with 'Welcome to Medusa'"

echo ""
echo "2. Checking for login page file..."
echo "-----------------------------------------------------------"
ls -la node_modules/@medusajs/dashboard/dist/login-*.mjs 2>/dev/null || echo "⚠️  No login file found"

echo ""
echo "3. Checking for AvatarBox or LogoBox references..."
echo "-----------------------------------------------------------"
grep -l "AvatarBox\|LogoBox" node_modules/@medusajs/dashboard/dist/*.mjs 2>/dev/null | head -5 || echo "⚠️  No files found with AvatarBox or LogoBox"

echo ""
echo "4. Checking index.html..."
echo "-----------------------------------------------------------"
if [ -f "node_modules/@medusajs/dashboard/dist/index.html" ]; then
    echo "✓ index.html exists"
    grep -q "mediabox-global-styles" node_modules/@medusajs/dashboard/dist/index.html && echo "✓ Global styles injected" || echo "⚠️  Global styles not found"
else
    echo "❌ index.html not found"
fi

echo ""
echo "5. Checking for SVG logos in files..."
echo "-----------------------------------------------------------"
grep -l 'svg.*width.*40.*height.*40' node_modules/@medusajs/dashboard/dist/*.mjs 2>/dev/null | head -5 || echo "⚠️  No SVG logos found"

echo ""
echo "6. Looking for any Medusa branding..."
echo "-----------------------------------------------------------"
grep -l "medusa\|Medusa" node_modules/@medusajs/dashboard/dist/*.mjs 2>/dev/null | wc -l | xargs -I {} echo "Found {} files with Medusa references"

echo ""
echo "7. Checking if patch script was run..."
echo "-----------------------------------------------------------"
grep -q "mediabox-login-styles" node_modules/@medusajs/dashboard/dist/login-*.mjs 2>/dev/null && echo "✓ Login CSS injection found" || echo "⚠️  Login CSS injection not found"

echo ""
echo "========================================"
echo "Debug complete. Check the output above for issues."
echo ""
echo "Common issues:"
echo "- If no 'Welcome to Medusa' found, the text might be in a different format"
echo "- If no login file found, the file pattern might have changed"
echo "- If global styles not injected, the patch might not have run successfully"
echo ""
echo "Try running: node patch-admin.js"
echo "And check the output for any errors."
