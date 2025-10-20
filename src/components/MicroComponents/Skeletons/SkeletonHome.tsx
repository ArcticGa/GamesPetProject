import ContentLoader from 'react-content-loader'

const SkeletonHome = () => {
	return (
		<div className='flex flex-col mt-8'>
			<ContentLoader
				speed={2}
				width={1541}
				height={280}
				viewBox='0 0 1541 280'
				backgroundColor='#2d2e35'
				foregroundColor='#1c1d22'
			>
				<rect x='100' y='0' rx='10' ry='10' width='1381' height='189' />
				<circle cx='770' cy='205' r='6' />
				<circle cx='790' cy='205' r='6' />
				<circle cx='810' cy='205' r='6' />
			</ContentLoader>

			{[...new Array(3)].map((_, index) => (
				<ContentLoader
					key={index}
					speed={2}
					width={1541}
					height={250}
					viewBox='0 0 1541 229'
					backgroundColor='#2d2e35'
					foregroundColor='#1c1d22'
				>
					<rect x='100' y='0' rx='10' ry='10' width='250' height='30' />
					{[...new Array(5)].map((_, index) => (
						<rect
							key={index}
							x={100 + index * 280}
							y='45'
							rx='10'
							ry='10'
							width='268'
							height='140'
						/>
					))}
				</ContentLoader>
			))}

			<ContentLoader
				speed={2}
				width={1541}
				height={300}
				viewBox='0 0 1541 300'
				backgroundColor='#2d2e35'
				foregroundColor='#1c1d22'
			>
				<rect x='100' y='0' rx='10' ry='10' width='450' height='300' />
				<rect x='570' y='0' rx='10' ry='10' width='450' height='300' />
				<rect x='1040' y='0' rx='10' ry='10' width='450' height='300' />
			</ContentLoader>
		</div>
	)
}

export default SkeletonHome
