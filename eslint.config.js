import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'


export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
	{
		ignores: [
			'node_modules/',
			'dist/',
			'.env',
			'.env.local',
			'.env.*.local',
			'*.log'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'semi': ['error', 'never'],
			'indent': ['error', 'tab'],
			'quotes': ['error', 'single']
		}
	}
])
