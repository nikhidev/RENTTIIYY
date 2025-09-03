import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Keep Next.js defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom overrides
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/prisma/generated/**", // ✅ ignore Prisma generated files
      "**/.prisma/**",          // ✅ also ignore .prisma cache folder
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", 
          varsIgnorePattern: "^(ExtArgs)$", // ✅ allow ExtArgs from Prisma
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off", // ✅ silence `{}` type warnings
      "@typescript-eslint/no-explicit-any": "warn",     // ✅ only warn on `any`, not error
    },
  },
];

export default eslintConfig;

