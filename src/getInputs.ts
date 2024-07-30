import { getInput } from '@actions/core'
import { resolve } from 'path/posix'

export function getInputs() {
	const githubWorkspacePath = process.env['GITHUB_WORKSPACE'] ?? ''

	let repositoryPath = getInput('path') || '.'
	repositoryPath = resolve(
		githubWorkspacePath,
		repositoryPath
	)

	const workspace = getInput('workspace')

	return {
		repositoryPath,
		workspace
	}
}
