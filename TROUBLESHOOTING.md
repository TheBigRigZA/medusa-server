# Troubleshooting Mediabox Admin Customizations

## Issue: Customizations Not Showing After Deployment

If the branding and logo changes are not appearing on the deployed admin panel, follow these steps:

### 1. Verify Local Build

First, test if the customizations work locally:

```bash
cd medusa-server
./debug-admin-customizations.sh
```

This will show you:
- Whether the patch script found the correct files
- If the customizations were applied
- Any missing patterns or files

### 2. Check Build Output

During deployment, check the Digital Ocean build logs for:
- "Applying Mediabox branding customizations..."
- Any error messages from the patch script
- Confirmation messages like "✓ Updated welcome text"

### 3. Common Issues and Solutions

#### Issue: "Welcome to Medusa" text not changing
**Possible Causes:**
- Text might be in a different chunk file
- Text format might have changed in newer Medusa versions

**Solution:**
Run the debug script to find which files contain the text, then update the patch script accordingly.

#### Issue: Logo not appearing on login page
**Possible Causes:**
- The compiled code structure has changed
- CSS injection not working
- Logo files not found during build

**Solutions:**
1. The patch script now uses multiple approaches:
   - Direct component replacement
   - CSS injection for hiding default logo
   - Global styles in index.html

2. Ensure logo files are in the correct location:
   - `medusa-server/assets/logo-login.png`
   - `medusa-server/assets/logo-header.png`
   - `medusa-server/assets/favicon.ico`

#### Issue: Colors not changing
**Possible Causes:**
- CSS specificity issues
- Styles not being injected properly

**Solution:**
The patch script injects styles in multiple places to ensure they take effect.

### 4. Manual Verification

To manually check if customizations were applied:

1. **Check the built files locally:**
   ```bash
   # Build locally
   npx medusa build
   
   # Run patch script
   node patch-admin.js
   
   # Check if files were modified
   grep -q "Mediabox" node_modules/@medusajs/dashboard/dist/*.mjs && echo "✓ Customizations found" || echo "✗ Customizations not found"
   ```

2. **Serve the admin locally:**
   ```bash
   cd .medusa/admin
   npx serve -l 7001
   ```
   Then visit http://localhost:7001 to see if customizations appear.

### 5. Force Rebuild on Digital Ocean

If customizations work locally but not on deployment:

1. Make a small change to trigger a rebuild:
   ```bash
   echo "# Rebuild trigger $(date)" >> README.md
   git add README.md
   git commit -m "Trigger rebuild"
   git push
   ```

2. Monitor the build logs in Digital Ocean dashboard

### 6. Alternative Approach

If the patch script approach continues to have issues, consider:

1. **Fork the Medusa admin**: More maintenance but guaranteed customization
2. **Use environment variables**: For text changes that Medusa might support
3. **Custom admin build**: Build admin separately and deploy as static files

### 7. Debug Commands

```bash
# Check if patch script ran during build
./debug-admin-customizations.sh

# Test patch script locally
node patch-admin.js

# Verify assets exist
ls -la assets/

# Check for errors in patch script
node patch-admin.js 2>&1 | grep -E "Error|❌|⚠️"
```

### 8. Contact Support

If issues persist:
1. Check Medusa Discord for similar issues
2. Review the [original article](https://medium.com/@igorkhomenko/building-a-multivendor-marketplace-with-medusa-js-2-0-dashboard-customization-part-3-6ce584b8c1c1) for updates
3. Consider opening an issue with detailed logs

## Prevention

To prevent future issues:
1. Test locally before deploying
2. Keep track of Medusa version changes
3. Document any manual fixes needed
4. Consider version-locking Medusa dependencies
