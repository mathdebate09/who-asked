import { whoAsked } from '../src'

test('returns expected string', () => {
	expect(whoAsked('Jay')).toBe('Jay? Nobody asked.')
})
