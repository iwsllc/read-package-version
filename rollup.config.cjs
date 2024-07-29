const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonJs = require('@rollup/plugin-commonjs')
const { globSync } = require('glob')
const { join } = require('path')

const actionDirs = globSync('./actions/**/').filter(f => f !== 'actions')
const inputs = actionDirs.map(dir => ({ [dir.replace(/^actions\//i, '')]: join(dir, 'index.cjs') }))
const input = Object.assign({}, ...inputs)

module.exports = {
	input,
	output: {
		dir: 'dist',
		fileName: '[name]',
		format: 'cjs'
	},
	plugins: [nodeResolve({ preferBuiltins: true }), commonJs()]
}
