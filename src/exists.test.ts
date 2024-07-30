import { exists } from './exists.js'

describe('exists', () => {
	it('should work with valid file', async () => {
		const result = await exists('package.json')
		expect(result).toBe(true)
	})
	it('should work with missing file', async () => {
		const result = await exists('package.pink.json')
		expect(result).toBe(false)
	})
})
