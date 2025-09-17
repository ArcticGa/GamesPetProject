import { useState } from 'react'
import ArrowIcon from '../../../assets/icons/arrow-down.svg'
import CategoryIcon from '../../../assets/icons/grid.svg'
import { categoriesArray } from '../../../utils/miniArrays'
import { stylesCategories } from './Utils'

const CategoryMain = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const [openedCategory, setOpenedCategory] = useState(false)

	return (
		<div className='pt-2 pb-4'>
			<div
				onClick={() => setOpenedCategory(!openedCategory)}
				className={stylesCategories(sidebarStatus)}
			>
				<div className='flex items-center'>
					<img src={CategoryIcon} alt='category-icon' />
					{sidebarStatus && <span className='ml-2.5'>Категории</span>}
				</div>

				{sidebarStatus && (
					<img
						className={openedCategory ? 'rotate-90' : undefined}
						src={ArrowIcon}
						alt='arrow-icon'
					/>
				)}
			</div>

			{sidebarStatus && openedCategory && (
				<div className='ml-9 pt-2'>
					{categoriesArray.map(category => (
						<div
							className='flex items-center mb-5 cursor-pointer'
							key={category._id}
						>
							<img src={category.image} alt={category.name} />
							<span className='ml-2.5'>{category.name}</span>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CategoryMain
