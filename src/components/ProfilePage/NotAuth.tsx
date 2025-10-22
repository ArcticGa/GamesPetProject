import { Link } from 'react-router'
import Gif from '../../assets/GameImages/notfoundimg.gif'

const NotAuth = () => {
	return (
		<div className='flex flex-col justify-center items-center h-[92vh] '>
			<div className='text-2xl'>Вы не авторизованы</div>
			<Link
				to={'/auth'}
				className='text-lg text-links-and-borders border-b-1 mt-4'
			>
				Войти в аккаунт
			</Link>
			<img src={Gif} alt='gif' />
		</div>
	)
}

export default NotAuth
