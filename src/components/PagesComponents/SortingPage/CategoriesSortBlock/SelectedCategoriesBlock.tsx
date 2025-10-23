import { SetStateAction } from 'react'
import DeleteIcon from '../../../../assets/icons/close-icon.svg'

type SelectedCategoriesBlockProps = {
	selectedCategories: string[]
	setSelectedCategories: React.Dispatch<SetStateAction<string[]>>
}

const SelectedCategoriesBlock = ({
	selectedCategories,
	setSelectedCategories,
}: SelectedCategoriesBlockProps) => {
	const handleDeleteCategory = (category: string) => {
		setSelectedCategories(selectedCategories.filter(item => item !== category))
	}

	return (
		<div className='flex flex-wrap mb-2.5'>
			{selectedCategories.map((category, index) => (
				<div
					key={index}
					onClick={() => handleDeleteCategory(category)}
					className='flex items-center py-1 px-2.5 rounded-md bg-main-background border-1 border-main-blocks text-xs mr-1 mb-1 hover:border-red-600 cursor-pointer hover:bg-red-400'
				>
					<div>{category}</div>
					<img className='w-4 ml-1' src={DeleteIcon} alt='delete-icon' />
				</div>
			))}
		</div>
	)
}

export default SelectedCategoriesBlock
