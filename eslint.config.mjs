import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import promisePlugin from 'eslint-plugin-promise'
import stylistic from '@stylistic/eslint-plugin'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'

export default [
	...tseslint.config(
		{
			ignores: ['**/node_modules/*', '**/dist/'] // global ignore with single ignore key
		},
		// all projects:
		eslint.configs.recommended,
		...tseslint.configs.recommended,

		stylistic.configs.customize({
			braceStyle: '1tbs',
			commaDangle: 'never',
			indent: 'tab',
			jsx: true,
			quotes: 'single',
			semi: false
		}),
		{
			plugins: {
				promise: promisePlugin
			},
			languageOptions: {
				ecmaVersion: 2023,
				globals: {
					...globals.node,
					...globals.es2023
				}
			},
			rules: {
				...promisePlugin.configs.recommended.rules,

				// custom rules here
				'promise/always-return': ['error', { ignoreLastCallback: true }],

				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unused-vars': ['error', {
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}]
			}
		},
		{
		// node rules
			files: ['**/*.ts'],
			// files: [],

			plugins: {
				n: nodePlugin
			},

			rules: {
				...nodePlugin.configs['flat/recommended'].rules
			}
		}
	)
]
