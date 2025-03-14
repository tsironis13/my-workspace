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
              from: "ui",
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["ui", { app: "${from.app}" }],
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
              from: ["subfeature"],
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
                [
                  "subfeature",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
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
                [
                  "sub-feature-routes",
                  { app: "${from.app}", feature: "${from.feature}" },
                ],
              ],
            },
            {
              from: ["sub-feature-routes"],
              allow: [
                ["lib-api"],
                ["env", { app: "${from.app}" }],
                ["core", { app: "${from.app}" }],
                ["pattern", { app: "${from.app}" }],
                [
                  "subfeature",
                  { app: "${from.app}", subfeature: "${from.subfeature}" },
                ],
                [
                  "sub-feature-routes",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "!${from.subfeature}",
                  },
                ],
                [
                  "feature-ui-smart",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
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
              from: ["feature-ui-dump"],
              allow: [
                ["env", { app: "${from.app}" }],
                ["ui", { app: "${from.app}" }],
                [
                  "ui-feature-dump",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                    subfeature: "${from.subfeature}",
                  },
                ],
              ],
            },
            {
              from: ["feature-ui-smart"],
              allow: [
                ["env", { app: "${from.app}" }],
                [
                  "feature-domain-application",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
                [
                  "feature-ui-smart",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
                [
                  "feature-ui-dump",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
                ],
              ],
            },
            {
              from: ["feature-domain-application"],
              allow: [
                ["env", { app: "${from.app}" }],
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
                [
                  "feature-domain-infrastructure",
                  {
                    app: "${from.app}",
                    feature: "${from.feature}",
                  },
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
      "@typescript-eslint/consistent-type-definitions": [
        "error",
        "type",
        "interface",
      ],
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
          type: "sub-feature-routes", // distinction between routes and implementation; will be important for the rules
          mode: "file",
          pattern: "feature/*/*/*.routes.ts",
          capture: ["feature", "subfeature"],
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
          type: "subfeature",
          pattern: "feature/**/(*-feature)/*",
          capture: ["feature", "subfeature"],
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
        // feature types
        {
          type: "feature-ui-smart",
          pattern: "feature-ui/smart",
          basePattern: "projects/**/src/app/feature/*",
          baseCapture: ["app", "feature"],
        },
        {
          type: "feature-ui-dump",
          pattern: "feature-ui/dump",
          basePattern: "projects/**/src/app/feature/*",
          baseCapture: ["app", "feature"],
        },
        {
          type: "feature-domain-application",
          pattern: "feature-domain/application",
          basePattern: "projects/**/src/app/feature/*",
          baseCapture: ["app", "feature"],
        },
        {
          type: "feature-domain-infrastructure",
          pattern: "feature-domain/infrastructure",
          basePattern: "projects/**/src/app/feature/*",
          baseCapture: ["app", "feature"],
        },
        // {
        //   type: "ui-dump",
        //   pattern: "ui/dump",
        //   basePattern: "projects/**/src/app",
        //   baseCapture: ["app"],
        // },

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
