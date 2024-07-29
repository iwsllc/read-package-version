import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { exportVariable, getInput, setFailed } from '@actions/core'

function gatherVerisonAndEmit(workspace: string) {
	console.log(`workspace: ${workspace}`)
	const projectPath = join(__dirname, '../../', workspace, 'package.json') // relative path from working dir to package.json

	if (!existsSync(projectPath)) return console.log(`package.json not found at ${projectPath}`)
	const contents = readFileSync(projectPath, 'utf8')
	const pkg = JSON.parse(contents)
	exportVariable('VER', pkg.version)
	exportVariable('PACKAGE', pkg.name)
}

try {
	const workspace = getInput('workspace')
	// const workspace = process.argv[2]
	gatherVerisonAndEmit(workspace)
}
catch (error: any) {
	setFailed(error.message)
}
