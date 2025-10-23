import { SetStateAction, useState } from 'react'
import Gif from '../../../../assets/GameImages/addReview.gif'
import CloseIcon from '../../../../assets/icons/close-icon.svg'
import { IUser } from '../../../../types/types'
import FormReview from './FormReview'

const AddReview = ({
	userData,
	setIsAddReview,
}: {
	userData: IUser
	setIsAddReview: React.Dispatch<SetStateAction<boolean>>
}) => {
	const [errorGrade, setErrorGrade] = useState(false)

	return (
		<div className='relative w-full mb-8 flex items-center bg-main-blocks py-6 rounded-2xl max-lg:flex-col max-lg:px-3 max-lg:pt-6 max-lg:pb-4'>
			<div className='w-1/4 h-full px-4 py-4 mx-2 rounded-xl max-lg:w-full'>
				{errorGrade && (
					<div className='bg-red-900 py-2 text-center rounded-xl text-sm mb-2'>
						Выберите корректную оценку для обзора
					</div>
				)}
			</div>
			<div className='w-1/2 flex flex-col items-center max-lg:w-full'>
				<div className='mb-4 text-xl'>Превью вашего обзора</div>
				<FormReview
					setErrorGrade={setErrorGrade}
					userData={userData}
					setIsAddReview={setIsAddReview}
				/>
			</div>
			<div className='w-1/4 flex justify-center'>
				<img className='max-lg:hidden' src={Gif} alt='gif' />
			</div>
			<img
				onClick={() => setIsAddReview(false)}
				className='absolute top-3 right-3 w-13 cursor-pointer max-sm:w-10'
				src={CloseIcon}
				alt='close-icon'
			/>
		</div>
	)
}

export default AddReview
