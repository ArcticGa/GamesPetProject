import ContentLoader from 'react-content-loader'

const SkeletonProfile = () => {
	return (
		<ContentLoader
			speed={2}
			width={1550}
			height={1000}
			viewBox='0 0 1550 1000'
			backgroundColor='#2d2e35'
			foregroundColor='#1c1d22'
		>
			<rect x='0' y='0' rx='10' ry='10' width='1550' height='200' />
			<rect x='460' y='260' rx='10' ry='10' width='200' height='40' />
			<rect x='680' y='260' rx='10' ry='10' width='200' height='40' />
			<rect x='900' y='260' rx='10' ry='10' width='200' height='40' />
			<rect x='200' y='350' rx='10' ry='10' width='350' height='200' />
			<rect x='600' y='350' rx='10' ry='10' width='350' height='200' />
			<rect x='1000' y='350' rx='10' ry='10' width='350' height='200' />
		</ContentLoader>
	)
}

export default SkeletonProfile
