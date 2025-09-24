import { SetStateAction } from 'react'
import { IReview } from '../../types/types'

export const sortReviewsArray = (
	activeSortItem: number,
	setSortedArray: React.Dispatch<SetStateAction<IReview[]>>,
	data: IReview[]
) => {
	if (activeSortItem === 0) {
		const newArr = [...data].sort((a, b) => b.published_date - a.published_date)
		setSortedArray(newArr)
	}

	if (activeSortItem === 1) {
		const newArr = [...data].sort((a, b) => a.published_date - b.published_date)
		setSortedArray(newArr)
	}

	if (activeSortItem === 2) {
		const newArr = [...data].sort((a, b) => b.likes - a.likes)
		setSortedArray(newArr)
	}

	if (activeSortItem === 3) {
		const newArr = [...data].sort((a, b) => b.dislikes - a.dislikes)
		setSortedArray(newArr)
	}

	if (activeSortItem === 4) {
		const newArr = [...data].sort((a, b) => b.grade - a.grade)
		setSortedArray(newArr)
	}

	if (activeSortItem === 5) {
		const newArr = [...data].sort((a, b) => a.grade - b.grade)
		setSortedArray(newArr)
	}
}
