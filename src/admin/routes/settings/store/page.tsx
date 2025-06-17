import { useState, useEffect } from "react"
import { 
  Container, 
  Heading, 
  Text, 
  Switch, 
  Button, 
  Textarea 
} from "@medusajs/ui"
import { defineRouteConfig } from "@medusajs/admin-sdk"

const StoreSettingsPage = () => {
  const [settings, setSettings] = useState({
    shop_enabled: true,
    show_coming_soon: false,
    maintenance_message: "",
    feature_flags: {}
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch("/admin/settings/store", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch("/admin/settings/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        alert("Store settings updated successfully!")
      } else {
        throw new Error("Failed to save settings")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save store settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <Heading>Store Settings</Heading>
        <Text>Loading...</Text>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Heading>Store Settings</Heading>
        <Button 
          onClick={saveSettings} 
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Shop Enabled Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Text weight="plus" size="large">Shop Enabled</Text>
            <Text size="small" className="text-ui-fg-subtle">
              Enable or disable all e-commerce functionality. When disabled, customers cannot place orders.
            </Text>
          </div>
          <Switch
            checked={settings.shop_enabled}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, shop_enabled: checked }))
            }
          />
        </div>

        {/* Coming Soon Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Text weight="plus" size="large">Show Coming Soon</Text>
            <Text size="small" className="text-ui-fg-subtle">
              Display placeholder content for products that are not yet available.
            </Text>
          </div>
          <Switch
            checked={settings.show_coming_soon}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, show_coming_soon: checked }))
            }
          />
        </div>

        {/* Maintenance Message */}
        <div className="p-4 border rounded-lg">
          <Text weight="plus" size="large" className="mb-2">Maintenance Message</Text>
          <Text size="small" className="text-ui-fg-subtle mb-3">
            Optional message to display when the shop is disabled.
          </Text>
          <Textarea
            placeholder="Enter maintenance message (optional)"
            value={settings.maintenance_message || ""}
            onChange={(e) => 
              setSettings(prev => ({ ...prev, maintenance_message: e.target.value }))
            }
            rows={3}
          />
        </div>

        {/* Current Status */}
        <div className="p-4 bg-ui-bg-subtle rounded-lg">
          <Text weight="plus" size="large" className="mb-2">Current Status</Text>
          <div className="space-y-1">
            <Text size="small">
              <span className="font-medium">Shop Status:</span>{" "}
              <span className={settings.shop_enabled ? "text-green-600" : "text-red-600"}>
                {settings.shop_enabled ? "Enabled" : "Disabled"}
              </span>
            </Text>
            <Text size="small">
              <span className="font-medium">Coming Soon Mode:</span>{" "}
              <span className={settings.show_coming_soon ? "text-yellow-600" : "text-gray-600"}>
                {settings.show_coming_soon ? "Active" : "Inactive"}
              </span>
            </Text>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Store Settings",
  icon: "Cog",
})

export default StoreSettingsPage