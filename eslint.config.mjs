const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
      "no-console": "warn",
    },
  },
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
