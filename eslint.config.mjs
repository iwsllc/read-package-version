import eslint from '@eslint/js'
import promisePlugin from 'eslint-plugin-promise'
import stylistic from '@stylistic/eslint-plugin'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'

export default [
	{
		ignores: ['**/node_modules/*', '**/dist/'] // global ignore with single ignore key
	},
	// all projects:
	eslint.configs.recommended,
	{
		plugins: {
			'promise': promisePlugin,
			'@stylistic': stylistic
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
			...stylistic.configs['recommended-flat'].rules,

			// custom rules here
			'promise/always-return': ['error', { ignoreLastCallback: true }],
			'no-unused-vars': ['error', {
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}],
			'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/indent-binary-ops': ['error', 'tab'],
			'@stylistic/comma-dangle': ['error', 'never']
		}
	},
	{
		// node rules
		files: ['actions/**/*'],
		// files: [],

		plugins: {
			n: nodePlugin
		},

		rules: {
			...nodePlugin.configs['flat/recommended'].rules
		}
	}
]
