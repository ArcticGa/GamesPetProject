import { systemReqsArrayHelper } from '../../../utils/miniArraysList'

const SystemReqItem = ({ name, info }: { name: string; info: string }) => {
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
