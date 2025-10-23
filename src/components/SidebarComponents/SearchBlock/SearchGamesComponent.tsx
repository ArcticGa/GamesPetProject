import { SetStateAction } from 'react'
import { useAppSelector } from '../../../redux/store'
import { IGame } from '../../../types/types'
import SearchedGameBlock from './SearchedGameBlock'

const SearchGamesComponent = ({
	filteredArray,
	setValue,
}: {
	filteredArray: IGame[]
	setValue: React.Dispatch<SetStateAction<string>>
}) => {
	const { activeSearch } = useAppSelector(state => state.statusSearchBlockSlice)

	return (
		activeSearch && (
			<div className='absolute top-0 left-70 max-h-[820px] no-scrollbar overflow-auto w-100 rounded-2xl bg-main-blocks p-2.5 z-50 max-sm:top-35 max-sm:left-0 max-lg:border-1 max-lg:border-links-and-borders max-sm:w-90 max-sm:max-h-[430px]'>
				{filteredArray.length === 0 ? (
					<div className='text-center'>Сожалеем, но ничего не найдено</div>
				) : (
					<SearchedGameBlock
						filteredArray={filteredArray}
						setValue={setValue}
					/>
				)}
			</div>
		)
	)
}

export default SearchGamesComponent

//absolute top-0 left-70 max-h-[820px] no-scrollbar overflow-auto w-100 rounded-2xl bg-main-blocks p-2.5
