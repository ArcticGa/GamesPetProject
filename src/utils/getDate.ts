import { monthsArray } from './miniArraysList'

export const getDate = (timestamp: number) => {
	const myDate = new Date(timestamp)
	const day = myDate.getDate()
	const month = monthsArray[myDate.getMonth()]
	const year = myDate.getFullYear()

	return `${day} ${month} ${year}`
}
