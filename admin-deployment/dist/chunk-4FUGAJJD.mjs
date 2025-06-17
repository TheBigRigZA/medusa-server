import {
  getProvinceByIso2,
  isProvinceInCountry
} from "./chunk-THZJC662.mjs";
import {
  IconAvatar
} from "./chunk-EQTBJSBZ.mjs";
import {
  getCountryByIso2
} from "./chunk-DG7J63J2.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import {
  useDeleteTaxRate
} from "./chunk-X6DSNTTX.mjs";
import {
  useDeleteTaxRegion
} from "./chunk-I6E6CALJ.mjs";

// src/routes/tax-regions/common/components/tax-region-card/tax-region-card.tsx
import { Heading, Text, Tooltip, clx } from "@medusajs/ui";
import ReactCountryFlag from "react-country-flag";
import {
  ExclamationCircle,
  MapPin,
  Plus,
  Trash,
  PencilSquare
} from "@medusajs/icons";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Link } from "react-router-dom";

// src/routes/tax-regions/common/hooks.ts
import { toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
var useDeleteTaxRegionAction = ({
  taxRegion,
  to = "/settings/tax-regions"
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteTaxRegion(taxRegion.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("taxRegions.delete.confirmation"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(t("taxRegions.delete.successToast"));
        navigate(to, { replace: true });
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return handleDelete;
};
var useDeleteTaxRateAction = (taxRate) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteTaxRate(taxRate.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("taxRegions.taxRates.delete.confirmation", {
        name: taxRate.name
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(t("taxRegions.taxRates.delete.successToast"));
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return handleDelete;
};

// src/routes/tax-regions/common/components/tax-region-card/tax-region-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRegionCard = ({
  taxRegion,
  type = "list",
  variant = "country",
  asLink = true,
  badge
}) => {
  const { t } = useTranslation2();
  const { id, country_code, province_code } = taxRegion;
  const country = getCountryByIso2(country_code);
  const province = getProvinceByIso2(province_code);
  let name = "N/A";
  let misconfiguredSublevelTooltip = null;
  if (province || province_code) {
    name = province ? province : province_code.toUpperCase();
  } else if (country || country_code) {
    name = country ? country.display_name : country_code.toUpperCase();
  }
  if (country_code && province_code && !isProvinceInCountry(country_code, province_code)) {
    name = province_code.toUpperCase();
    misconfiguredSublevelTooltip = t(
      "taxRegions.fields.sublevels.tooltips.notPartOfCountry",
      {
        country: country?.display_name,
        province: province_code.toUpperCase()
      }
    );
  }
  const showCreateDefaultTaxRate = !taxRegion.tax_rates.filter((tr) => tr.is_default).length && type === "header";
  const Component = /* @__PURE__ */ jsxs(
    "div",
    {
      className: clx(
        "group-data-[link=true]:hover:bg-ui-bg-base-hover transition-fg flex flex-col justify-between gap-y-4 px-6 md:flex-row md:items-center md:gap-y-0",
        {
          "py-4": type === "header",
          "py-3": type === "list"
        }
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-4", children: [
            /* @__PURE__ */ jsx(IconAvatar, { size: type === "list" ? "small" : "large", children: country_code && !province_code ? /* @__PURE__ */ jsx(
              "div",
              {
                className: clx(
                  "flex size-fit items-center justify-center overflow-hidden rounded-[1px]",
                  {
                    "rounded-sm": type === "header"
                  }
                ),
                children: /* @__PURE__ */ jsx(
                  ReactCountryFlag,
                  {
                    countryCode: country_code,
                    svg: true,
                    style: type === "list" ? { width: "12px", height: "9px" } : { width: "16px", height: "12px" },
                    "aria-label": country?.display_name
                  }
                )
              }
            ) : /* @__PURE__ */ jsx(MapPin, { className: "text-ui-fg-subtle" }) }),
            /* @__PURE__ */ jsx("div", { children: type === "list" ? /* @__PURE__ */ jsx(Text, { size: "small", weight: "plus", leading: "compact", children: name }) : /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsx(Heading, { children: name }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex size-fit items-center gap-x-2 md:hidden", children: [
            misconfiguredSublevelTooltip && /* @__PURE__ */ jsx(Tooltip, { content: misconfiguredSublevelTooltip, children: /* @__PURE__ */ jsx(ExclamationCircle, { className: "text-ui-tag-orange-icon" }) }),
            badge,
            /* @__PURE__ */ jsx(
              TaxRegionCardActions,
              {
                taxRegion,
                showCreateDefaultTaxRate
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden size-fit items-center gap-x-2 md:flex", children: [
          misconfiguredSublevelTooltip && /* @__PURE__ */ jsx(Tooltip, { content: misconfiguredSublevelTooltip, children: /* @__PURE__ */ jsx(ExclamationCircle, { className: "text-ui-tag-orange-icon" }) }),
          badge,
          /* @__PURE__ */ jsx(
            TaxRegionCardActions,
            {
              taxRegion,
              showCreateDefaultTaxRate
            }
          )
        ] })
      ]
    }
  );
  if (asLink) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: variant === "country" ? `${id}` : `provinces/${id}`,
        "data-link": "true",
        className: "group block",
        children: Component
      }
    );
  }
  return Component;
};
var TaxRegionCardActions = ({
  taxRegion,
  showCreateDefaultTaxRate
}) => {
  const { t } = useTranslation2();
  const hasParent = !!taxRegion.parent_id;
  const to = hasParent ? `/settings/tax-regions/${taxRegion.parent_id}` : void 0;
  const handleDelete = useDeleteTaxRegionAction({ taxRegion, to });
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        ...showCreateDefaultTaxRate ? [
          {
            actions: [
              {
                icon: /* @__PURE__ */ jsx(Plus, {}),
                label: t("taxRegions.fields.defaultTaxRate.action"),
                to: `tax-rates/create`
              }
            ]
          }
        ] : [],
        {
          actions: [
            !hasParent && {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              to: `/settings/tax-regions/${taxRegion.id}/edit`
            },
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ].filter(Boolean)
        }
      ]
    }
  );
};

