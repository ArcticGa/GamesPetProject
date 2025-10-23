import { IGameYear } from '../../../types/types'

const Finalist = ({ finalist }: { finalist: IGameYear }) => {
	return (
		<a href={finalist.steamLink} target='_blank' className='mx-0.5 max-md:mb-4'>
			<img
				className='w-45 max-md:w-30 rounded-lg'
				src={finalist.imageUrl}
				alt='finalist-image'
			/>
		</a>
	)
}

export default Finalist
