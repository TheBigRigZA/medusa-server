import { MedusaService } from "@medusajs/framework/utils"
import { StoreSettings } from "./models/store-settings"

type InjectedDependencies = {
  // Add any dependencies here
}

class StoreSettingsService extends MedusaService({
  StoreSettings,
}) {
  protected readonly dependencies_: InjectedDependencies

  constructor(container: InjectedDependencies) {
    super(...arguments)
    this.dependencies_ = container
  }

  async retrieve(id: string = "default"): Promise<any> {
    let settings = await this.listStoreSettings({
      id: [id],
    })

    if (!settings.length) {
      // Create default settings if none exist
      settings = await this.createStoreSettings([{
        id: "default",
        shop_enabled: true,
        show_coming_soon: false,
        feature_flags: {},
      }])
    }

    return settings[0]
  }

  async updateSettings(data: Partial<{
    shop_enabled: boolean
    show_coming_soon: boolean
    feature_flags: Record<string, boolean>
    maintenance_message: string
  }>): Promise<any> {
    const currentSettings = await this.retrieve()
    
    const updated = await this.updateStoreSettings([{
      id: currentSettings.id,
      ...data
    }])

    return updated[0]
  }
}

export default StoreSettingsService