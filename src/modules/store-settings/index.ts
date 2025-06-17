import { Module } from "@medusajs/framework/utils"
import StoreSettingsService from "./service"

export const STORE_SETTINGS_MODULE = "storeSettingsModule"

export default Module(STORE_SETTINGS_MODULE, {
  service: StoreSettingsService,
})