#!/bin/bash

echo "Fixing S3/DigitalOcean Spaces Configuration"
echo "=========================================="

# Check if deployment-secrets.env exists
if [ ! -f "deployment-secrets.env" ]; then
    echo "❌ Error: deployment-secrets.env not found"
    exit 1
fi

# Check if required variables are already set
if grep -q "^ENABLE_S3=" deployment-secrets.env; then
    echo "✅ ENABLE_S3 already exists in deployment-secrets.env"
else
    echo "📝 Adding ENABLE_S3=true to deployment-secrets.env"
    echo "" >> deployment-secrets.env
    echo "# Enable S3 storage" >> deployment-secrets.env
    echo "ENABLE_S3=true" >> deployment-secrets.env
fi

if grep -q "^S3_FILE_URL=" deployment-secrets.env; then
    echo "✅ S3_FILE_URL already exists in deployment-secrets.env"
else
    echo "📝 Adding S3_FILE_URL to deployment-secrets.env"
    echo "S3_FILE_URL=https://mediaboxstuff.fra1.digitaloceanspaces.com" >> deployment-secrets.env
fi

# Update set-env-vars.sh if needed
if grep -q "ENABLE_S3" set-env-vars.sh; then
    echo "✅ ENABLE_S3 already in set-env-vars.sh"
else
    echo "📝 Adding ENABLE_S3 to set-env-vars.sh"
    # Add after the S3_PREFIX line
    sed -i '/doctl apps config set \$DO_APP_ID S3_PREFIX=/a\
\
# Enable S3 storage\
doctl apps config set $DO_APP_ID ENABLE_S3="true" --verbose' set-env-vars.sh
fi

if grep -q "S3_FILE_URL" set-env-vars.sh; then
    echo "✅ S3_FILE_URL already in set-env-vars.sh"
else
    echo "📝 Adding S3_FILE_URL to set-env-vars.sh"
    sed -i '/doctl apps config set \$DO_APP_ID ENABLE_S3=/a\
doctl apps config set $DO_APP_ID S3_FILE_URL="https://mediaboxstuff.fra1.digitaloceanspaces.com" --verbose' set-env-vars.sh
fi

echo ""
echo "✅ Configuration files updated!"
echo ""
echo "Next steps:"
echo "1. Test the S3 connection: node test-s3-connection.js"
echo "2. If test passes, deploy the changes: ./set-env-vars.sh"
echo "3. Restart your application to apply the new settings"
echo ""
echo "Current S3 configuration:"
echo "========================"
grep "^S3_\|^ENABLE_S3" deployment-secrets.env | while read line; do
    key=$(echo "$line" | cut -d'=' -f1)
    if [[ "$key" == "S3_SECRET_ACCESS_KEY" ]]; then
        echo "$key=***hidden***"
    else
        echo "$line"
    fi
done