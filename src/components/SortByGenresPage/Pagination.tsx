import { SetStateAction } from 'react'
import { IGame } from '../../types/types'

interface PaginationProps {
	gamesArray: IGame[]
	currentPage: number
	setCurrentPage: React.Dispatch<SetStateAction<number>>
}

const Pagination = ({
	gamesArray,
	currentPage,
	setCurrentPage,
}: PaginationProps) => {
	const TOTAL_PAGES = Math.ceil(gamesArray.length / 12)

	const handleNextPage = () => {
		if (currentPage !== TOTAL_PAGES) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePrevPage = () => {
		if (currentPage >= 2) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handlePageClick = (index: number) => {
		setCurrentPage(index)
	}

	return (
		<div className='flex justify-center mt-8 text-lg'>
			<button
				className={` ${
					currentPage === 1 && 'bg-main-blocks opacity-20'
				} py-1 px-4 rounded-lg bg-links-and-borders mr-1 cursor-pointer`}
				disabled={currentPage === 1}
				onClick={handlePrevPage}
			>
				{'<'}
			</button>

			<div
				className={` ${
					TOTAL_PAGES > 26 && 'flex w-full overflow-auto scrollbar pb-2'
				} `}
			>
				{[...Array(TOTAL_PAGES)].map((_, index) => (
					<button
						className={` ${
							currentPage - 1 === index
								? 'bg-links-and-borders'
								: 'bg-main-blocks'
						} py-1 px-4 rounded-lg mx-1 cursor-pointer`}
						onClick={() => handlePageClick(index + 1)}
						key={index}
					>
						{index + 1}
					</button>
				))}
			</div>

			<button
				className={`${
					TOTAL_PAGES === currentPage && 'bg-main-blocks opacity-20'
				} py-1 px-4 rounded-lg bg-links-and-borders ml-1 cursor-pointer`}
				disabled={currentPage === TOTAL_PAGES}
				onClick={handleNextPage}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Pagination
