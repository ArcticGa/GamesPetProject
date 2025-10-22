import NotFoundGif from '../assets/GameImages/notfoundimg.gif'

const NotFound = () => {
	return (
		<div className='w-full h-[92vh] flex items-center justify-center'>
			<div className='flex flex-col items-center'>
				<div className='text-3xl font-bold text-center'>
					Страница не найдена
				</div>
				<img src={NotFoundGif} alt='gif' />
			</div>
		</div>
	)
}

export default NotFound
