import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import PasswordIcon from '../../../assets/icons/lock.svg'
import UserIcon from '../../../assets/icons/user.svg'
import { fetchAuth } from '../../../redux/slices/auth'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { IUser } from '../../../types/types'

type Inputs = {
	nickname: string
	password: string
}

const LoginForm = () => {
	const [focusName, setFocusName] = useState(false)
	const [focusPassword, setFocusPassword] = useState(false)
	const [errorSubmit, setErrorSubmit] = useState(false)

	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			nickname: '',
			password: '',
		},
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<Inputs> = async values => {
		const data = await dispatch(fetchAuth(values))

		if (!data.payload) {
			setErrorSubmit(true)
			return
		}

		setErrorSubmit(false)
		localStorage.setItem('token', (data.payload as IUser).token)
	}

	useEffect(() => {
		if (userData) {
			navigate('/')
		}
	}, [userData, navigate])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mx-10'>
			<div>
				<div
					className={`flex ${
						focusName ? ' border-links-and-borders' : 'border-[#3F424D]'
					} bg-main-background px-4 py-3 rounded-2xl mb-3 border-1`}
				>
					<label htmlFor='nickname' className='pr-2'>
						<img src={UserIcon} alt='user-icon' />
					</label>
					<input
						id='nickname'
						{...register('nickname', { required: 'Укажите никнейм' })}
						onBlur={() => setFocusName(false)}
						onFocus={() => setFocusName(true)}
						placeholder='Никнейм'
						className='w-full placeholder:text-white outline-0'
						type='text'
					/>
				</div>
			</div>
			<div>
				<div
					className={`${
						focusPassword ? 'border-links-and-borders' : 'border-[#3F424D]'
					} flex bg-main-background px-4 py-3 rounded-2xl mb-8 border-1`}
				>
					<label htmlFor='password' className='pr-2'>
						<img className='w-6' src={PasswordIcon} alt='lock-icon' />
					</label>
					<input
						{...register('password', { required: 'Укажите пароль' })}
						onBlur={() => setFocusPassword(false)}
						onFocus={() => setFocusPassword(true)}
						placeholder='Пароль'
						id='password'
						className='w-full placeholder:text-white outline-0'
						type='password'
					/>
				</div>
			</div>

			<button
				type='submit'
				className='w-full text-center bg-main-buttons py-2.5 rounded-2xl'
			>
				Войти
			</button>

			{errorSubmit && (
				<div className='bg-red-500 p-4 mt-8 rounded-2xl'>
					Неверный логин или пароль
				</div>
			)}

			{Object.keys(errors).length !== 0 && (
				<div className='bg-red-500 p-4 mt-8 rounded-2xl'>
					<div>{errors.nickname?.message}</div>
					<div>{errors.password?.message}</div>
				</div>
			)}
		</form>
	)
}

export default LoginForm