// src/components/localization/localized-table-pagination/localized-table-pagination.tsx
import { Table } from "@medusajs/ui";
import { forwardRef } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { jsx as jsx2 } from "react/jsx-runtime";
var LocalizedTablePagination = forwardRef((props, ref) => {
  const { t } = useTranslation3();
  const translations = {
    of: t("general.of"),
    results: t("general.results"),
    pages: t("general.pages"),
    prev: t("general.prev"),
    next: t("general.next")
  };
  return /* @__PURE__ */ jsx2(Table.Pagination, { ...props, translations, ref });
});
LocalizedTablePagination.displayName = "LocalizedTablePagination";

export {
  LocalizedTablePagination,
  useDeleteTaxRateAction,
  TaxRegionCard
};


// Mediabox Store Toggle Functionality
(function() {
  if (typeof document === 'undefined' || document.getElementById('mediabox-store-toggle')) return;
  
  // Create store toggle container
  const createStoreToggle = () => {
    const container = document.createElement('div');
    container.id = 'mediabox-store-toggle';
    container.className = 'mediabox-store-settings';
    container.innerHTML = `
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #111827;">Store Settings</h2>
        
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f9fafb; border-radius: 6px; margin-bottom: 12px;">
          <div>
            <div style="font-weight: 500; color: #111827; margin-bottom: 4px;">Shop Enabled</div>
            <div style="font-size: 14px; color: #6b7280;">Enable or disable all e-commerce functionality</div>
          </div>
          <label style="position: relative; display: inline-block; width: 44px; height: 24px;">
            <input type="checkbox" id="shop-enabled-toggle" style="opacity: 0; width: 0; height: 0;">
            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
          </label>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f9fafb; border-radius: 6px; margin-bottom: 12px;">
          <div>
            <div style="font-weight: 500; color: #111827; margin-bottom: 4px;">Coming Soon Mode</div>
            <div style="font-size: 14px; color: #6b7280;">Show placeholder content for unavailable products</div>
          </div>
          <label style="position: relative; display: inline-block; width: 44px; height: 24px;">
            <input type="checkbox" id="coming-soon-toggle" style="opacity: 0; width: 0; height: 0;">
            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
          </label>
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; color: #111827; margin-bottom: 8px;">Maintenance Message</label>
          <textarea id="maintenance-message" placeholder="Optional message when shop is disabled" 
                    style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; min-height: 80px; resize: vertical;"></textarea>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button id="save-store-settings" style="background: #df3d58; color: white; padding: 8px 16px; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;">
            Save Settings
          </button>
          <button id="refresh-store-settings" style="background: #f3f4f6; color: #374151; padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; font-weight: 500; cursor: pointer;">
            Refresh
          </button>
        </div>
        
        <div id="store-status" style="margin-top: 16px; padding: 12px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px;">
          <div style="font-weight: 500; color: #0369a1; margin-bottom: 4px;">Current Status</div>
          <div id="status-text" style="font-size: 14px; color: #0369a1;">Loading...</div>
        </div>
      </div>
    `;
    
    return container;
  };
  
  // Toggle switch CSS
  const toggleCSS = `
    <style>
      .mediabox-store-settings input:checked + span {
        background-color: #df3d58 !important;
      }
      .mediabox-store-settings input:checked + span + span {
        transform: translateX(20px);
      }
      .mediabox-store-settings button:hover {
        opacity: 0.9;
      }
      .mediabox-store-settings button:active {
        transform: translateY(1px);
      }
    </style>
  `;
  
  if (!document.getElementById('mediabox-toggle-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'mediabox-toggle-styles';
    styleElement.innerHTML = toggleCSS;
    document.head.appendChild(styleElement);
  }
  
  // API functions
  const loadSettings = async () => {
    try {
      const response = await fetch('/admin/settings/store');
      if (response.ok) {
        const data = await response.json();
        return data.settings;
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
    return { shop_enabled: true, show_coming_soon: false, maintenance_message: '' };
  };
  
  const saveSettings = async (settings) => {
    try {
      const response = await fetch('/admin/settings/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  };
  
  // Update UI with current settings
  const updateUI = (settings) => {
    const shopToggle = document.getElementById('shop-enabled-toggle');
    const comingSoonToggle = document.getElementById('coming-soon-toggle');
    const maintenanceMessage = document.getElementById('maintenance-message');
    const statusText = document.getElementById('status-text');
    
    if (shopToggle) shopToggle.checked = settings.shop_enabled;
    if (comingSoonToggle) comingSoonToggle.checked = settings.show_coming_soon;
    if (maintenanceMessage) maintenanceMessage.value = settings.maintenance_message || '';
    
    if (statusText) {
      const shopStatus = settings.shop_enabled ? 'Enabled' : 'Disabled';
      const comingSoonStatus = settings.show_coming_soon ? 'Active' : 'Inactive';
      statusText.innerHTML = `Shop: <strong>${shopStatus}</strong> | Coming Soon: <strong>${comingSoonStatus}</strong>`;
    }
  };
  
  // Initialize store toggle
  const initializeStoreToggle = async () => {
    // Try to find existing settings page to inject into
    let targetContainer = document.querySelector('[class*="settings"]') || 
                         document.querySelector('main') || 
                         document.body;
    
    // If we're on the settings page, inject at the top
    if (window.location.pathname.includes('/settings')) {
      const storeToggle = createStoreToggle();
      if (targetContainer.firstChild) {
        targetContainer.insertBefore(storeToggle, targetContainer.firstChild);
      } else {
        targetContainer.appendChild(storeToggle);
      }
      
      // Load current settings
      const settings = await loadSettings();
      updateUI(settings);
      
      // Bind event handlers
      const saveButton = document.getElementById('save-store-settings');
      const refreshButton = document.getElementById('refresh-store-settings');
      
      if (saveButton) {
        saveButton.addEventListener('click', async () => {
          const shopEnabled = document.getElementById('shop-enabled-toggle').checked;
          const comingSoon = document.getElementById('coming-soon-toggle').checked;
          const maintenance = document.getElementById('maintenance-message').value;
          
          const newSettings = {
            shop_enabled: shopEnabled,
            show_coming_soon: comingSoon,
            maintenance_message: maintenance
          };
          
          saveButton.textContent = 'Saving...';
          const success = await saveSettings(newSettings);
          
          if (success) {
            updateUI(newSettings);
            saveButton.textContent = 'Saved!';
            setTimeout(() => saveButton.textContent = 'Save Settings', 2000);
          } else {
            saveButton.textContent = 'Error - Try Again';
            setTimeout(() => saveButton.textContent = 'Save Settings', 2000);
          }
        });
      }
      
      if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
          refreshButton.textContent = 'Loading...';
          const settings = await loadSettings();
          updateUI(settings);
          refreshButton.textContent = 'Refreshed!';
          setTimeout(() => refreshButton.textContent = 'Refresh', 2000);
        });
      }
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStoreToggle);
  } else {
    initializeStoreToggle();
  }
  
  // Also initialize on route changes (for SPA)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (lastPath !== window.location.pathname) {
      lastPath = window.location.pathname;
      setTimeout(initializeStoreToggle, 500);
    }
  }, 1000);
})();
