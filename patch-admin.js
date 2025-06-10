const fs = require("fs");

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

////////////////////////////// customizations /////////////////////////////

// This is where you can add your customizations following the examples from the article
// Currently, no customizations are applied - this is just the framework

console.log("Medusa Admin patch script - framework ready for customizations");

// Example customizations (commented out for now):
// 
// 1) Welcome to Medusa -> Welcome to Marketplace
// const CHUNK_1 = findChunkFileByContainingText("Welcome to Medusa");
// if (CHUNK_1) {
//   let lines = readFileAsLines(CHUNK_1);
//   for (let i = 0; i < lines.length; i++) {
//     lines[i] = lines[i].replace(/Welcome to Medusa/g, "Welcome to Marketplace");
//   }
//   writeFile(lines, CHUNK_1);
// }

// 2) Hide avatar logo on login page
// const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
// lines = readFileAsLines(LOGIN_PATH);
// lines = removeOccurrence(lines, "AvatarBox");
// writeFile(lines, LOGIN_PATH);

// 3) Hide avatar logo on reset password page
// const REST_PASSWORD_PATH = findFilePathByNamePattern("reset-password-", ".mjs");
// lines = readFileAsLines(REST_PASSWORD_PATH);
// lines = removeOccurrence(lines, "LogoBox");
// writeFile(lines, REST_PASSWORD_PATH);

// 4) Hide documentation and changelog links from menu
// const APP_MJS_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/app.mjs`;
// lines = readFileAsLines(APP_MJS_PATH);
// lines.forEach((line, index) => {
//   if (line.includes("app.menus.user.documentation")) {
//     lines[index - 3] = "";
//     lines[index - 2] = "";
//     lines[index - 1] = "";
//     lines[index] = "";
//     lines[index + 1] = "";
//   }
//
//   if (line.includes("app.menus.user.changelog")) {
//     lines[index - 2] = "";
//     lines[index - 1] = "";
//     lines[index] = "";
//     lines[index + 1] = "";
//   }
// });
// writeFile(lines, APP_MJS_PATH);

// Reset Vite cache (uncomment when customizations are applied)
// const VITE_CACHE_PATH = `${__dirname}/node_modules/@medusajs/admin-bundler/node_modules/.vite`;
// if (fs.existsSync(VITE_CACHE_PATH)) {
//   fs.rmSync(VITE_CACHE_PATH, { recursive: true, force: true });
//   console.log("Vite cache cleared successfully.");
// } else {
//   console.log("Vite cache directory not found.");
// }
