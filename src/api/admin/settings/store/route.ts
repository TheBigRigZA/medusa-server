import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeSettingsModuleService = req.scope.resolve("storeSettingsModule")
  
  const settings = await storeSettingsModuleService.retrieve()
  
  res.json({ settings })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeSettingsModuleService = req.scope.resolve("storeSettingsModule")
  
  const { shop_enabled, show_coming_soon, maintenance_message, feature_flags } = req.body as {
    shop_enabled?: boolean
    show_coming_soon?: boolean
    maintenance_message?: string
    feature_flags?: Record<string, boolean>
  }
  
  const settings = await storeSettingsModuleService.updateSettings({
    shop_enabled,
    show_coming_soon,
    maintenance_message,
    feature_flags
  })
  
  res.json({ settings })
}