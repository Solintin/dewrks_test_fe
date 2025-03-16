const fs = require("fs");
const path = require("path");

// Configuration
const PAGES_DIR = "./src/pages";
const ROUTES_FILE = "./src/routes.tsx";
const DYNAMIC_PARAM_REGEX = /\[(.*?)\]/g;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertDynamicPathToReactRoute(pathSegment) {
  // Convert [id] to :id, [slug] to :slug, etc.
  return pathSegment.replace(DYNAMIC_PARAM_REGEX, ":$1");
}

function generateComponentName(pagePath) {
  // Convert path segments to PascalCase and remove dynamic params
  return pagePath
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      // Remove dynamic parameter brackets and capitalize
      const cleanSegment = segment.replace(DYNAMIC_PARAM_REGEX, "$1");
      return capitalizeFirstLetter(cleanSegment);
    })
    .join("");
}

function generateRoutePath(pagePath) {
  // Convert file path to URL path with support for dynamic routes
  return (
    "/" +
    pagePath
      .split("/")
      .filter(Boolean)
      .map((segment) => convertDynamicPathToReactRoute(segment))
      .join("/")
      .replace(/\/page$/, "")
  );
}

function findPages(dir, pages = new Map()) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(PAGES_DIR, fullPath);

    if (entry.isDirectory()) {
      findPages(fullPath, pages);
    } else if (entry.name === "page.jsx" || entry.name === "page.tsx") {
      // Store full path info to handle potential layout files later
      pages.set(relativePath, {
        fullPath,
        relativePath,
        isDynamic: DYNAMIC_PARAM_REGEX.test(relativePath),
      });
    }
  }

  return pages;
}

function sortRoutes(routes) {
  // Sort routes so that static routes come before dynamic routes
  return routes.sort((a, b) => {
    const aDynamic = a.includes(":");
    const bDynamic = b.includes(":");
    if (aDynamic && !bDynamic) return 1;
    if (!aDynamic && bDynamic) return -1;
    return a.length - b.length; // Shorter paths come first
  });
}

function generateRoutes() {
  const pages = findPages(PAGES_DIR);
  const imports = new Set();
  const routeDefinitions = new Set();

  pages.forEach((pageInfo, pagePath) => {
    const componentName = generateComponentName(path.dirname(pagePath));
    const routePath = generateRoutePath(path.dirname(pagePath));
    const importPath = `./pages/${path.dirname(pagePath)}/page`;

    imports.add(`import ${componentName} from "${importPath}";`);

    // Add comments for dynamic routes
    const routeComment = pageInfo.isDynamic
      ? `            {/* Dynamic route: ${routePath} */}`
      : "";

    routeDefinitions.add(`${routeComment}
            <Route 
              path="${routePath}" 
              element={<${componentName} />} 
            />`);
  });

  const sortedRoutes = sortRoutes([...routeDefinitions]);

  const template = `import React from "react";
import { Route, useLocation, Routes } from "react-router-dom";
${[...imports].sort().join("\n")}

const PagesRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
${sortedRoutes.join("\n")}
        </Routes>
    );
};

export default PagesRoutes;
`;

  // Ensure the directory exists
  const routesDir = path.dirname(ROUTES_FILE);
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
  }

  fs.writeFileSync(ROUTES_FILE, template);
  console.log("✨ Routes generated successfully!");

  // Log summary
  const dynamicRoutes = [...pages.values()].filter((p) => p.isDynamic).length;
  console.log(`📊 Generated ${pages.size} routes (${dynamicRoutes} dynamic)`);
}

try {
  generateRoutes();
} catch (error) {
  console.error("❌ Error generating routes:", error);
  process.exit(1);
}
