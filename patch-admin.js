const fs = require("fs");
const path = require("path");

////////////////////////////// utils /////////////////////////////

const findFilePathByNamePattern = (filePattern, fileExtension) => {
  const dirPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;

  // Read the list of files in the directory
  const files = fs.readdirSync(dirPath);

  // Find the first file that matches the pattern
  const fileName = files.find(
    (file) => file.startsWith(filePattern) && file.endsWith(fileExtension)
  );

  if (!fileName) {
    throw new Error(`No file found matching pattern: ${filePattern}`);
  }

  const filePath = `${dirPath}/${fileName}`;

  return filePath;
};

function findChunkFileByContainingText(text) {
  try {
    const dirPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;

    // Read the list of files in the directory
    const files = fs.readdirSync(dirPath);

    // Filter out files that match the pattern chunk-*.mjs
    const targetFiles = files.filter(
      (file) => file.startsWith("chunk-") && file.endsWith(".mjs")
    );

    // Loop over the matching files and check their content
    for (const fileName of targetFiles) {
      const filePath = `${dirPath}/${fileName}`;
      const content = fs.readFileSync(filePath, "utf8");

      // If the file contains the target string, print its name
      if (content.includes(text)) {
        console.log(`Found '${text}' in file: ${filePath}`);
        return filePath;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const readFileAsLines = (filePath) => {
  // Read the file content
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Split the file into lines
  const lines = fileContent.split("\n");

  return lines;
};

const removeOccurrence = (lines, value, skipFirst = true) => {
  const updatedLines = lines.reduce(
    (acc, line) => {
      if (line.includes(value)) {
        if (acc.foundFirst) {
          acc.result.push(""); // Change only after the first occurrence
        } else {
          acc.foundFirst = true; // Skip the first occurrence
          acc.result.push(line); // Keep the first occurrence as it is
        }
      } else {
        acc.result.push(line); // Keep other lines unchanged
      }
      return acc;
    },
    { result: [], foundFirst: !skipFirst }
  ).result;

  return updatedLines;
};

const writeFile = (lines, filePath) => {
  // Write the modified content back to the file
  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  console.log(`Updated ${filePath} successfully.`);
};

// Helper function to convert image to base64
const imageToBase64 = (imagePath) => {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    const extension = path.extname(imagePath).substring(1);
    return `data:image/${extension};base64,${base64String}`;
  } catch (error) {
    console.error(`Error converting image to base64: ${error}`);
    return null;
  }
};

////////////////////////////// customizations /////////////////////////////

console.log("Applying Mediabox branding customizations...");
console.log("Working directory:", __dirname);

try {
  // 1) Welcome to Medusa -> Welcome to The Mediabox Global Ecommerce Store Admin Portal
  console.log("\n1. Searching for welcome text...");
  const CHUNK_1 = findChunkFileByContainingText("Welcome to Medusa");
  if (CHUNK_1) {
    let lines = readFileAsLines(CHUNK_1);
    let replacementCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("Welcome to Medusa")) {
        lines[i] = lines[i].replace(/Welcome to Medusa/g, "Welcome to The Mediabox Global Ecommerce Store Admin Portal");
        replacementCount++;
      }
    }
    writeFile(lines, CHUNK_1);
    console.log(`✓ Updated welcome text (${replacementCount} replacements)`);
  } else {
    console.log("⚠️  Could not find chunk file containing 'Welcome to Medusa'");
  }

  // 2) Replace logo on login page - More aggressive approach
  console.log("\n2. Updating login page logo...");
  try {
    const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
    console.log("Found login file:", LOGIN_PATH);
    
    const loginLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-login.png'));
    
    if (loginLogoBase64) {
      console.log("✓ Logo converted to base64");
      let content = fs.readFileSync(LOGIN_PATH, 'utf8');
      let originalContent = content;
      
      // Create a custom logo component that we'll inject
      const customLogoComponent = `jsx14("div",{className:"flex justify-center mb-6",children:jsx14("img",{src:"${loginLogoBase64}",alt:"Mediabox",className:"h-20 w-auto"})})`;
      
      // Pattern 1: Replace AvatarBox components
      content = content.replace(/jsx\d*\(AvatarBox[^)]*\)/g, customLogoComponent);
      
      // Pattern 2: Replace LogoBox components
      content = content.replace(/jsx\d*\(LogoBox[^)]*\)/g, customLogoComponent);
      
      // Pattern 3: Replace any div with avatar-related classes
      content = content.replace(
        /jsx\d*\("div",\s*{\s*className:\s*"[^"]*(?:avatar|logo)[^"]*"[^}]*}\)/g, 
        customLogoComponent
      );
      
      // Pattern 4: Look for specific Medusa logo references
      content = content.replace(/jsx\d*\([^,]*MedusaLogo[^)]*\)/g, customLogoComponent);
      
      // Pattern 5: Replace svg elements that might be logos
      content = content.replace(
        /jsx\d*\("svg",\s*{[^}]*(?:width:\s*"40"|height:\s*"40")[^}]*}\)/g,
        customLogoComponent
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(LOGIN_PATH, content);
        console.log("✓ Updated login page logo");
      } else {
        console.log("⚠️  No logo patterns found in login page");
        
        // Try to find any jsx element that might be the logo container
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('login') && lines[i].includes('jsx')) {
            console.log(`  Line ${i}: ${lines[i].substring(0, 100)}...`);
          }
        }
      }
    } else {
      console.log("❌ Failed to convert logo to base64");
    }
  } catch (error) {
    console.log("❌ Error updating login page:", error.message);
  }

  // 2b) Alternative approach - inject CSS to hide default logo and show custom one
  console.log("\n2b. Injecting CSS for login page branding...");
  try {
    const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
    let content = fs.readFileSync(LOGIN_PATH, 'utf8');
    
    const loginLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-login.png'));
    
    if (loginLogoBase64 && !content.includes('mediabox-login-styles')) {
      // Inject CSS at the beginning of the file
      const customLoginCSS = `
// Inject Mediabox login styles
if (typeof document !== 'undefined' && !document.getElementById('mediabox-login-styles')) {
  const style = document.createElement('style');
  style.id = 'mediabox-login-styles';
  style.innerHTML = \`
    /* Hide default Medusa logo */
    [class*="avatar"], [class*="logo"] {
      display: none !important;
    }
    
    /* Add Mediabox logo */
    form::before {
      content: '';
      display: block;
      width: 200px;
      height: 80px;
      margin: 0 auto 2rem;
      background-image: url('${loginLogoBase64}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  \`;
  document.head.appendChild(style);
}
`;
      
      content = customLoginCSS + '\n' + content;
      fs.writeFileSync(LOGIN_PATH, content);
      console.log("✓ Injected CSS for login page branding");
    }
  } catch (error) {
    console.log("❌ Error injecting login CSS:", error.message);
  }

  // 3) Replace logo on reset password page
  console.log("\n3. Updating reset password page logo...");
  try {
    const REST_PASSWORD_PATH = findFilePathByNamePattern("reset-password-", ".mjs");
    const loginLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-login.png'));
    
    if (loginLogoBase64) {
      let lines = readFileAsLines(REST_PASSWORD_PATH);
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("LogoBox")) {
          lines[i] = lines[i].replace(
            /jsx\d*\(LogoBox[^)]*\)/g,
            `jsx14("div",{className:"flex justify-center mb-6",children:jsx14("img",{src:"${loginLogoBase64}",alt:"Mediabox",className:"h-16 w-auto"})})`
          );
        }
      }
      writeFile(lines, REST_PASSWORD_PATH);
      console.log("✓ Updated reset password page logo");
    }
  } catch (error) {
    console.log("❌ Error updating reset password page:", error.message);
  }

  // 4) Update header logo and apply color scheme
  const APP_MJS_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/app.mjs`;
  const headerLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-header.png'));
  
  if (headerLogoBase64) {
    let lines = readFileAsLines(APP_MJS_PATH);
    
    // Add custom CSS for Mediabox branding
    const customCSS = `
    <style>
      :root {
        --mediabox-primary: #df3d58;
        --mediabox-secondary: #d74e2f;
      }
      
      /* Update primary buttons */
      .bg-ui-button-inverted, 
      .bg-ui-button-inverted-hover:hover {
        background-color: var(--mediabox-primary) !important;
      }
      
      /* Update primary text colors */
      .text-ui-fg-interactive {
        color: var(--mediabox-primary) !important;
      }
      
      /* Update focus states */
      .focus\\:shadow-borders-interactive-with-focus:focus {
        box-shadow: 0 0 0 3px var(--mediabox-primary) !important;
      }
      
      /* Update active states */
      .bg-ui-bg-interactive {
        background-color: var(--mediabox-primary) !important;
      }
      
      /* Update header logo */
      .medusa-logo {
        display: none;
      }
    </style>
    `;
    
    // Find the main app component and inject custom styles
    for (let i = 0; i < lines.length; i++) {
      // Inject custom CSS
      if (lines[i].includes("document.head") && !lines[i].includes("mediabox-styles")) {
        lines[i] = lines[i] + `\n// Inject Mediabox styles\nconst mediaboxStyles = document.createElement('style');\nmediaboxStyles.id = 'mediabox-styles';\nmediaboxStyles.innerHTML = \`${customCSS.replace(/\n/g, '\\n')}\`;\ndocument.head.appendChild(mediaboxStyles);`;
      }
      
      // Replace header logo
      if (lines[i].includes("medusa-logo") || lines[i].includes("MedusaLogo")) {
        lines[i] = lines[i].replace(
          /jsx\d*\([^,]*MedusaLogo[^)]*\)/g,
          `jsx14("img",{src:"${headerLogoBase64}",alt:"Mediabox",className:"h-8 w-auto"})`
        );
      }
    }
    
    writeFile(lines, APP_MJS_PATH);
    console.log("✓ Updated header logo and applied color scheme");
  }

  // 5) Update favicon and inject global styles
  const faviconPath = path.join(__dirname, 'assets', 'favicon.ico');
  const distPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;
  const medusaAdminPath = `${__dirname}/.medusa/server/public/admin`;
  
  // Function to update index.html
  const updateIndexHtml = (indexPath) => {
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Update favicon
      indexContent = indexContent.replace(
        /<link[^>]*rel="icon"[^>]*>/g,
        '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
      );
      
      // Inject global Mediabox styles if not already present
      if (!indexContent.includes('mediabox-global-styles')) {
        const loginLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-login.png'));
        const headerLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-header.png'));
        
        const globalStyles = `
    <style id="mediabox-global-styles">
      :root {
        --mediabox-primary: #df3d58;
        --mediabox-secondary: #d74e2f;
      }
      
      /* Hide all default Medusa logos */
      [class*="avatar"], 
      [class*="logo"],
      svg[width="40"][height="40"],
      .medusa-logo {
        display: none !important;
      }
      
      /* Login page logo */
      form::before {
        content: '';
        display: block;
        width: 200px;
        height: 80px;
        margin: 0 auto 2rem;
        background-image: url('${loginLogoBase64}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      
      /* Header logo */
      nav [class*="logo"]::after {
        content: '';
        display: block;
        width: 150px;
        height: 40px;
        background-image: url('${headerLogoBase64}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center left;
      }
      
      /* Update primary buttons */
      .bg-ui-button-inverted, 
      .bg-ui-button-inverted-hover:hover,
      button[type="submit"] {
        background-color: var(--mediabox-primary) !important;
      }
      
      /* Update primary text colors */
      .text-ui-fg-interactive,
      a {
        color: var(--mediabox-primary) !important;
      }
      
      /* Update focus states */
      input:focus,
      button:focus,
      .focus\\:shadow-borders-interactive-with-focus:focus {
        box-shadow: 0 0 0 3px var(--mediabox-primary) !important;
        border-color: var(--mediabox-primary) !important;
      }
      
      /* Update active states */
      .bg-ui-bg-interactive {
        background-color: var(--mediabox-primary) !important;
      }
    </style>
        `;
        
        // Insert styles before closing head tag
        indexContent = indexContent.replace('</head>', globalStyles + '\n</head>');
      }
      
      fs.writeFileSync(indexPath, indexContent);
      console.log(`✓ Updated ${indexPath}`);
    }
  };
  
  if (fs.existsSync(faviconPath)) {
    // Copy favicon to dist folder
    if (fs.existsSync(distPath)) {
      fs.copyFileSync(faviconPath, path.join(distPath, 'favicon.ico'));
    }
    
    // Copy favicon to medusa admin folder
    if (fs.existsSync(medusaAdminPath)) {
      fs.copyFileSync(faviconPath, path.join(medusaAdminPath, 'favicon.ico'));
    }
    
    // Update index.html in dist folder
    const distIndexPath = path.join(distPath, 'index.html');
    updateIndexHtml(distIndexPath);
    
    // Update index.html in medusa admin folder
    const medusaIndexPath = path.join(medusaAdminPath, 'index.html');
    updateIndexHtml(medusaIndexPath);
  }

  // Reset Vite cache
  const VITE_CACHE_PATH = `${__dirname}/node_modules/@medusajs/admin-bundler/node_modules/.vite`;
  if (fs.existsSync(VITE_CACHE_PATH)) {
    fs.rmSync(VITE_CACHE_PATH, { recursive: true, force: true });
    console.log("✓ Vite cache cleared successfully");
  }

  // 6) Inject Store Toggle functionality into main app
  console.log("\n6. Injecting Store Toggle functionality...");
  try {
    // Inject directly into app.mjs for guaranteed loading
    const APP_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/app.mjs`;
    
    if (fs.existsSync(APP_PATH)) {
      let content = fs.readFileSync(APP_PATH, 'utf8');
      
      // Inject store toggle functionality if not already present
      if (!content.includes('mediabox-store-toggle')) {
        const storeToggleCode = `
// Mediabox Store Toggle Functionality
(function() {
  if (typeof document === 'undefined' || document.getElementById('mediabox-store-toggle')) return;
  
  // Create store toggle container
  const createStoreToggle = () => {
    const container = document.createElement('div');
    container.id = 'mediabox-store-toggle';
    container.className = 'mediabox-store-settings';
    container.innerHTML = \`
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
    \`;
    
    return container;
  };
  
  // Toggle switch CSS
  const toggleCSS = \`
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
  \`;
  
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
      statusText.innerHTML = \`Shop: <strong>\${shopStatus}</strong> | Coming Soon: <strong>\${comingSoonStatus}</strong>\`;
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
`;
        
        // Inject the code at the end of the file
        content = content + '\n' + storeToggleCode;
        fs.writeFileSync(APP_PATH, content);
        console.log("✓ Store toggle functionality injected into app.mjs");
      } else {
        console.log("✓ Store toggle functionality already present");
      }
    } else {
      console.log("⚠️  Could not find app.mjs file to inject store toggle");
    }
  } catch (error) {
    console.log("❌ Error injecting store toggle:", error.message);
  }

  console.log("\n✅ Mediabox branding and store toggle customizations applied successfully!");

} catch (error) {
  console.error("❌ Error applying customizations:", error);
  process.exit(1);
}
