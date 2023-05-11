/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: [import("prettier-plugin-tailwindcss")],
};

