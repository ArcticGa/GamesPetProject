import { IGameYear } from '../../types/types'

const Finalist = ({ finalist }: { finalist: IGameYear }) => {
	return (
		<a href={finalist.steamLink} target='_blank'>
			<img
				className='w-45 rounded-lg hover:w-50 transition-all delay-75'
				src={finalist.imageUrl}
				alt='finalist-image'
			/>
		</a>
	)
}

export default Finalist
