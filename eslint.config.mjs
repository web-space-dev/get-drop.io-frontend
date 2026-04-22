import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**"
  ]),
  {
    rules: {
      "react/no-unstable-nested-components": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-boolean-value": "warn",
      "react/no-array-index-key": "warn",
      "react/jsx-fragments": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  }
]);

export default eslintConfig;
