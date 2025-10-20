import ContentLoader from 'react-content-loader'

const SkeletonFullGame = () => {
	return (
		<ContentLoader
			speed={2}
			width={1540}
			height={1750}
			viewBox='0 0 1540 1750'
			backgroundColor='#2d2e35'
			foregroundColor='#1c1d22'
		>
			<rect x='0' y='0' rx='10' ry='10' width='1540' height='500' />
			<rect x='50' y='550' rx='10' ry='10' width='200' height='30' />
			<rect x='50' y='600' rx='10' ry='10' width='600' height='400' />
			<rect x='950' y='550' rx='10' ry='10' width='200' height='30' />
			<rect x='950' y='600' rx='10' ry='10' width='500' height='300' />
			<rect x='950' y='910' rx='10' ry='10' width='160' height='100' />
			<rect x='1120' y='910' rx='10' ry='10' width='160' height='100' />
			<rect x='1290' y='910' rx='10' ry='10' width='160' height='100' />
			<rect x='50' y='1080' rx='10' ry='10' width='200' height='30' />
			<rect x='50' y='1130' rx='10' ry='10' width='480' height='280' />
			<rect x='550' y='1130' rx='10' ry='10' width='430' height='280' />
			<rect x='1000' y='1130' rx='10' ry='10' width='450' height='280' />
			<rect x='50' y='1460' rx='10' ry='10' width='200' height='30' />
			<rect x='50' y='1510' rx='10' ry='10' width='350' height='200' />
			<rect x='420' y='1510' rx='10' ry='10' width='350' height='200' />
			<rect x='790' y='1510' rx='10' ry='10' width='350' height='200' />
			<rect x='1160' y='1510' rx='10' ry='10' width='350' height='200' />
		</ContentLoader>
	)
}

export default SkeletonFullGame
