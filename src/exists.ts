import { stat } from 'fs/promises'

export async function exists(path: string) {
	try {
		const info = await stat(path)
		return info != null
	} catch {
		return false
	}
}
