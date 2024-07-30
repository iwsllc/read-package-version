import * as core from '@actions/core'
import * as getInputs from './getInputs.js'
import { run } from './run.js'

vi.mock('@actions/core')
vi.mock('./getInputs.js', () => ({ getInputs: () => ({ repositoryPath: './src/__mocks__', workspace: './test-project' }) }))

describe('run', () => {
	it('happy path', async () => {
		const spy = vi.spyOn(core, 'exportVariable')
		try {
			await run()
		} catch (err) {
			expect(err).not.to.be.ok
		}

		expect(spy).toHaveBeenCalledWith('VER', '1.0.0')
		expect(spy).toHaveBeenCalledWith('PACKAGE', 'test-project')
	})

	it('missing package.json', async () => {
		const spy = vi.spyOn(core, 'exportVariable')
		const spySetFailed = vi.spyOn(core, 'setFailed')
		vi.spyOn(getInputs, 'getInputs').mockReturnValue({ repositoryPath: '.', workspace: './non-existant' })
		try {
			await run()
		} catch (err) {
			expect(err).to.be.ok
		}

		expect(spy).not.toHaveBeenCalled()
		expect(spySetFailed).toHaveBeenCalledWith(expect.stringMatching(/^package.json not found at .*?\/non-existant\/package\.json$/))
	})
})
