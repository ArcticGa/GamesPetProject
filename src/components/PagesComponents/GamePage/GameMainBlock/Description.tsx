import { useEffect, useState } from 'react'

const Description = ({ description }: { description: string | undefined }) => {
	const [translatedText, setTranslatedText] = useState('')

	const translateText = async (text: string) => {
		const response = await fetch('/api/translate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text }),
		})
		const data = await response.json()
		console.log(data)

		setTranslatedText(data.translated)
	}

	useEffect(() => {
		if (description) {
			translateText(description)
		}
	}, [description])

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
