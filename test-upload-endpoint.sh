#!/bin/bash

echo "Testing Medusa file upload endpoint..."
echo "======================================"

# Test if the uploads endpoint is accessible
echo "Testing uploads endpoint availability..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" https://shop.mediabox.co/admin/uploads

echo ""
echo "Testing admin auth endpoint..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" https://shop.mediabox.co/admin/auth

echo ""
echo "Testing file module info..."
curl -s https://shop.mediabox.co/health | jq . 2>/dev/null || echo "Health check response received"

echo ""
echo "Note: You'll need proper authentication to test actual file uploads"
echo "The 'field image 0 error' suggests either:"
echo "1. Frontend validation issue"
echo "2. File provider not properly configured"
echo "3. S3 connection failing"