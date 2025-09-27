import { useState } from 'react'
import PasswordIcon from '../../../assets/icons/lock.svg'
import UserIcon from '../../../assets/icons/user.svg'

const LoginForm = () => {
	const [focusName, setFocusName] = useState(false)
	const [focusPassword, setFocusPassword] = useState(false)

	return (
		<form className='mx-10'>
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
					onBlur={() => setFocusName(false)}
					onFocus={() => setFocusName(true)}
					placeholder='Никнейм'
					className='w-full placeholder:text-white outline-0'
					type='text'
				/>
			</div>
			<div
				className={`${
					focusPassword ? 'border-links-and-borders' : 'border-[#3F424D]'
				} flex bg-main-background px-4 py-3 rounded-2xl mb-8 border-1`}
			>
				<label htmlFor='password' className='pr-2'>
					<img className='w-6' src={PasswordIcon} alt='lock-icon' />
				</label>
				<input
					onBlur={() => setFocusPassword(false)}
					onFocus={() => setFocusPassword(true)}
					placeholder='Пароль'
					id='password'
					className='w-full placeholder:text-white outline-0'
					type='text'
				/>
			</div>
			<button className='w-full text-center bg-main-buttons py-2.5 rounded-2xl'>
				Войти
			</button>
		</form>
	)
}

export default LoginForm
