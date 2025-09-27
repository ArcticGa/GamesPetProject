import { useState } from 'react'
import PasswordIcon from '../../../assets/icons/lock.svg'
import EmailIcon from '../../../assets/icons/mail.svg'
import UserIcon from '../../../assets/icons/user.svg'

const RegisterForm = () => {
	const [focusName, setFocusName] = useState(false)
	const [focusEmail, setFocusEmail] = useState(false)
	const [focusPassword, setFocusPassword] = useState(false)
	const [focusPasswordConf, setFocusPasswordConf] = useState(false)

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
					focusEmail ? 'border-links-and-borders' : 'border-[#3F424D]'
				} flex bg-main-background px-4 py-3 rounded-2xl mb-3 border-1`}
			>
				<label htmlFor='email' className='pr-2'>
					<img className='w-6' src={EmailIcon} alt='lock-icon' />
				</label>
				<input
					onBlur={() => setFocusEmail(false)}
					onFocus={() => setFocusEmail(true)}
					placeholder='Email'
					id='email'
					className='w-full placeholder:text-white outline-0'
					type='email'
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
					onBlur={() => setFocusPassword(false)}
					onFocus={() => setFocusPassword(true)}
					placeholder='Пароль'
					id='password'
					className='w-full placeholder:text-white outline-0'
					type='password'
				/>
			</div>
			<div
				className={`${
					focusPasswordConf ? 'border-links-and-borders' : 'border-[#3F424D]'
				} flex bg-main-background px-4 py-3 rounded-2xl mb-8 border-1`}
			>
				<label htmlFor='passwordConf' className='pr-2'>
					<img className='w-6' src={PasswordIcon} alt='lock-icon' />
				</label>
				<input
					onBlur={() => setFocusPasswordConf(false)}
					onFocus={() => setFocusPasswordConf(true)}
					placeholder='Повторите пароль'
					id='passwordConf'
					className='w-full placeholder:text-white outline-0'
					type='password'
				/>
			</div>
			<button className='w-full text-center bg-main-buttons py-2.5 rounded-2xl'>
				Зарегистрироваться
			</button>
		</form>
	)
}

export default RegisterForm
