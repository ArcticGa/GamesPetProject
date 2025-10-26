import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { id } = req.query

	if (!id) {
		return res.status(400).json({ message: 'Missing game ID' })
	}

	try {
		const response = await fetch(
			`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
			{
				headers: {
					'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
					'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
				},
			}
		)

		if (!response.ok) {
			throw new Error(`FreeToGame API error: ${response.status}`)
		}

		const game = await response.json()
		return res.status(200).json(game)
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown server error'
		res.status(500).json({ error: message })
	}
}
