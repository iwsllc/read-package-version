import { getInputs } from './getInputs.js'

describe('getInputs', () => {
	it('should return the correct inputs', () => {
		const config = getInputs()
		expect(config).toEqual({
			repositoryPath: expect.stringMatching(/read-package-version/i),
			workspace: ''
		})
	})
})
