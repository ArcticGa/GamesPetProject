import { SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CheckIcon from '../../../assets/icons/CheckIcon.svg'
import CloseIcon from '../../../assets/icons/close-icon.svg'
import PenIcon from '../../../assets/icons/penIcon.svg'
import { fetchUpdateUser } from '../../../redux/slices/auth'
import { useAppDispatch } from '../../../redux/store'
import { IUser } from '../../../types/types'

type NicknameProps = {
	isOwn: boolean
	userData: IUser
	isChangeNickname: boolean
	setIsChangeNickname: React.Dispatch<SetStateAction<boolean>>
}

type UploadInputs = {
	nickname: string
}

const Nickname = ({
	isOwn,
	userData,
	isChangeNickname,
	setIsChangeNickname,
}: NicknameProps) => {
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UploadInputs>({
		defaultValues: {
			nickname: userData.nickname,
		},
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<UploadInputs> = values => {
		if (values.nickname === userData.nickname) return
		dispatch(fetchUpdateUser(values))
		setIsChangeNickname(false)
	}

	return (
		<div className='max-2xl:mb-4'>
			<div className='text-sm text-gray-400 text-center'>Никнейм:</div>
			{!isChangeNickname ? (
				<div className='flex items-center'>
					<div className={'text-3xl font-bold border-b-2 border-main-blocks'}>
						{userData.nickname}
					</div>
					{isOwn && (
						<div
							onClick={() => setIsChangeNickname(true)}
							className='bg-links-and-borders rounded-md p-1 cursor-pointer ml-3'
						>
							<img className='w-5' src={PenIcon} alt='changeBtn-icon' />
						</div>
					)}
				</div>
			) : (
				<div>
					<form className='flex items-center' onSubmit={handleSubmit(onSubmit)}>
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
							onClick={() => setIsChangeNickname(false)}
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
	)
}

export default Nickname
