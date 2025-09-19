import Screenshots from './Screenshots'
import SystemReqs from './SystemReqs'

const GameInfoBlock = () => {
	return (
		<div className='flex justify-between mb-16'>
			<SystemReqs />
			<Screenshots />
		</div>
	)
}

export default GameInfoBlock
