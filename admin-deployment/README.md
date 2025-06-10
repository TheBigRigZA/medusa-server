# Medusa Admin Dashboard

This is the admin dashboard for our Medusa-powered e-commerce platform, deployed as a static site.

## Baseline Working Commit

**Repository**: TheBigRigZA/medusa-admin  
**Commit Hash**: `[To be updated with admin repo commit]`  
**Server Commit**: `43de6b02f5a13e37b5d1b1adfde31d007dca847b`

## Overview

- **URL**: https://shop.mediabox.co/app
- **Backend API**: https://shop.mediabox.co
- **Deployment**: Digital Ocean Static Site
- **Customization Method**: Patch script (based on Igor Khomenko's approach)

## Dashboard Customization Approach

We use a **patch script** methodology for customizing the Medusa admin dashboard. This approach allows us to:
- Maintain the standard Medusa admin without forking
- Apply customizations after the build process
- Keep customizations version-controlled and reproducible
- Easily update to new Medusa versions

### How It Works

1. **Build Process**: Standard Medusa admin is built
2. **Patch Script**: `patch-admin.js` modifies the compiled files
3. **Deployment**: Modified admin is deployed as static site

## The Patch Script

The `patch-admin.js` file contains helper functions and customization logic. It's located in the parent directory and runs after the admin build.

### Helper Functions

```javascript
// Find files by pattern
findFilePathByNamePattern(filePattern, fileExtension)

// Find chunk files containing specific text
findChunkFileByContainingText(text)

// Read file as array of lines
readFileAsLines(filePath)

// Remove occurrences of text (keeping first occurrence)
removeOccurrence(lines, value, skipFirst = true)

// Write modified content back to file
writeFile(lines, filePath)
```

## Adding Customizations

To add customizations, edit the `patch-admin.js` file and uncomment or add new modifications:

### Example 1: Change Welcome Text

```javascript
// Change "Welcome to Medusa" to "Welcome to Marketplace"
const CHUNK_1 = findChunkFileByContainingText("Welcome to Medusa");
if (CHUNK_1) {
  let lines = readFileAsLines(CHUNK_1);
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/Welcome to Medusa/g, "Welcome to Marketplace");
  }
  writeFile(lines, CHUNK_1);
}
```

### Example 2: Hide Logo on Login Page

```javascript
// Hide avatar logo on login page
const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
lines = readFileAsLines(LOGIN_PATH);
lines = removeOccurrence(lines, "AvatarBox");
writeFile(lines, LOGIN_PATH);
```

### Example 3: Remove Menu Items

```javascript
// Hide documentation and changelog links
const APP_MJS_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/app.mjs`;
lines = readFileAsLines(APP_MJS_PATH);
lines.forEach((line, index) => {
  if (line.includes("app.menus.user.documentation")) {
    // Remove the menu item by clearing surrounding lines
    lines[index - 3] = "";
    lines[index - 2] = "";
    lines[index - 1] = "";
    lines[index] = "";
    lines[index + 1] = "";
  }
});
writeFile(lines, APP_MJS_PATH);
```

### Example 4: Add Custom Features

```javascript
// Add impersonation block for Super Admin
lines = readFileAsLines(APP_MJS_PATH);
lines.forEach((line, index) => {
  if (line.includes("var MainLayout")) {
    const newCode = `var MainLayout=()=>{
      // Custom impersonation logic here
      const impersonateKey="IMPERSONATED_AS";
      // ... rest of custom code
    }`;
    lines[index] = newCode;
  }
});
writeFile(lines, APP_MJS_PATH);
```

## Important: Clear Vite Cache

After making customizations, always clear the Vite cache:

```javascript
const VITE_CACHE_PATH = `${__dirname}/node_modules/@medusajs/admin-bundler/node_modules/.vite`;
if (fs.existsSync(VITE_CACHE_PATH)) {
  fs.rmSync(VITE_CACHE_PATH, { recursive: true, force: true });
  console.log("Vite cache cleared successfully.");
}
```

## Development Workflow

1. **Make Changes**: Edit `patch-admin.js` with your customizations
2. **Test Locally**: 
   ```bash
   cd ..
   yarn install
   npx medusa build
   node patch-admin.js
   ```
3. **Verify**: Check the admin panel locally
4. **Commit**: Push changes to trigger deployment

## Build Process

The Digital Ocean build command:
```bash
cd .. && yarn install && NODE_OPTIONS='--max-old-space-size=2048' npx medusa build && node patch-admin.js && mkdir -p admin-deployment/dist && cp -r .medusa/admin/* admin-deployment/dist/
```

This:
1. Installs dependencies
2. Builds Medusa (including admin)
3. Runs the patch script
4. Copies built files to deployment directory

## Deployment

Deployment is automatic via Digital Ocean when pushing to the main branch. The `.do-app-spec.yaml` file configures:
- Build commands
- Output directory
- Environment variables

## Troubleshooting

### Customizations Not Appearing
1. Ensure patch script runs without errors
2. Clear Vite cache
3. Check file patterns match current Medusa version

### Build Failures
1. Check Node.js memory allocation
2. Verify all dependencies are installed
3. Review patch script for errors

### Finding the Right Files to Modify
1. Use browser DevTools to inspect elements
2. Search for unique text in chunk files
3. Use `findChunkFileByContainingText()` to locate files

## Best Practices

1. **Test Locally First**: Always test customizations locally before deploying
2. **Document Changes**: Comment your customizations clearly
3. **Keep It Simple**: Prefer CSS changes over complex JS modifications when possible
4. **Version Control**: Track what Medusa version your patches work with
5. **Backup**: Keep the unmodified build as backup

## References

- [Original Article by Igor Khomenko](https://medium.com/@igorkhomenko/building-a-multivendor-marketplace-with-medusa-js-2-0-dashboard-customization-part-3-6ce584b8c1c1)
- [Medusa Admin Documentation](https://docs.medusajs.com/admin/development)
- [Medusa GitHub](https://github.com/medusajs/medusa)

## Support

For issues specific to our customizations, check:
1. The patch script output for errors
2. Browser console for runtime errors
3. Network tab for API issues

For Medusa-specific issues, refer to the official Medusa documentation and community.
