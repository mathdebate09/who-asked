import { expect, test, describe } from 'vitest'
import { whoAsked, getRandomText, getRandomImage, getRandomGif, text, image, gif } from '../src'
import { Text, Media } from '../types/index'

describe('whoAsked', () => {
	test('should return Text when type is "text"', () => {
		const result = whoAsked('text')
		expect(result).toHaveProperty('text')
		expect(result).toHaveProperty('context')
		expect(Array.isArray((result as Text).context)).toBe(true)
	})

	test('should return Media when type is "image"', () => {
		const result = whoAsked('image')
		expect(result).toHaveProperty('uri')
		expect(result).toHaveProperty('tags')
		expect(result).toHaveProperty('type')
		expect((result as Media).type).toBe('image')
	})

	test('should return Media when type is "img"', () => {
		const result = whoAsked('img')
		expect(result).toHaveProperty('uri')
		expect(result).toHaveProperty('tags')
		expect((result as Media).type).toBe('image')
	})

	test('should return Media when type is "gif"', () => {
		const result = whoAsked('gif')
		expect(result).toHaveProperty('uri')
		expect(result).toHaveProperty('tags')
		expect((result as Media).type).toBe('gif')
	})

	test('should handle case insensitive types', () => {
		const textResult = whoAsked('TEXT')
		const imageResult = whoAsked('IMAGE')
		const gifResult = whoAsked('GIF')

		expect(textResult).toHaveProperty('text')
		expect(imageResult).toHaveProperty('uri')
		expect(gifResult).toHaveProperty('uri')
	})

	test('should throw error for invalid type', () => {
		expect(() => whoAsked('invalid')).toThrow('Invalid type: invalid. Valid types are: text, image, img, gif')
	})

	test('should return filtered text when params match context', () => {
		const result = whoAsked('text', ['404'])
		expect(result).toHaveProperty('text')
		expect((result as Text).context.some(ctx => ctx.includes('404'))).toBe(true)
	})

	test('should return filtered image when params match tags', () => {
		const result = whoAsked('image', ['cat'])
		expect(result).toHaveProperty('uri')
		expect((result as Media).tags.some(tag => tag.includes('cat'))).toBe(true)
	})

	test('should return filtered gif when params match tags', () => {
		const result = whoAsked('gif', ['search'])
		expect(result).toHaveProperty('uri')
		expect((result as Media).tags.some(tag => tag.includes('search'))).toBe(true)
	})

	test('should return random when params do not match any content', () => {
		const textResult = whoAsked('text', ['nonexistent_param'])
		expect(textResult).toHaveProperty('text')
		expect(textResult).toHaveProperty('context')

		const imageResult = whoAsked('image', ['nonexistent_param'])
		expect(imageResult).toHaveProperty('uri')
		expect(imageResult).toHaveProperty('tags')
		expect((imageResult as Media).type).toBe('image')

		const gifResult = whoAsked('gif', ['nonexistent_param'])
		expect(gifResult).toHaveProperty('uri')
		expect(gifResult).toHaveProperty('tags')
		expect((gifResult as Media).type).toBe('gif')
	})

	test('should handle case insensitive tag matching', () => {
		const result = whoAsked('image', ['CAT'])
		expect(result).toHaveProperty('uri')
		expect((result as Media).tags.some(tag => tag.toLowerCase().includes('cat'))).toBe(true)
	})

	test('should handle multiple params with OR logic', () => {
		const result = whoAsked('text', ['404', 'playful'])
		expect(result).toHaveProperty('text')
		const context = (result as Text).context
		expect(context.some(ctx => ctx.includes('404') || ctx.includes('playful'))).toBe(true)
	})

	test('should handle empty params array', () => {
		const result = whoAsked('text', [])
		expect(result).toHaveProperty('text')
		expect(result).toHaveProperty('context')
	})
})

