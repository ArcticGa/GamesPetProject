import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import AnimeGif from '../../assets/GameImages/ani.gif'
import FrirenGif from '../../assets/GameImages/friren.gif'
import CheckIcon from '../../assets/icons/CheckIcon.svg'
import CloseIcon from '../../assets/icons/close-icon.svg'
import PenIcon from '../../assets/icons/penIcon.svg'
import { fetchUpdateUser } from '../../redux/slices/auth'
import { useAppDispatch } from '../../redux/store'
import { IUser } from '../../types/types'
import InfoDiv from './InfoDiv'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

const MainProfileBlock = ({
	userData,
	isOwn,
}: {
	userData: IUser
	isOwn: boolean
}) => {
	const dispatch = useAppDispatch()
	const [showImgUpload, setShowImgUpload] = useState(false)
	const inputFileRef = useRef(document.createElement('input'))
	const [isChangeNickname, setIsChangeNickname] = useState(false)

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files && files.length > 0) {
			try {
				const formData = new FormData()
				const selectedFile = files[0]
				formData.append('image', selectedFile)
				const { data } = await axios.post(
					`${BASE_BACKEND_URL}/uploads`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				dispatch(fetchUpdateUser({ avatarUrl: data }))
				return
			} catch (err) {
				console.warn(err)
			}
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nickname: userData.nickname,
		},
		mode: 'onSubmit',
	})

	const handleClose = () => {
		setIsChangeNickname(false)
	}

	const onSubmit = values => {
		if (values.nickname === userData.nickname) return
		dispatch(fetchUpdateUser(values))
		setIsChangeNickname(false)
	}

	return (
		<div className='flex flex-col bg-main-blocks py-4 px-15 rounded-2xl mb-8'>
			<div className='flex items-center justify-between'>
				{isOwn ? (
					<div>
						<div
							onClick={() => inputFileRef.current.click()}
							onMouseEnter={() => setShowImgUpload(true)}
							onMouseLeave={() => setShowImgUpload(false)}
							className='relative cursor-pointer'
						>
							<img
								className='z-10 w-40 h-40 rounded-full'
								src={`${BASE_BACKEND_URL}${userData.avatarUrl}`}
								alt='userAvatar'
							/>

							<div className='absolute bottom-0 right-0'>
								<img src={PenIcon} alt='pen-icon' />
							</div>

							{showImgUpload && (
								<div className='flex items-center justify-center absolute top-0 left-0 bg-gray-500 w-full h-full rounded-full z-20 opacity-70'>
									<div className='w-2/3 text-center'>Выбрать аватар</div>
								</div>
							)}
						</div>

						<input
							ref={inputFileRef}
							onChange={handleChangeFile}
							type='file'
							accept='.jpg, .jpeg, .png'
							hidden
						/>
					</div>
				) : (
					<img
						className='z-10 w-40 h-40 rounded-full'
						src={`${BASE_BACKEND_URL}${userData.avatarUrl}`}
						alt='userAvatar'
					/>
				)}

				<div className=''>
					<div className='text-sm text-gray-400 text-center'>Никнейм:</div>
					{!isChangeNickname ? (
						<div className='flex items-center'>
							<div className='text-3xl font-bold mr-3 border-b-2 border-main-blocks'>
								{userData.nickname}
							</div>
							<div
								onClick={() => setIsChangeNickname(true)}
								className='bg-links-and-borders rounded-md p-1 cursor-pointer'
							>
								<img className='w-5' src={PenIcon} alt='changeBtn-icon' />
							</div>
						</div>
					) : (
						<div>
							<form
								className='flex items-center'
								onSubmit={handleSubmit(onSubmit)}
							>
								<input
									className='max-w-[160px] text-3xl font-bold mr-3 border-b-2 border-links-and-borders outline-0'
									{...register('nickname', {
										required: 'Введите никнейм',
										minLength: {
											value: 5,
											message: 'Никнейм должен состоять минимум из 5 символов',
										},
										maxLength: {
											value: 11,
											message: 'Никнейм может состоять максимум из 15 символов',
										},
									})}
								/>

								<button className='bg-green-600 rounded-md p-1 cursor-pointer mr-3'>
									<img className='w-5' src={CheckIcon} alt='changeBtn-icon' />
								</button>
								<div
									onClick={handleClose}
									className='bg-red-600 rounded-md p-1 cursor-pointer'
								>
									<img className='w-5' src={CloseIcon} alt='changeBtn-icon' />
								</div>
							</form>
							{Object.keys(errors).length !== 0 && (
								<div className='max-w-[240px] mt-5 bg-red-900 rounded-xl py-1 px-3 text-sm'>
									{errors.nickname?.message}
								</div>
							)}
						</div>
					)}
				</div>

				<div>
					<div className='text-center text-sm text-gray-400'>
						Общая информация
					</div>
					<div className='bg-main-background p-4 rounded-2xl shadow-lg mt-1'>
						{isOwn && <InfoDiv text={'Email:'}>{userData.email}</InfoDiv>}
						<InfoDiv text={'Избранных игр:'}>
							{userData.featuredGames.length}
						</InfoDiv>
						<InfoDiv text={'Пользователь на сайте с'}>
							{userData.createdAt.slice(0, 10)}
						</InfoDiv>
					</div>
				</div>
				<div>
					<div className='text-center text-sm text-gray-400'>
						Информация по обзорам
					</div>
					<div className='bg-main-background p-4 rounded-2xl shadow-lg mt-1'>
						<InfoDiv text={'Созданных обзоров:'}>
							{userData.ownReviews.length}
						</InfoDiv>
						<InfoDiv text={'Понравившихся обзоров:'}>
							{userData.likedReviews.length}
						</InfoDiv>
						<InfoDiv text={'Непонравившихся обзоров:'}>
							{userData.dislikedReviews.length}
						</InfoDiv>
					</div>
				</div>

				<img
					className='w-45'
					src={isOwn ? FrirenGif : AnimeGif}
					alt='friren-gif'
				/>
			</div>
		</div>
	)
}

export default MainProfileBlock
