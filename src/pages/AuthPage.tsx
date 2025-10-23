import { useState } from 'react'
import ChangeFormBtn from '../components/PagesComponents/AuthPage/ChangeFormBtn'
import LoginForm from '../components/PagesComponents/AuthPage/Forms/LoginForm'
import RegisterForm from '../components/PagesComponents/AuthPage/Forms/RegisterForm'

const AuthPage = () => {
	const [selectedForm, setSelectedForm] = useState('login')

	return (
		<div className='w-full h-[92vh] flex justify-center items-center'>
			<div className='bg-main-blocks rounded-2xl p-8 min-w-[500px] max-sm:min-w-[200px]'>
				<div className='flex justify-between mb-6'>
					<ChangeFormBtn
						form={'login'}
						selectedForm={selectedForm}
						setSelectedForm={setSelectedForm}
					/>

					<ChangeFormBtn
						form={'register'}
						selectedForm={selectedForm}
						setSelectedForm={setSelectedForm}
					/>
				</div>
				<div className='text-center text-sm mb-6'>
					{selectedForm === 'login' && 'через логин и пароль'}
					{selectedForm === 'register' && 'через создание аккаунта на сайте'}
				</div>

				{selectedForm === 'login' ? <LoginForm /> : <RegisterForm />}
			</div>
		</div>
	)
}

export default AuthPage
