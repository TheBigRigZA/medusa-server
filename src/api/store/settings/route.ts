import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeSettingsModuleService = req.scope.resolve("storeSettingsModule")
  
  const settings = await storeSettingsModuleService.retrieve()
  
  res.json({
    settings: {
      shop_enabled: settings.shop_enabled,
      show_coming_soon: settings.show_coming_soon,
      maintenance_message: settings.maintenance_message,
      feature_flags: settings.feature_flags || {}
    }
  })
}