import { monthsArray } from '../miniArrays'

export const useGetDate = (timestamp: number) => {
	const myDate = new Date(timestamp * 1000)
	const day = myDate.getDate()
	const month = monthsArray[myDate.getMonth()]
	const year = myDate.getFullYear()

	return `${day} ${month} ${year}`
}
