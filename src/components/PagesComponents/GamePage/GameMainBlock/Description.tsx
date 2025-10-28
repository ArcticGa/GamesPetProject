import axios from 'axios'
import { useEffect, useState } from 'react'

const Description = ({ description }: { description: string | undefined }) => {
	const [translatedText, setTranslatedText] = useState('')

	useEffect(() => {
		const translateText = async () => {
			try {
				const response = await axios.post(
					'https://api.openai.com/v1/chat/completions',
					{
						model: 'gpt-4o-mini',
						messages: [
							{
								role: 'system',
								content: 'You are a translator from English to Russian.',
							},
							{ role: 'user', content: description },
						],
					},
					{
						headers: {
							Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
							'Content-Type': 'application/json',
						},
					}
				)

				const translated = response.data.choices[0].message.content
				setTranslatedText(translated)
			} catch (err) {
				console.error('Ошибка перевода:', err)
			}
		}

		if (description) translateText()
	}, [])

	return (
		<div className='max-w-[900px] border-b-2 border-links-and-borders bg-main-background rounded-t-xl p-4'>
			<div className='text-lg font-bold mb-2'>Описание игры</div>
			<div className='text-gray-400 max-h-[300px] overflow-auto scrollbar'>
				{translatedText || 'Перевожу... 😖'}
			</div>
		</div>
	)
}

export default Description
