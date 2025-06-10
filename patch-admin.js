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

try {
  // 1) Welcome to Medusa -> Welcome to The Mediabox Global Ecommerce Store Admin Portal
  const CHUNK_1 = findChunkFileByContainingText("Welcome to Medusa");
  if (CHUNK_1) {
    let lines = readFileAsLines(CHUNK_1);
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/Welcome to Medusa/g, "Welcome to The Mediabox Global Ecommerce Store Admin Portal");
    }
    writeFile(lines, CHUNK_1);
    console.log("✓ Updated welcome text");
  }

  // 2) Replace logo on login page
  const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
  const loginLogoBase64 = imageToBase64(path.join(__dirname, 'assets', 'logo-login.png'));
  
  if (loginLogoBase64) {
    let lines = readFileAsLines(LOGIN_PATH);
    
    // Find and replace the AvatarBox/LogoBox with custom logo
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("AvatarBox") || lines[i].includes("LogoBox")) {
        // Replace with custom logo component
        lines[i] = lines[i].replace(
          /jsx\d*\("div",{className:"[^"]*avatar[^"]*"[^}]*}\)/g,
          `jsx14("div",{className:"flex justify-center mb-6",children:jsx14("img",{src:"${loginLogoBase64}",alt:"Mediabox",className:"h-16 w-auto"})})`
        );
        lines[i] = lines[i].replace(
          /jsx\d*\(AvatarBox[^)]*\)/g,
          `jsx14("div",{className:"flex justify-center mb-6",children:jsx14("img",{src:"${loginLogoBase64}",alt:"Mediabox",className:"h-16 w-auto"})})`
        );
      }
    }
    writeFile(lines, LOGIN_PATH);
    console.log("✓ Updated login page logo");
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

  // 5) Update favicon
  const faviconPath = path.join(__dirname, 'assets', 'favicon.ico');
  const distPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;
  
  if (fs.existsSync(faviconPath)) {
    // Copy favicon to dist folder
    fs.copyFileSync(faviconPath, path.join(distPath, 'favicon.ico'));
    
    // Update index.html to use new favicon
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      indexContent = indexContent.replace(
        /<link[^>]*rel="icon"[^>]*>/g,
        '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
      );
      fs.writeFileSync(indexPath, indexContent);
      console.log("✓ Updated favicon");
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
