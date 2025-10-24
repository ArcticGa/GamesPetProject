import { IReview } from '../../../types/types'
import { getDate } from '../../../utils/getDate'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import HeartIcon from '../../../assets/icons/heart.svg'
import RedHeartIcon from '../../../assets/icons/redHeart.svg'
import { fetchUpdateUser } from '../../../redux/slices/auth'
import {
	fetchDeleteReview,
	fetchUpdateReview,
} from '../../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import VoteBtns from '../GamePage/GameReviewsBlock/VoteBtns'

type UpdateReviewInputs = {
	grade: string
	text: string
}

const ReviewFull = ({ review }: { review: IReview }) => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)

	const [isEditing, setIsEditing] = useState(false)
	const [isRecommended, setIsRecommended] = useState(review.isRecommended)

	const date = new Date(review.createdAt)
	const published = getDate(date.getTime())

	const isOwner = userData && userData._id === review.user._id

	const handleDelete = () => {
		try {
			const isDelete = confirm('Вы точно хотите удалить обзор?')
			if (!isDelete) return

			dispatch(fetchDeleteReview(review._id))
			dispatch(fetchUpdateUser({ ownReviewsUpdate: -1 }))
		} catch (err) {
			console.log(err)
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateReviewInputs>({
		defaultValues: {
			grade: String(review.grade),
			text: review.text,
		},
	})

	const onSubmit: SubmitHandler<UpdateReviewInputs> = async values => {
		if (
			isRecommended === review.isRecommended &&
			Number(values.grade) === review.grade &&
			values.text === review.text
		) {
			return setIsEditing(false)
		}

		try {
			const fieldsReview = {
				reviewId: review._id,
				updatedFields: {
					isRecommended,
					grade: Number(values.grade),
					text: values.text,
				},
			}

			await dispatch(fetchUpdateReview(fieldsReview))
			setIsEditing(false)
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='p-4 bg-main-blocks rounded-2xl w-full max-w-[470px] mr-4 mb-4 flex flex-col justify-between max-sm:p-1.5 max-sm:mr-0'
		>
			<div className='flex items-center justify-between rounded-2xl bg-main-background shadow-lg px-6 py-3 mb-4 max-sm:px-3 max-sm:py-2'>
				<Link
					to={
						review.user._id === userData?._id
							? `/profile`
							: `/user/${review.user._id}`
					}
					className='flex items-center'
				>
					<img
						className='mr-2 w-12 h-12 rounded-full max-sm:w-10 max-sm:h-10'
						src={review.user.avatarUrl}
						alt='user-avatar'
					/>
					<div>
						<div className='font-bold text-lg max-w-[93px] overflow-hidden max-sm:text-base max-sm:max-w-[60px]'>
							{review.user.nickname}
						</div>
						<div className='text-xs text-[#c5c5c5] max-sm:text-mini'>
							Обзоров: {review.user.ownReviews}
						</div>
					</div>
				</Link>
				{isEditing ? (
					<div
						onClick={() => setIsRecommended(!isRecommended)}
						className='flex items-center bg-main-blocks text-sm px-2.5 py-2 rounded-xl cursor-pointer max-sm:mx-1 max-sm:text-xs'
					>
						<img
							className='max-sm:hidden'
							src={isRecommended ? RedHeartIcon : HeartIcon}
							alt='heart-icon'
						/>
						<div className='ml-2'>
							{isRecommended ? 'Рекомендую' : 'Не рекомендую'}
						</div>
					</div>
				) : (
					<div className='flex items-center bg-main-blocks text-sm px-2.5 py-2 rounded-xl max-sm:mx-2 max-sm:text-xs'>
						<img
							className='max-sm:hidden'
							src={review.isRecommended ? RedHeartIcon : HeartIcon}
							alt='heart-icon'
						/>
						<div className='ml-2 max-sm:m-0'>
							{review.isRecommended ? 'Рекомендую' : 'Не рекомендую'}
						</div>
					</div>
				)}
				{isEditing ? (
					<div className='flex flex-col items-center'>
						<select
							{...register('grade')}
							className='outline-none border-0 text-3xl cursor-pointer max-sm:text-2xl'
							defaultValue={review.grade}
						>
							{[...Array(10)].map((_, index) => (
								<option
									key={index}
									value={index + 1}
									className='bg-main-blocks text-center'
									selected={review.grade === index + 1}
								>
									{index + 1}
								</option>
							))}
						</select>
						<div className='text-xs text-[#c5c5c5] max-sm:text-mini'>
							Оценка
						</div>
					</div>
				) : (
					<div className='flex flex-col items-center'>
						<div className='text-bold text-3xl max-sm:text-2xl'>
							{review.grade}
						</div>
						<div className='text-xs text-[#c5c5c5] max-sm:text-mini'>
							Оценка
						</div>
					</div>
				)}
			</div>
			{isEditing ? (
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
					className={`${
						errors.text ? 'border-red-700' : 'border-links-and-borders'
					} field-sizing-content resize-none mx-2 mb-5 text-sm outline-none  border-1 p-2 rounded-md`}
				>
					{review.text}
				</textarea>
			) : (
				<div className='flex-1 max-h-[150px] h-full break-words mx-2 mb-5 text-sm overflow-auto scrollbar mr-2'>
					{review.text}
				</div>
			)}

			{!isOwner && (
				<div className='text-end mx-6 text-[#c7c7c7] text-sm mb-2'>
					Был ли обзор полезен
				</div>
			)}

			<div className='flex items-center justify-between ml-3 mr-4'>
				<div className='text-xs text-gray-400'>
					<div>Опубликовано:</div>
					<div>{published}</div>
				</div>
				{userData ? (
					!isOwner ? (
						<VoteBtns data={review} />
					) : (
						<div className='text-mini text-gray-500 max-w-[60%] text-right'>
							<div>Вы не можете оценить свой обзор</div>
							<div>
								Оценки: {review.likes} / {review.dislikes}
							</div>
						</div>
					)
				) : (
					<Link
						to={'/auth'}
						className='text-xs text-links-and-borders max-w-[40%] text-right'
					>
						Авторизуйтесь, чтобы поставить оценку
					</Link>
				)}
			</div>
			{isOwner && (
				<div className='mt-3.5 flex'>
					{isEditing ? (
						<button
							type='submit'
							className='w-full bg-links-and-borders rounded-lg text-center py-0.5 cursor-pointer'
						>
							Применить изменения
						</button>
					) : (
						<div
							onClick={() => setIsEditing(true)}
							className='w-full bg-links-and-borders rounded-lg text-center py-0.5 cursor-pointer'
						>
							Изменить обзор
						</div>
					)}

					<div className='mx-2'></div>
					<div
						onClick={isEditing ? () => setIsEditing(false) : handleDelete}
						className={`${
							isEditing
								? 'border-red-900 bg-main-blocks'
								: 'bg-red-900 border-red-900'
						} w-full  rounded-lg text-center py-0.5 cursor-pointer border-1`}
					>
						{isEditing ? 'Отменить изменения' : 'Удалить обзор'}
					</div>
				</div>
			)}
		</form>
	)
}

export default ReviewFull
