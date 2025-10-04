import { ReactNode } from 'react'

const InfoDiv = ({ text, children }: { text: string; children: ReactNode }) => {
	return (
		<div>
			{text}
			<span
				className={`${
					text !== 'Никнейм:' ? 'text-lg' : 'font-bold text-xl'
				}  ml-2  text-links-and-borders`}
			>
				{children}
			</span>
		</div>
	)
}

export default InfoDiv
