import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path/posix'

import { exportVariable, info, setFailed } from '@actions/core'

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
		info(`package.json: ${pkg.name}@${pkg.version}`)
		exportVariable('VER', pkg.version)
		exportVariable('PACKAGE', pkg.name)
	} catch (error: any) {
		setFailed(error.message)
	}
}
