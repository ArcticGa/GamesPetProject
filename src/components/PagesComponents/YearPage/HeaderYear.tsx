import AniGif from '../../../assets/GameImages/notfoundimg.gif'

const HeaderYear = () => {
	return (
		<div className='relative bg-main-blocks rounded-2xl py-4 px-2 mb-10 text-center max-w-[1050px] w-full max-md:text-sm max-md:p-1.5'>
			<div>
				<div>Данная страница является Информационной.</div>
				<div>Игры приведенные ниже НЕ ИМЕЮТ отдельных страниц на сайте.</div>
				<div>(Игры ведут на отдельную страницу в Steam)</div>
			</div>
			<img
				className='w-25 absolute top-0 right-10 max-2xl:hidden'
				src={AniGif}
				alt='gif'
			/>
		</div>
	)
}

export default HeaderYear
