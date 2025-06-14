import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: true,
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://shop.mediabox.co"
  },
  modules: process.env.ENABLE_S3 === "true" ? [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL || "https://mediaboxstuff.fra1.digitaloceanspaces.com",
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: "us-east-1", // Must be us-east-1 for DigitalOcean Spaces
              bucket: process.env.S3_BUCKET || "mediaboxstuff",
              endpoint: process.env.S3_ENDPOINT || "https://fra1.digitaloceanspaces.com",
              prefix: process.env.S3_PREFIX || "Medusa-Webstore",
              // Additional S3 client options for DigitalOcean Spaces
              s3_force_path_style: false,
              additional_client_config: {
                forcePathStyle: false
              }
            },
          },
        ],
      },
    },
  ] : [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: (process.env.MEDUSA_BACKEND_URL || "https://shop.mediabox.co") + "/static"
            },
          },
        ],
      },
    },
  ],
})
