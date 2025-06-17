import { model } from "@medusajs/framework/utils"

export const StoreSettings = model.define("store_settings", {
  id: model.id().primaryKey(),
  shop_enabled: model.boolean().default(true),
  show_coming_soon: model.boolean().default(false),
  feature_flags: model.json().nullable(),
  maintenance_message: model.text().nullable(),
})