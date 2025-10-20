import ContentLoader from 'react-content-loader'

const SkeletonReviews = () => {
	return (
		<ContentLoader
			speed={2}
			width={1461}
			height={550}
			viewBox='0 0 1461 550'
			backgroundColor='#2d2e35'
			foregroundColor='#1c1d22'
		>
			<rect x='0' y='0' rx='15' ry='15' width='470' height='260' />
			<rect x='485' y='0' rx='15' ry='15' width='470' height='260' />
			<rect x='970' y='0' rx='15' ry='15' width='470' height='260' />
			<rect x='0' y='275' rx='15' ry='15' width='470' height='260' />
			<rect x='485' y='275' rx='15' ry='15' width='470' height='260' />
			<rect x='970' y='275' rx='15' ry='15' width='470' height='260' />
		</ContentLoader>
	)
}

export default SkeletonReviews
