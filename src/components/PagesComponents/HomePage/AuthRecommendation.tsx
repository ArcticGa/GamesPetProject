import { Link } from 'react-router'

const AuthRecommendation = () => {
	return (
		<div className='flex flex-col items-center justify-center mb-10'>
			<Link
				to={'/auth'}
				className='max-w-[600px] text-center bg-main-blocks py-6 rounded-2xl border-1 border-main-background hover:border-links-and-borders transition-all delay-20'
			>
				<div className='mb-4'>
					Если вы еще не зарегистрированы, советую это сделать. Вы сможете
					добавлять игры в список Избранных, писать обзоры, а так же читать и
					оценивать чужие. Или написать лично разработчику о ваших пожеланиях
					(хороших или плохих)
				</div>
				<span className='text-links-and-borders border-b-1 text-xl '>
					Зарегистрироваться
				</span>
			</Link>
		</div>
	)
}

export default AuthRecommendation
