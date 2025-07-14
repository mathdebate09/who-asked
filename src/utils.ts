import textJson from '../data/text.json'
import mediaJson from '../data/media.json'
import { Text, Media } from '../types/index'

const generateTagsFromUri = (uri: string): string[] => {
	const nameWithoutExtension = uri.substring(0, uri.lastIndexOf('.'))
	const tags = nameWithoutExtension.split('-').filter(tag => tag.length > 0)
  
	return tags
}

const mediaWithTags: Media[] = mediaJson.map(item => ({
	...item,
	uri: `https://ik.imagekit.io/jayowiee/who-asked-${item.type === 'image' ? 'img' : 'gif'}/${item.uri}`,
	tags: generateTagsFromUri(item.uri)
}))

const textData: Text[] = textJson
const imgData: Media[] = mediaWithTags.filter(item => item.type === 'image')
const gifData: Media[] = mediaWithTags.filter(item => item.type === 'gif')

export const getRandomText = (): Text => {
	return textData[Math.floor(Math.random() * textData.length)]
}

export const getRandomImage = (): Media => {
	return imgData[Math.floor(Math.random() * imgData.length)]
}

export const getRandomGif = (): Media => {
	return gifData[Math.floor(Math.random() * gifData.length)]
}

const matchesTags = (tags: string[], params: string[]): boolean => {
	return params.some(param => 
		tags.some(tag => 
			tag.toLowerCase().includes(param.toLowerCase()) || 
            param.toLowerCase().includes(tag.toLowerCase())
		)
	)
}

export const text = (params: string[]): Text => {
	const filtered = textData.filter(item => matchesTags(item.context, params))
	return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : getRandomText()
}

export const image = (params: string[]): Media => {
	const filtered = imgData.filter(item => matchesTags(item.tags, params))
	return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : getRandomImage()
}

export const gif = (params: string[]): Media => {
	const filtered = gifData.filter(item => matchesTags(item.tags, params))
	return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : getRandomGif()
}