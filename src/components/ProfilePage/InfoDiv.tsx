import { ReactNode } from 'react'

const InfoDiv = ({
	text,
	children,
}: {
	text?: string
	children: ReactNode
}) => {
	return (
		<div>
			<span className='text-gray-400 text-sm'>{text}</span>
			{text !== undefined ? (
				<span
					className={`${
						text !== 'Никнейм:' ? 'text-base' : 'font-bold text-xl'
					}  ml-2  text-links-and-borders`}
				>
					{children}
				</span>
			) : (
				<span className={`text-3xl font-bold`}>{children}</span>
			)}
		</div>
	)
}

export default InfoDiv
