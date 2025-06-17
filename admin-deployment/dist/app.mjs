import {
  DashboardApp
} from "./chunk-J2YTAFBQ.mjs";
import "./chunk-NQIC7ZFS.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-2VTICXJR.mjs";
import "./chunk-D3YQN7HV.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-GWO5QQQW.mjs";
import "./chunk-MNXC6Q4F.mjs";
import "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-XKXNQ2KV.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-67ORSRVT.mjs";
import "./chunk-OBQI23QM.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/app.tsx
import displayModule from "virtual:medusa/displays";
import formModule from "virtual:medusa/forms";
import menuItemModule from "virtual:medusa/menu-items";
import routeModule from "virtual:medusa/routes";
import widgetModule from "virtual:medusa/widgets";
import { jsx } from "react/jsx-runtime";
var localPlugin = {
  widgetModule,
  routeModule,
  displayModule,
  formModule,
  menuItemModule
};
function App({ plugins = [] }) {
  const app = new DashboardApp({
    plugins: [localPlugin, ...plugins]
  });
  return /* @__PURE__ */ jsx("div", { children: app.render() });
}
var app_default = App;
export {
  app_default as default
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
    // Always try to inject on any page, but prioritize settings pages
    let targetContainer = document.querySelector('main') || 
                         document.querySelector('[class*="content"]') ||
                         document.querySelector('body > div') ||
                         document.body;
    
    // Always show the toggle (not just on settings pages)
    if (targetContainer && !document.getElementById('mediabox-store-toggle')) {
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
  
  // Debug logging
  console.log('Mediabox Store Toggle: Script loaded');
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Mediabox Store Toggle: DOM loaded, initializing...');
      initializeStoreToggle();
    });
  } else {
    console.log('Mediabox Store Toggle: DOM ready, initializing...');
    initializeStoreToggle();
  }
  
  // Also initialize on route changes (for SPA) - more aggressive
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (lastPath !== window.location.pathname) {
      lastPath = window.location.pathname;
      console.log('Mediabox Store Toggle: Route change detected, reinitializing...');
      setTimeout(initializeStoreToggle, 500);
    }
  }, 1000);
  
  // Also try every 5 seconds if not present (aggressive fallback)
  setInterval(() => {
    if (!document.getElementById('mediabox-store-toggle')) {
      console.log('Mediabox Store Toggle: Not found, retrying...');
      initializeStoreToggle();
    }
  }, 5000);
})();
