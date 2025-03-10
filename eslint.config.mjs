import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ),
  {
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable the rule for no-explicit-any
      "@typescript-eslint/no-unused-vars": "warn", // Change no-unused-vars to a warning
      "react-hooks/exhaustive-deps": "warn", // Change missing dependencies in useEffect to a warning
      "@next/next/no-img-element": "warn" // Change no-img-element to a warning
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];

export default eslintConfig;