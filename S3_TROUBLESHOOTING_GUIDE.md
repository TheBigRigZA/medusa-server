# S3/DigitalOcean Spaces Upload Error Troubleshooting Guide

## Problem Summary
The user is experiencing a "field image 0 error" when trying to upload images in the Medusa admin panel.

## Root Cause Analysis

### Primary Issue: Missing Environment Variable
The most critical issue is that **`ENABLE_S3=true` is not set** in the environment configuration.

Looking at `/medusa-config.ts`, the S3 module is conditionally loaded:
```typescript
modules: process.env.ENABLE_S3 === "true" ? [
    // S3 configuration...
] : [
    // Local file configuration...
]
```

Without `ENABLE_S3=true`, the server falls back to local file storage, which doesn't work properly in the deployed environment.

## Current Configuration Status

### ✅ Correctly Configured
- Region: `fra1`
- Bucket: `mediaboxstuff`
- Endpoint: `https://fra1.digitaloceanspaces.com`
- Access credentials are present
- S3 prefix: `Medusa-Webstore`

### ❌ Issues Found
1. **Missing `ENABLE_S3=true`** - Critical issue
2. **Missing `S3_FILE_URL`** - Required for proper file URL generation
3. Environment variables not deployed to DigitalOcean App Platform

## Step-by-Step Fix

### 1. Fix Local Environment Configuration

Run the automated fix script:
```bash
cd /home/mbx/Dev/Medusa-Server/medusa-server
./fix-s3-config.sh
```

This will add the missing environment variables to `deployment-secrets.env`:
- `ENABLE_S3=true`
- `S3_FILE_URL=https://mediaboxstuff.fra1.digitaloceanspaces.com`

### 2. Test S3 Connection Locally

Before deploying, test that your S3 credentials work:
```bash
node test-s3-connection.js
```

This will verify:
- Bucket access permissions
- File upload capability
- Proper endpoint configuration

### 3. Deploy Environment Variables

Update your DigitalOcean App Platform environment:
```bash
./set-env-vars.sh
```

### 4. Restart Application

After updating environment variables, restart your DigitalOcean app to load the new configuration.

### 5. Verify Configuration

Run the diagnostic script to ensure everything is configured correctly:
```bash
node diagnose-upload-error.js
```

## Expected Configuration After Fix

Your `deployment-secrets.env` should include:
```bash
# S3/DigitalOcean Spaces Configuration
ENABLE_S3=true
S3_REGION=fra1
S3_BUCKET=mediaboxstuff
S3_ACCESS_KEY_ID=DO00WRBN7DCGHLXQEQKT
S3_SECRET_ACCESS_KEY=BbSCL3e7wSUsKHNsCCOApsb0f1NPFbnMNxN34qVL3uw
S3_ENDPOINT=https://fra1.digitaloceanspaces.com
S3_FILE_URL=https://mediaboxstuff.fra1.digitaloceanspaces.com
S3_PREFIX=Medusa-Webstore
```

## Common Error Messages and Solutions

### "field image 0 error"
- **Cause**: File provider not properly configured or S3 disabled
- **Solution**: Ensure `ENABLE_S3=true` and restart server

### "Access Denied" during upload
- **Cause**: Invalid S3 credentials or bucket permissions
- **Solution**: Verify DigitalOcean Spaces access key has read/write permissions

### Upload succeeds but images don't display
- **Cause**: Incorrect `S3_FILE_URL` configuration
- **Solution**: Set `S3_FILE_URL=https://mediaboxstuff.fra1.digitaloceanspaces.com`

### Connection timeout
- **Cause**: Wrong endpoint or network issues
- **Solution**: Verify `S3_ENDPOINT=https://fra1.digitaloceanspaces.com`

## File Provider Configuration Details

The S3 file provider expects these exact field names in `medusa-config.ts`:
```typescript
{
  resolve: "@medusajs/medusa/file-s3",
  id: "s3",
  options: {
    file_url: process.env.S3_FILE_URL,           // Required for image URLs
    access_key_id: process.env.S3_ACCESS_KEY_ID,
    secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET,
    endpoint: process.env.S3_ENDPOINT,
    prefix: process.env.S3_PREFIX
  }
}
```

## Verification Steps

After applying fixes:

1. **Check environment loading**:
   ```bash
   node -e "console.log('ENABLE_S3:', process.env.ENABLE_S3)"
   ```

2. **Test S3 connection**:
   ```bash
   node test-s3-connection.js
   ```

3. **Verify admin uploads**:
   - Log into Medusa admin
   - Try uploading a small test image
   - Check that image displays correctly

4. **Check uploaded files**:
   - Files should appear in DigitalOcean Spaces under `Medusa-Webstore/` prefix
   - URLs should be accessible: `https://mediaboxstuff.fra1.digitaloceanspaces.com/Medusa-Webstore/filename`

## Additional Resources

- DigitalOcean Spaces Documentation: https://docs.digitalocean.com/products/spaces/
- Medusa File Providers: https://docs.medusajs.com/learn/fundamentals/file-providers
- AWS S3 SDK Documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/

## Files Created for Troubleshooting

1. `fix-s3-config.sh` - Automated configuration fix
2. `test-s3-connection.js` - S3 connection testing
3. `diagnose-upload-error.js` - Comprehensive configuration diagnosis
4. `S3_TROUBLESHOOTING_GUIDE.md` - This documentation

## Need More Help?

If issues persist after following this guide:
1. Check DigitalOcean app logs for specific error messages
2. Verify bucket exists and is accessible in DigitalOcean Spaces console
3. Test credentials using DigitalOcean's API explorer
4. Check CORS settings if uploads fail with permission errors