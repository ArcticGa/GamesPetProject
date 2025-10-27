import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

const cache = new Map<string, Buffer>()

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { url } = req.query

	if (!url || typeof url !== 'string') {
		return res.status(400).json({ error: 'Missing image URL' })
	}

	if (!url.startsWith('https://www.freetogame.com/')) {
		return res.status(403).json({ error: 'Forbidden source' })
	}

	if (cache.has(url)) {
		res.setHeader('Content-Type', 'image/jpeg')
		res.setHeader('Cache-Control', 'public, max-age=86400')
		return res.send(cache.get(url))
	}

	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' })
		cache.set(url, Buffer.from(response.data))
		res.setHeader('Content-Type', response.headers['content-type'])
		res.setHeader('Cache-Control', 'public, max-age=86400')
		res.send(response.data)
	} catch (error) {
		console.error('Error fetching image:', error)
		res.status(500).json({ error: 'Failed to fetch image' })
	}
}
