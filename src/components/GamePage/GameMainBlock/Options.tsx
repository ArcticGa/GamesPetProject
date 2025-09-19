import { FC, SetStateAction } from 'react'
import InfoIcon from '../../../assets/icons/info-icon.svg'
import PictureIcon from '../../../assets/icons/picture-icon.svg'

interface IOptionsProps {
	activeBtn: number
	setActiveBtn: React.Dispatch<SetStateAction<number>>
}

const Options: FC<IOptionsProps> = ({ activeBtn, setActiveBtn }) => {
	return (
		<div className='bg-main-blocks border-1 border-links-and-borders py-4 px-2 flex flex-col items-center rounded-full'>
			<img
				onClick={() => setActiveBtn(1)}
				className={`${
					activeBtn === 1 && 'bg-main-buttons'
				} p-2 mb-4  rounded-full cursor-pointer`}
				src={PictureIcon}
				alt='bg-picture'
			/>
			<img
				onClick={() => setActiveBtn(2)}
				className={`${
					activeBtn === 2 && 'bg-main-buttons'
				} p-2 rounded-full cursor-pointer`}
				src={InfoIcon}
				alt='bg-picture'
			/>
		</div>
	)
}

export default Options
