const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonJs = require('@rollup/plugin-commonjs')
const { join } = require('node:path')

module.exports = {
	input: {
		'read-package-version': join(__dirname, './read-package-version/index.cjs')
	},
	output: {
		dir: 'dist',
		fileName: '[name]',
		format: 'cjs'
	},
	plugins: [nodeResolve({ preferBuiltins: true }), commonJs()]
}
