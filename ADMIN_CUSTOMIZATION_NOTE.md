# Admin Customization Note

## Important: Admin Customizations Should Run in the Admin Repository

The `patch-admin.js` script contains customizations for the Medusa admin panel. However, this script **cannot run here** because:

1. **Admin is disabled** in this repository (`admin.disable: true` in medusa-config.ts)
2. **Admin is deployed separately** from the `TheBigRigZA/medusa-admin` repository
3. **No admin files exist here** to customize

## Where Customizations Should Run:

The `patch-admin.js` script should be moved to the **admin repository** and run as part of its build process:

```json
// In the admin repo's package.json
{
  "scripts": {
    "build": "medusa build && node patch-admin.js"
  }
}
```

## Current Setup:

- **Backend API** (this repo): Serves only the API endpoints
- **Admin Static Site** (separate repo): Contains and builds the admin UI
- **Deployment**: Admin is deployed to Digital Ocean as a static site at `/app`

## Files to Move:

1. `patch-admin.js` - The customization script
2. `assets/logo-login.png` - Login page logo
3. `assets/logo-header.png` - Header logo
4. `assets/favicon.ico` - Favicon

These should all be in the admin repository where they can actually be applied during the build process.