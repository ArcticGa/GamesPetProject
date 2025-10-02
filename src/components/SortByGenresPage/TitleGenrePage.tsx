const TitleGenrePage = ({ category }: { category: string }) => {
	return (
		<div className='text-lg mb-6'>
			Подборка игр жанра:
			<span className='text-xl font-bold text-links-and-borders uppercase ml-3'>
				{category}
			</span>
		</div>
	)
}

export default TitleGenrePage
