import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
	// import.meta.dirname is available after Node.js v20.11.0
	baseDirectory: import.meta.dirname,
});
const eslintConfig = [
	...compat.config({
		extends: "next/core-web-vitals",
		rules: {
			"react/no-unescaped-entities": "off",
			"@typescript-eslint/quotes": "off",
			quotes: [0],
			avoidEscape: 0,
			allowTemplateLiterals: 0,
			"no-useless-escape": 0,
		},
	}),
];
export default eslintConfig;
