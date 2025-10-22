import Screenshots from './Screenshots'
import SystemReqs from './SystemReqs'

const GameInfoBlock = () => {
	return (
		<div className='flex justify-between mb-16 flex-wrap max-2xl:justify-center'>
			<SystemReqs />
			<Screenshots />
		</div>
	)
}

export default GameInfoBlock
