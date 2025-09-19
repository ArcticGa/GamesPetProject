const Description = ({ description }: { description: string | undefined }) => {
	return (
		<div className='max-w-[900px] border-b-2 border-links-and-borders bg-main-background rounded-t-xl p-4'>
			<div className='text-lg font-bold mb-2'>Описание игры</div>
			<div className='text-gray-400 max-h-[300px] overflow-auto no-scrollbar'>
				{description}
			</div>
		</div>
	)
}

export default Description
