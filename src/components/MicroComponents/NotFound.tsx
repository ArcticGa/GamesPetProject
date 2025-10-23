import { Link } from 'react-router'
import NotFoundGif from '../../assets/GameImages/notfoundimg.gif'

const NotFound = ({
	text,
	link,
	linkText,
}: {
	text: string
	link?: string
	linkText?: string
}) => {
	return (
		<div className='flex flex-col items-center justify-center h-[92vh] max-lg:h-auto'>
			<div className='text-2xl font-bold'>{text}</div>
			{link && (
				<Link
					to={link}
					className='text-lg text-links-and-borders border-b-1 mt-4'
				>
					{linkText}
				</Link>
			)}
			<img src={NotFoundGif} alt='notfound-gif' />
		</div>
	)
}

export default NotFound
