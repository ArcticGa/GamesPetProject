import { ChangeEvent, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import Gif from '../../assets/GameImages/addReview.gif'
import CloseIcon from '../../assets/icons/close-icon.svg'
import HeartIcon from '../../assets/icons/heart.svg'
import RedHeartIcon from '../../assets/icons/redHeart.svg'
import { fetchUpdateUser } from '../../redux/slices/auth'
import { fetchCreateReview } from '../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch } from '../../redux/store'
import { IUser } from '../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

type AddReviewInputs = {
	grade: string
	text: string
}

const AddReview = ({
	userData,
	setIsAddReview,
}: {
	userData: IUser
	setIsAddReview: React.Dispatch<SetStateAction<boolean>>
}) => {
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [isRecommended, setIsRecommended] = useState(false)
	const [errorGrade, setErrorGrade] = useState(false)

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === '0') {
			setErrorGrade(true)
		} else {
			setErrorGrade(false)
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddReviewInputs>({
		defaultValues: {
			grade: '0',
			text: '',
		},
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<AddReviewInputs> = async values => {
		if (id) {
			if (values.grade === '0') {
				setErrorGrade(true)
				return
			}

			try {
				const reviewFields = {
					gameId: Number(id),
					text: values.text,
					grade: Number(values.grade),
					isRecommended,
				}

				await dispatch(fetchCreateReview(reviewFields))
				await dispatch(fetchUpdateUser({ ownReviewsUpdate: 1 }))

				setErrorGrade(false)
				setIsAddReview(false)
			} catch (err) {
				console.warn(err)
			}
		}
	}

	return (
		<div className='relative w-full mb-8 flex items-center bg-main-blocks py-6 rounded-2xl'>
			<div className={`w-1/4 h-full px-4 py-4 mx-2 rounded-xl`}>
				{errorGrade && (
					<div className='bg-red-900 py-2 text-center rounded-xl text-sm mb-2'>
						Выберите корректную оценку для обзора
					</div>
				)}
				{errors.text && (
					<div className='bg-red-900 py-1 px-2 rounded-xl text-sm'>
						{errors.text?.message}
					</div>
				)}
			</div>
			<div className='w-1/2 flex flex-col items-center'>
				<div className='mb-4 text-xl'>Превью вашего обзора</div>
				<form onSubmit={handleSubmit(onSubmit)} className='rounded-xl'>
					<div className='flex items-center bg-main-background px-6 py-3 rounded-2xl'>
						<img
							className='mr-2 w-12 h-12 rounded-full'
							src={BASE_BACKEND_URL + userData.avatarUrl}
							alt='user-avatar'
						/>
						<div>
							<div className='font-bold text-lg max-w-[93px] overflow-hidden'>
								{userData.nickname}
							</div>
							<div className='text-xs text-[#c5c5c5]'>
								Обзоров: {userData.ownReviews}
							</div>
						</div>
						<div
							onClick={() => setIsRecommended(!isRecommended)}
							className='flex items-center justify-center bg-main-blocks  text-sm py-2 rounded-xl mx-6 cursor-pointer w-[187px]'
						>
							<img
								src={isRecommended ? RedHeartIcon : HeartIcon}
								alt='heart-icon'
							/>
							<div className='ml-2'>
								{isRecommended ? 'Рекомендую' : 'Не рекомендую'}
							</div>
						</div>
						<div className='flex flex-col items-center'>
							<select
								{...register('grade')}
								onChange={handleSelect}
								className='outline-none border-0 text-3xl cursor-pointer'
								defaultValue={'0'}
							>
								{[...Array(11)].map((_, index) => (
									<option
										key={index}
										value={index}
										className='bg-main-blocks text-center'
									>
										{index === 0 ? '' : index}
									</option>
								))}
							</select>
							<div className='text-xs text-[#c5c5c5]'>Оценка</div>
						</div>
					</div>
					<textarea
						{...register('text', {
							minLength: {
								value: 100,
								message: 'Минимальное количество символов: 100',
							},
							maxLength: {
								value: 1500,
								message: 'Максимальное количество символов: 1500',
							},
						})}
						className='w-full h-[150px] border-1 border-links-and-borders rounded-lg py-2 resize-none px-8 my-3 outline-none scrollbar text-sm'
						placeholder='Напишите сюда все, что думаете об игре. Надеюсь на вас 😏'
					></textarea>
					<button className='text-center bg-links-and-borders w-full py-1.5 rounded-md cursor-pointer'>
						Добавить обзор на сайт
					</button>
				</form>
			</div>
			<div className='w-1/4 flex justify-center'>
				<img src={Gif} alt='gif' />
			</div>
			<img
				onClick={() => setIsAddReview(false)}
				className='absolute top-3 right-3 w-13 cursor-pointer'
				src={CloseIcon}
				alt='close-icon'
			/>
		</div>
	)
}

export default AddReview
