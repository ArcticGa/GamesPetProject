import { SetStateAction } from 'react'

type ListCategoriesProps = {
	filteredGenresArray: string[]
	selectedCategories: string[]
	setSelectedCategories: React.Dispatch<SetStateAction<string[]>>
}

const ListCategories = ({
	filteredGenresArray,
	selectedCategories,
	setSelectedCategories,
}: ListCategoriesProps) => {
	const handleSelectCategory = (category: string) => {
		const findCategory = selectedCategories.find(item => item === category)
		if (findCategory) return

		setSelectedCategories([...selectedCategories, category])
	}

	return filteredGenresArray.length !== 0 ? (
		<div className='max-h-[500px] pr-2 flex flex-col overflow-x-auto whitespace-nowrap scrollbar max-lg:max-h-[350px]'>
			{filteredGenresArray.map((category, index) => (
				<div
					key={index}
					onClick={() => handleSelectCategory(category)}
					className='cursor-pointer mb-1.5 py-1  text-center rounded-lg bg-main-background'
				>
					{category}
				</div>
			))}
		</div>
	) : (
		<div className='text-center'>Ничего не нашли</div>
	)
}

export default ListCategories
