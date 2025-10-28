// /api/translate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { text } = req.body

	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content: 'Translate the following text from English to Russian.',
					},
					{ role: 'user', content: text },
				],
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		)

		const translated = response.data.choices[0].message.content
		res.status(200).json({ translated })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Translation failed' })
	}
}
