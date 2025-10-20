import ContentLoader from 'react-content-loader'

type SkeletonProps = {
	width: number
	height: number
}

const SkeletonGame = ({ width, height }: SkeletonProps) => {
	return (
		<ContentLoader
			speed={2}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			backgroundColor='#2d2e35'
			foregroundColor='#1c1d22'
		>
			<rect
				x='0'
				y='0'
				rx='10'
				ry='10'
				width={width}
				height={`${height - 50}`}
			/>
			<rect x='0' y='210' rx='10' ry='10' width={width} height='30' />
		</ContentLoader>
	)
}

export default SkeletonGame
