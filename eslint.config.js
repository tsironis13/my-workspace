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
                ["feature-routes", { app: "${from.app}" }],
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
              from: ["subfeature-ui-smart"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["ui-api", { app: "${from.app}" }],
                ["pattern-api", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "subfeature-ui-smart",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
                [
                  "subfeature-ui-presentational",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
                [
                  "subfeature-domain-api",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
                [
                  "feature-domain-api",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
              ],
            },
            {
              from: ["subfeature-ui-presentational"],
              allow: [
                ["env", { app: "${from.app}" }],
                [
                  "subfeature-ui-presentational",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
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
              from: ["subfeature-domain-application"],
              allow: [
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "subfeature-domain-application",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
                [
                  "subfeature-domain-infrastructure",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
              ],
            },
            {
              from: ["subfeature-domain-infrastructure"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "subfeature-domain-infrastructure",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
              ],
            },
            {
              from: ["subfeature-routes"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "subfeature-ui-smart",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
                [
                  "subfeature-domain-api",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
                [
                  "subfeature-routes",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "!${from.subfeature}",
                  },
                ],
              ],
            },
            {
              from: ["feature-ui-smart"],
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
                  "feature-ui-smart",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
                [
                  "feature-ui-presentational",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
                [
                  "feature-domain-api",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
              ],
            },
            {
              from: ["feature-ui-presentational"],
              allow: [
                ["env", { app: "${from.app}" }],
                ["ui", { app: "${from.app}" }],
                [
                  "feature-ui-presentational",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
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
              from: ["feature-domain-application"],
              allow: [
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "feature-domain-application",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
                [
                  "feature-domain-infrastructure",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
              ],
            },
            {
              from: ["feature-domain-infrastructure"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                [
                  "feature-domain-infrastructure",
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
                ["feature", { app: "${from.app}", feature: "${from.feature}" }],
                [
                  "feature-routes",
                  { app: "${from.app}", feature: "!${from.feature}" },
                ],
                [
                  "subfeature-routes",
                  { app: "${from.app}", feature: "${from.feature}" },
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
        // subfeature level 1 types
        {
          type: "subfeature-routes", // distinction between routes and implementation; will be important for the rules
          mode: "file",
          pattern: "feature/*/(*)-subfeature/*.routes.ts",
          capture: ["feature", "subfeature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "subfeature-ui-smart",
          pattern: "feature/*/(*)-subfeature/presentation/smart",
          capture: ["feature", "subfeature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },

        {
          type: "subfeature-ui-presentational",
          pattern: "feature/*/(*)-subfeature/presentation/presentational",
          capture: ["feature", "subfeature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "subfeature-domain-application",
          pattern: "feature/*/(*)-subfeature/domain/application",
          capture: ["feature", "subfeature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "subfeature-domain-infrastructure",
          pattern: "feature/*/(*)-subfeature/domain/infrastructure",
          capture: ["feature", "subfeature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "subfeature-domain-api",
          mode: "file",
          pattern: "feature/*/(*)-subfeature/domain/public-api.ts",
          capture: ["feature", "subfeature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        // feature types
        {
          type: "feature-routes", // distinction between routes and implementation; will be important for the rules
          mode: "file",
          pattern: "feature/*/*.feature.routes.ts",
          capture: ["feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "feature-ui-smart",
          pattern: "feature/*/presentation/smart",
          capture: ["feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "feature-ui-presentational",
          pattern: "feature/*/presentation/presentational",
          capture: ["feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "feature-domain-application",
          pattern: "feature/*/domain/application",
          capture: ["feature"],
          basePattern: "projects/**/src/app",
          baseCapture: ["app"],
        },
        {
          type: "feature-domain-infrastructure",
          pattern: "feature/*/domain/infrastructure",
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
