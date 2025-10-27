import { SetStateAction, useRef } from 'react'
import { useClickOutside } from '../../../utils/hooks/clickOutside'

const InfoBlock = ({
	setOpenInfo,
}: {
	setOpenInfo: React.Dispatch<SetStateAction<boolean>>
}) => {
	const infoBlockRef = useRef(document.createElement('div'))
	useClickOutside(infoBlockRef, () => setOpenInfo(false))

	return (
		<div
			ref={infoBlockRef}
			className='absolute -top-6 left-70 z-10 bg-main-blocks text-xs w-82 p-3 rounded-2xl max-md:left-0 max-md:top-15 max-md:max-w-[250px] max-md:border-1 max-md:border-links-and-borders'
		>
			<div>
				<div className='mb-3 text-xs'>
					Проект находится на стадии разработки. Список игр и жанров будет
					пополняться. Если есть вопросы, либо предложения по проекту, напишите
					мне.
				</div>
				<div>(Войти в аккаунт - Написать разработчику)</div>
			</div>
		</div>
	)
}

export default InfoBlock
