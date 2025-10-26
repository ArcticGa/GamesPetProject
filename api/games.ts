import type { VercelRequest, VercelResponse } from '@vercel/node'

interface Game {
	id: number
	title: string
	genre: string
	platform: string
	thumbnail: string
	short_description: string
	publisher: string
	developer: string
	release_date: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const url = new URL(
		'https://free-to-play-games-database.p.rapidapi.com/api/games'
	)

	try {
		const response = await fetch(url.toString(), {
			headers: {
				'x-rapidapi-key': process.env.RAPIDAPI_KEY ?? '',
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
			},
		})

		if (!response.ok) {
			const text = await response.text()
			res.status(response.status).json({ error: text || 'API request failed' })
			return
		}

		const data: Game[] = await response.json()

		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

		res.status(200).json(data)
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown server error'
		res.status(500).json({ error: message })
	}
}
