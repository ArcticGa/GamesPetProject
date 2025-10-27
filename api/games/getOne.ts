import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { id } = req.query

	if (!id) {
		return res.status(400).json({ message: 'Missing game ID' })
	}

	const options = {
		method: 'GET',
		url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
		params: {
			id,
		},
		headers: {
			'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
			'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
		},
	}

	try {
		const response = await axios.request(options)
		return res.status(200).json(response.data)
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown server error'
		return res.status(500).json({ error: message })
	}
}
