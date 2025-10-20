import ContentLoader from 'react-content-loader'

const SkeletonYearPage = () => {
	return (
		<ContentLoader
			speed={2}
			width={1061}
			height={390}
			viewBox='0 0 1061 390'
			backgroundColor='#2d2e35'
			foregroundColor='#1c1d22'
		>
			<rect x='0' y='0' rx='10' ry='10' width='1061' height='366' />
		</ContentLoader>
	)
}

export default SkeletonYearPage
