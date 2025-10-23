import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../redux/store'
import SystemReqItem from './SystemReqItem'

const SystemReqs = () => {
	const { game } = useAppSelector(state => state.gameByIdSlice)
	const [reqsEntries, setReqsEntries] = useState<string[][]>()

	const renderReqs = () => {
		const reqsObj = game?.minimum_system_requirements
		if (reqsObj) {
			setReqsEntries(Object.entries(reqsObj))
		}
	}

	useEffect(() => {
		renderReqs()
	}, [game])

	return (
		<div className='max-2xl:mb-6'>
			<div className='text-xl font-bold mb-3'>
				Системные требования {game?.title}
			</div>
			<div className='bg-main-blocks p-6 rounded-3xl w-150 max-2xl:w-full'>
				<div className='text-lg font-bold mb-4 border-b-1 border-links-and-borders'>
					Windows
				</div>
				<div className='mb-3'>Минимальные</div>
				{reqsEntries?.map((entry, index) => (
					<SystemReqItem key={index} name={entry[0]} info={entry[1]} />
				))}
			</div>
		</div>
	)
}

export default SystemReqs
