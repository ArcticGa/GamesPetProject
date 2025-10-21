const Footer = () => {
	return (
		<div className='bg-main-blocks rounded-2xl'>
			<div className='flex items-center justify-center mt-8 w-full bg-main-blocks rounded-2xl pt-4'>
				<div className='flex max-lg:flex-col'>
					<div className='mx-20 mb-6'>
						<div>Разработчик</div>
						<a
							className='text-blue-600 border-b-1'
							href='https://github.com/ArcticGa'
							target='_blank'
						>
							GitHub/ArcticGa
						</a>
					</div>
					<div className='mx-20 mb-6'>
						<div>Проект</div>
						<a
							className='text-blue-600 border-b-1'
							href='https://github.com/ArcticGa/GamesPetProject'
							target='_blank'
						>
							GitHub/GamesWorld
						</a>
					</div>
					<div className='mx-20 mb-6'>
						<div>Спасибо за помощь:</div>
						<a
							className='text-blue-600 border-b-1'
							href='https://www.freetogame.com/'
							target='_blank'
						>
							FreeToGame
						</a>
					</div>
				</div>
			</div>
			<div className='text-center text-gray-600 mt-6'>© 2025 GamesWorld</div>
		</div>
	)
}

export default Footer
