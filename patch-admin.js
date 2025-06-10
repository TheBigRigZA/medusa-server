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
  const REST_PASSWORD_PATH = findFilePathByNamePattern("reset-password-", ".mjs");
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
  
  if (fs.existsSync(faviconPath)) {
    // Copy favicon to dist folder
    fs.copyFileSync(faviconPath, path.join(distPath, 'favicon.ico'));
    
    // Update index.html to use new favicon and inject global styles
    const indexPath = path.join(distPath, 'index.html');
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
      console.log("✓ Updated favicon and injected global styles");
    }
  }

  // Reset Vite cache
  const VITE_CACHE_PATH = `${__dirname}/node_modules/@medusajs/admin-bundler/node_modules/.vite`;
  if (fs.existsSync(VITE_CACHE_PATH)) {
    fs.rmSync(VITE_CACHE_PATH, { recursive: true, force: true });
    console.log("✓ Vite cache cleared successfully");
  }

  console.log("\n✅ Mediabox branding customizations applied successfully!");

} catch (error) {
  console.error("❌ Error applying customizations:", error);
  process.exit(1);
}
