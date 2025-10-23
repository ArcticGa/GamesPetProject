const Info = ({ title, info }: { title: string; info: string | undefined }) => {
	return (
		<div className='mb-2.5 text-gray-300'>
			{title}
			<span className='bg-main-background text-white border-1 border-links-and-borders text-sm ml-2 font-bold py-1.5 px-2.5 rounded-md'>
				{info}
			</span>
		</div>
	)
}

export default Info
