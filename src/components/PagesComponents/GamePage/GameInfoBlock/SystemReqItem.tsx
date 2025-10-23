import { systemReqsArrayHelper } from '../../../../utils/miniArraysList'

type SystemReqItem = {
	name: string
	info: string
}

const SystemReqItem = ({ name, info }: SystemReqItem) => {
	const getName = (name: string) => {
		const item = systemReqsArrayHelper.find(item => item.title === name)
		return item?.req
	}

	return (
		<div className='mb-2'>
			<div className='text-gray-500'>{getName(name)}</div>
			<div>{info}</div>
		</div>
	)
}

export default SystemReqItem
