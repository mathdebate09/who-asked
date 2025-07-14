import {
	getRandomText, 
	getRandomImage, 
	getRandomGif, 
	text, 
	image, 
	gif 
} from './utils'
import { Text, Media } from '../types/index'

const whoAsked = (type: string, params?: string[]): Text | Media => {
	const normalizedType = type.toLowerCase()
  
	switch (normalizedType) {
	case 'text':
		return params ? text(params) : getRandomText()
    
	case 'image':
	case 'img':
		return params ? image(params) : getRandomImage()
    
	case 'gif':
		return params ? gif(params) : getRandomGif()
    
	default:
		throw new Error(`Invalid type: ${type}. Valid types are: text, image, img, gif`)
	}
}

export { whoAsked, getRandomText, getRandomImage, getRandomGif, text, image, gif }
export type { Text, Media } from '../types/index'
