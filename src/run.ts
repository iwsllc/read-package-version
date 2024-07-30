import { exportVariable, setFailed, info } from '@actions/core'
import { readFile } from 'fs/promises'
import { resolve } from 'path/posix'
import { exists } from './exists.js'
import { getInputs } from './getInputs.js'

export async function run() {
	try {
		const { repositoryPath, workspace } = getInputs()

		info(`workspace: ${workspace}`)
		const projectPath = resolve(repositoryPath, workspace, 'package.json') // relative path from working dir to package.json

		if (!(await exists(projectPath))) throw new Error(`package.json not found at ${projectPath}`)
		const contents = await readFile(projectPath, 'utf8')
		const pkg = JSON.parse(contents)
		exportVariable('VER', pkg.version)
		exportVariable('PACKAGE', pkg.name)
	} catch (error: any) {
		setFailed(error.message)
	}
}