describe('Utility Functions', () => {
	describe('getRandomText', () => {
		test('should return a valid Text object', () => {
			const result = getRandomText()
			expect(result).toHaveProperty('text')
			expect(result).toHaveProperty('context')
			expect(typeof result.text).toBe('string')
			expect(Array.isArray(result.context)).toBe(true)
		})

		test('should return different results on multiple calls', () => {
			const results = new Set()
			for (let i = 0; i < 50; i++) {
				results.add(getRandomText().text)
			}
			expect(results.size).toBeGreaterThan(1)
		})
	})

	describe('getRandomImage', () => {
		test('should return a valid Media object with type image', () => {
			const result = getRandomImage()
			expect(result).toHaveProperty('uri')
			expect(result).toHaveProperty('tags')
			expect(result).toHaveProperty('type')
			expect(result).toHaveProperty('width')
			expect(result).toHaveProperty('height')
			expect(result.type).toBe('image')
			expect(typeof result.uri).toBe('string')
			expect(Array.isArray(result.tags)).toBe(true)
		})

		test('should return different results on multiple calls', () => {
			const results = new Set()
			for (let i = 0; i < 30; i++) {
				results.add(getRandomImage().uri)
			}
			expect(results.size).toBeGreaterThan(1)
		})
	})

	describe('getRandomGif', () => {
		test('should return a valid Media object with type gif', () => {
			const result = getRandomGif()
			expect(result).toHaveProperty('uri')
			expect(result).toHaveProperty('tags')
			expect(result).toHaveProperty('type')
			expect(result).toHaveProperty('width')
			expect(result).toHaveProperty('height')
			expect(result.type).toBe('gif')
			expect(typeof result.uri).toBe('string')
			expect(Array.isArray(result.tags)).toBe(true)
		})

		test('should return different results on multiple calls', () => {
			const results = new Set()
			for (let i = 0; i < 30; i++) {
				results.add(getRandomGif().uri)
			}
			expect(results.size).toBeGreaterThan(1)
		})
	})

	describe('text filtering', () => {
		test('should return filtered text when params match context', () => {
			const result = text(['404'])
			expect(result).toHaveProperty('text')
			expect((result as Text).context.some(ctx => ctx.includes('404'))).toBe(true)
		})

		test('should return random text when no params match', () => {
			const result = text(['xyz123nonexistent'])
			expect(result).toHaveProperty('text')
			expect(result).toHaveProperty('context')
		})

		test('should handle case insensitive matching', () => {
			const result = text(['PLAYFUL'])
			expect(result).toHaveProperty('text')
			expect((result as Text).context.some(ctx => ctx.toLowerCase().includes('playful'))).toBe(true)
		})

		test('should handle multiple params with OR logic', () => {
			const result = text(['404', 'playful'])
			expect(result).toHaveProperty('text')
			const context = (result as Text).context
			expect(context.some(ctx => ctx.includes('404') || ctx.includes('playful'))).toBe(true)
		})

		test('should handle empty params array', () => {
			const result = text([])
			expect(result).toHaveProperty('text')
			expect(result).toHaveProperty('context')
		})
	})

	describe('image filtering', () => {
		test('should return filtered image when params match tags', () => {
			const result = image(['cat'])
			expect(result).toHaveProperty('uri')
			expect((result as Media).tags.some(tag => tag.includes('cat'))).toBe(true)
		})

		test('should return random image when no params match', () => {
			const result = image(['xyz123nonexistent'])
			expect(result).toHaveProperty('uri')
			expect(result).toHaveProperty('tags')
			expect((result as Media).type).toBe('image')
		})

		test('should handle case insensitive tag matching', () => {
			const result = image(['CAT'])
			expect(result).toHaveProperty('uri')
			expect((result as Media).tags.some(tag => tag.toLowerCase().includes('cat'))).toBe(true)
		})

		test('should handle bidirectional matching', () => {
			const result = image(['amogus'])
			expect(result).toHaveProperty('uri')
			expect((result as Media).tags.some(tag => 
				tag.toLowerCase().includes('amogus') || 'amogus'.includes(tag.toLowerCase())
			)).toBe(true)
		})

		test('should handle empty params array', () => {
			const result = image([])
			expect(result).toHaveProperty('uri')
			expect(result).toHaveProperty('tags')
			expect((result as Media).type).toBe('image')
		})
	})

	describe('gif filtering', () => {
		test('should return filtered gif when params match tags', () => {
			const result = gif(['search'])
			expect(result).toHaveProperty('uri')
			expect((result as Media).tags.some(tag => tag.includes('search'))).toBe(true)
		})

		test('should return random gif when no params match', () => {
			const result = gif(['xyz123nonexistent'])
			expect(result).toHaveProperty('uri')
			expect(result).toHaveProperty('tags')
			expect((result as Media).type).toBe('gif')
		})

		test('should handle case insensitive tag matching', () => {
			const result = gif(['SEARCH'])
			expect(result).toHaveProperty('uri')
			expect((result as Media).tags.some(tag => tag.toLowerCase().includes('search'))).toBe(true)
		})

		test('should handle empty params array', () => {
			const result = gif([])
			expect(result).toHaveProperty('uri')
			expect(result).toHaveProperty('tags')
			expect((result as Media).type).toBe('gif')
		})
	})

	describe('Edge Cases', () => {
		test('should handle special characters and whitespace in params', () => {
			const specialResult = whoAsked('text', ['404-not-found'])
			expect(specialResult).toHaveProperty('text')
			expect(specialResult).toHaveProperty('context')

			const whitespaceResult = whoAsked('text', [' 404 '])
			expect(whitespaceResult).toHaveProperty('text')
			expect(whitespaceResult).toHaveProperty('context')
		})

		test('should handle very long param strings', () => {
			const longParam = 'a'.repeat(1000)
			const result = whoAsked('text', [longParam])
			expect(result).toHaveProperty('text')
			expect(result).toHaveProperty('context')
		})

		test('should handle undefined params gracefully', () => {
			const result = whoAsked('text', undefined)
			expect(result).toHaveProperty('text')
			expect(result).toHaveProperty('context')
		})
	})
})