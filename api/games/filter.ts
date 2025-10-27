import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { platform, tags } = req.query

	if (!platform && !tags) {
		return res.status(400).json({
			message: 'Missing query parameters. Use ?platform=pc&tags=shooter',
		})
	}

	try {
		const url = new URL(
			'https://free-to-play-games-database.p.rapidapi.com/api/filter'
		)

		if (platform) url.searchParams.set('platform', String(platform))
		if (tags) url.searchParams.set('tag', String(tags))

		const response = await fetch(url.toString(), {
			headers: {
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
				'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
			},
		})

		if (!response.ok) {
			throw new Error(`FreeToGame API error: ${response.status}`)
		}

		const games = await response.json()
		return res.status(200).json(games)
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown server error'
		return res.status(500).json({ error: message })
	}
}
