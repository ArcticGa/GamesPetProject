import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useNavigate } from 'react-router'
import PasswordIcon from '../../../assets/icons/lock.svg'
import EmailIcon from '../../../assets/icons/mail.svg'
import UserIcon from '../../../assets/icons/user.svg'
import { fetchRegister } from '../../../redux/slices/auth'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { IUser } from '../../../types/types'

export type RegisterInputs = {
	nickname: string
	email: string
	password: string
}

const RegisterForm = () => {
	const [focusName, setFocusName] = useState(false)
	const [focusEmail, setFocusEmail] = useState(false)
	const [focusPassword, setFocusPassword] = useState(false)
	const [errorSubmit, setErrorSubmit] = useState(false)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInputs>({
		defaultValues: {
			nickname: '',
			email: '',
			password: '',
		},
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<RegisterInputs> = async values => {
		console.log(values)

		const data = await dispatch(fetchRegister(values))

		if (!data.payload) {
			setErrorSubmit(true)
			return
		}

		setErrorSubmit(false)
		localStorage.setItem('token', (data.payload as IUser).token)
	}

	useEffect(() => {
		if (userData) {
			navigate('/profile')
		}
	}, [userData, navigate])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mx-10'>
			<div
				className={`flex ${
					focusName ? ' border-links-and-borders' : 'border-[#3F424D]'
				} bg-main-background px-4 py-3 rounded-2xl mb-3 border-1`}
			>
				<label htmlFor='nickname' className='pr-2'>
					<img src={UserIcon} alt='user-icon' />
				</label>
				<input
					{...register('nickname', {
						required: 'Введите никнейм',
						minLength: {
							value: 5,
							message: 'Никнейм должен состоять минимум из 5 символов',
						},
						maxLength: {
							value: 15,
							message: 'Никнейм может состоять максимум из 15 символов',
						},
					})}
					id='nickname'
					onBlur={() => setFocusName(false)}
					onFocus={() => setFocusName(true)}
					placeholder='Никнейм'
					className='w-full placeholder:text-white outline-0'
					type='text'
				/>
			</div>
			<div
				className={`${
					focusEmail ? 'border-links-and-borders' : 'border-[#3F424D]'
				} flex bg-main-background px-4 py-3 rounded-2xl mb-3 border-1`}
			>
				<label htmlFor='email' className='pr-2'>
					<img className='w-6' src={EmailIcon} alt='lock-icon' />
				</label>
				<input
					{...register('email', {
						required: 'Введите почту',
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message:
								'Почта должно соответствовать паттерну. Например example@gmail.com',
						},
					})}
					id='email'
					onBlur={() => setFocusEmail(false)}
					onFocus={() => setFocusEmail(true)}
					placeholder='Email'
					className='w-full placeholder:text-white outline-0'
					type='text'
				/>
			</div>
			<div
				className={`${
					focusPassword ? 'border-links-and-borders' : 'border-[#3F424D]'
				} flex bg-main-background px-4 py-3 rounded-2xl mb-3 border-1`}
			>
				<label htmlFor='password' className='pr-2'>
					<img className='w-6' src={PasswordIcon} alt='lock-icon' />
				</label>
				<input
					{...register('password', {
						required: 'Введите пароль',
						minLength: {
							value: 5,
							message: 'Пароль должен состоять минимум из 5 символов',
						},
					})}
					onBlur={() => setFocusPassword(false)}
					onFocus={() => setFocusPassword(true)}
					placeholder='Пароль'
					id='password'
					className='w-full placeholder:text-white outline-0'
					type='password'
				/>
			</div>

			<button className='w-full text-center bg-main-buttons py-2.5 rounded-2xl'>
				Зарегистрироваться
			</button>

			{errorSubmit && (
				<div className='bg-red-500 p-4 mt-8 rounded-2xl max-w-[360px]'>
					Никнейм или почта уже используются. Введите другие данные
				</div>
			)}

			{Object.keys(errors).length !== 0 && (
				<div className='bg-red-500 p-4 mt-8 rounded-2xl max-w-[360px]'>
					<div>{errors.nickname?.message}</div>
					<div>{errors.email?.message}</div>
					<div>{errors.password?.message}</div>
				</div>
			)}
		</form>
	)
}

export default RegisterForm
