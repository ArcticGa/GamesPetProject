import { monthsArray } from '../miniArraysList'

export const useGetDate = (timestamp: number) => {
	const myDate = new Date(timestamp)
	const day = myDate.getDate()
	const month = monthsArray[myDate.getMonth()]
	const year = myDate.getFullYear()

	return `${day} ${month} ${year}`
}
