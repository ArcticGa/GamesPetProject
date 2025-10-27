import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { filterGenres } from '../../../../utils/filterCategories'
import { useClickOutside } from '../../../../utils/hooks/clickOutside'
import { arrayGenres } from '../../../../utils/miniArraysList'
import BtnsBlock from './BtnsBlock'
import ListCategories from './ListCategories'
import SearchCategoriesInput from './SearchCategoriesInput'
import SelectedCategoriesBlock from './SelectedCategoriesBlock'

type CategoriesSortBlockProps = {
	setOpenCategories: React.Dispatch<SetStateAction<boolean>>
	setActiveSortButton: React.Dispatch<SetStateAction<number>>
}

const CategoriesSortBlock = ({
	setOpenCategories,
	setActiveSortButton,
}: CategoriesSortBlockProps) => {
	const [searchGenreValue, setSearchGenreValue] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [lastFetchTags, setLastFetchTags] = useState<string[]>([])
	const [filteredGenresArray, setFilteredGenresArray] =
		useState<string[]>(arrayGenres)

	const categoriesRef = useRef(document.createElement('div'))
	useClickOutside(categoriesRef, () => setOpenCategories(false))

	useEffect(() => {
		filterGenres(arrayGenres, searchGenreValue, setFilteredGenresArray)
	}, [searchGenreValue])

	return (
		<div
			ref={categoriesRef}
			className='ml-4 px-4 pt-4 pb-2 bg-main-blocks rounded-2xl'
		>
			<SelectedCategoriesBlock
				selectedCategories={selectedCategories}
				setSelectedCategories={setSelectedCategories}
			/>

			<SearchCategoriesInput
				searchGenreValue={searchGenreValue}
				setSearchGenreValue={setSearchGenreValue}
			/>

			<ListCategories
				filteredGenresArray={filteredGenresArray}
				selectedCategories={selectedCategories}
				setSelectedCategories={setSelectedCategories}
			/>

			<BtnsBlock
				selectedCategories={selectedCategories}
				setSelectedCategories={setSelectedCategories}
				setOpenCategories={setOpenCategories}
				setActiveSortButton={setActiveSortButton}
				lastFetchTags={lastFetchTags}
				setLastFetchTags={setLastFetchTags}
			/>
		</div>
	)
}

export default CategoriesSortBlock
