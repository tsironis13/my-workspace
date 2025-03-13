// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const boundaries = require("eslint-plugin-boundaries");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      boundaries,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      boundaries.configs.strict,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "boundaries/element-types": [
        "error",
        {
          // without explicit rule, depending on (importing from) files is disallowed
          default: "disallow",
          rules: [
            {
              from: "main",
              allow: [["app", { app: "${from.app}" }]],
            },
            {
              from: "core",
              allow: [
                // the core can depend on itself (within a single app)
                ["core", { app: "${from.app}" }],
                ["lib-api"], // core can depend on the public API of a library
              ],
            },
            {
              from: "app",
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["app", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                ["layout", { app: "${from.app}" }],
                ["feature-routes", { app: "${from.app}" }],
              ],
            },
            {
              from: ["feature"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                ["ui", { app: "${from.app}" }],
                ["pattern", { app: "${from.app}" }],
                [
                  "feature",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
              ],
            },
            {
              from: ["feature-routes"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                ["pattern", { app: "${from.app}" }],
                ["feature", { app: "${from.app}", feature: "${from.feature}" }],
                [
                  "feature-routes",
                  { app: "${from.app}", feature: "!${from.feature}" },
                ],
              ],
            },
          ],
        },
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "angle-bracket",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "my-org",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "my-org",
          style: "kebab-case",
        },
      ],
    },
    settings: {
      "import/resolver": {
        // recognize both static and dynamic Typescript imports
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/ignore": [],
      "boundaries/dependency-nodes": ["import", "dynamic-import"],
      "boundaries/elements": [
        // helper types
        {
          type: "main",
          mode: "file",
          pattern: "main.ts",
          basePattern: "projects/**/src",
          baseCapture: ["app"],
        },
        {
          type: "app",
          mode: "file",
          pattern: "app(-|.)*.ts", // app-routes, app.component
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        // architecture types
        {
          type: "core",
          pattern: "core",
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "layout",
          pattern: "layout",
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "feature-routes", // distinction between routes and implementation; will be important for the rules
          mode: "file",
          pattern: "feature/*/*.routes.ts",
          capture: ["feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "feature",
          pattern: "feature/*",
          capture: ["feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },

        // library types
        {
          type: "lib-api",
          mode: "file",
          pattern: "libs/**/src/public-api.ts",
          capture: ["lib"],
        },
        {
          type: "lib",
          pattern: "libs/**/src/lib",
          capture: ["lib"],
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
