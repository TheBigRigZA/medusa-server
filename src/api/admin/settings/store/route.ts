import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { STORE_SETTINGS_MODULE } from "../../../../modules/store-settings"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeSettingsModuleService = req.scope.resolve(STORE_SETTINGS_MODULE)
  
  const settings = await storeSettingsModuleService.retrieve()
  
  res.json({ settings })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeSettingsModuleService = req.scope.resolve(STORE_SETTINGS_MODULE)
  
  const { shop_enabled, show_coming_soon, maintenance_message, feature_flags } = req.body
  
  const settings = await storeSettingsModuleService.updateSettings({
    shop_enabled,
    show_coming_soon,
    maintenance_message,
    feature_flags
  })
  
  res.json({ settings })
}