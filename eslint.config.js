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
                ["env", { app: "${from.app}" }],
                // the core can depend on itself (within a single app)
                ["core", { app: "${from.app}" }],
                ["lib-api"], // core can depend on the public API of a library
              ],
            },
            {
              from: "ui",
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["ui", { app: "${from.app}" }],
              ],
            },
            {
              from: "layout",
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                ["ui-api", { app: "${from.app}" }],
                ["pattern-api", { app: "${from.app}" }],
                ["layout", { app: "${from.app}" }],
                ["domain-routes", { app: "${from.app}" }],
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
              ],
            },
            {
              from: ["pattern"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                ["ui-api", { app: "${from.app}" }],
                ["pattern", { app: "${from.app}" }],
              ],
            },
            {
              from: ["domain-routes"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "domain-feature",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
                [
                  "domain-routes",
                  {
                    app: "${from.app}",
                    domain: "!${from.domain}",
                  },
                ],
                [
                  "domain-data-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
                [
                  "domain-infrastructure-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-infrastructure-api"],
              allow: [
                [
                  "domain-infrastructure-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-infrastructure"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "domain-infrastructure",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-data-api"],
              allow: [
                [
                  "domain-data-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-data"],
              allow: [
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "domain-data",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
                [
                  "domain-infrastructure-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-feature"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "ui-api",
                  {
                    app: "${from.app}",
                  },
                ],
                ["pattern-api", { app: "${from.app}" }],
                [
                  "domain-feature",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                    feature: "${from.feature}",
                  },
                ],
                [
                  "domain-presentation-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
                [
                  "domain-data-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-presentation-api"],
              allow: [
                [
                  "domain-presentation-api",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
              ],
            },
            {
              from: ["domain-presentation"],
              allow: [
                ["env", { app: "${from.app}" }],
                ["ui", { app: "${from.app}" }],
                [
                  "domain-presentation",
                  {
                    app: "${from.app}",
                    domain: "${from.domain}",
                  },
                ],
                [
                  "ui-api",
                  {
                    app: "${from.app}",
                  },
                ],
              ],
            },
            {
              from: ["lib-api"],
              allow: [["lib", { app: "${from.lib}" }]],
            },
            {
              from: ["lib"],
              allow: [["lib", { app: "${from.lib}" }]],
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
          prefix: "myOrg",
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
        {
          type: "env",
          pattern: "environments",
          basePattern: "projects/**/src",
          baseCapture: ["app"],
        },
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
          type: "ui-api",
          mode: "file",
          pattern: "ui/public-api.ts",
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "ui",
          pattern: "ui",
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
          type: "pattern-api",
          mode: "file",
          pattern: "pattern/public-api.ts",
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "pattern",
          pattern: "pattern",
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-routes", // distinction between routes and implementation; will be important for the rules
          mode: "file",
          pattern: "domains/*/api/*.routes.ts",
          capture: ["domain"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-feature",
          pattern: "domains/*/feat-(*)",
          capture: ["domain", "feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-presentation-api",
          mode: "file",
          pattern: "domains/*/presentation/public-api.ts",
          capture: ["domain"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-presentation",
          pattern: "domains/*/presentation",
          capture: ["domain"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-data-api",
          mode: "file",
          pattern: "domains/*/data/public-api.ts",
          capture: ["domain"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-data",
          pattern: "domains/*/data",
          capture: ["domain"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-infrastructure-api",
          mode: "file",
          pattern: "domains/*/infrastructure/public-api.ts",
          capture: ["domain"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "domain-infrastructure",
          pattern: "domains/*/infrastructure",
          capture: ["domain"],
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
