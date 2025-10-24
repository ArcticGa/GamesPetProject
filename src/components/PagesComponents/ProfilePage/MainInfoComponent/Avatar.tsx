import { ChangeEvent, useRef, useState } from 'react'
import { fetchImage } from '../../../../api/fetchData'
import LoadingDots from '../../../../assets/GameImages/loading-dots.gif'
import PenIcon from '../../../../assets/icons/penIcon.svg'
import { useAppDispatch } from '../../../../redux/store'
import { IUser } from '../../../../types/types'

type AvatarProps = {
	isOwn: boolean
	userData: IUser
}

const Avatar = ({ isOwn, userData }: AvatarProps) => {
	const dispatch = useAppDispatch()
	const inputFileRef = useRef(document.createElement('input'))

	const [showImgUpload, setShowImgUpload] = useState(false)
	const [loadingAvatar, setLoadingAvatar] = useState(false)

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		setLoadingAvatar(true)
		const files = event.target.files
		if (files && files.length > 0) {
			await fetchImage(files, dispatch)
		}
		setLoadingAvatar(false)
	}

	return isOwn ? (
		<div className='max-2xl:mb-4'>
			<div
				onClick={() => inputFileRef.current.click()}
				onMouseEnter={() => setShowImgUpload(true)}
				onMouseLeave={() => setShowImgUpload(false)}
				className={`relative ${!loadingAvatar && 'cursor-pointer'}`}
			>
				<img
					className='z-10 w-40 h-40 rounded-full'
					src={userData.avatarUrl}
					alt='userAvatar'
				/>

				<div className='absolute bottom-0 right-0'>
					<img src={PenIcon} alt='pen-icon' />
				</div>

				{showImgUpload && !loadingAvatar && (
					<div className='flex items-center justify-center absolute top-0 left-0 bg-gray-500 w-full h-full rounded-full z-10 opacity-70'>
						<div className='w-2/3 text-center'>Выбрать аватар</div>
					</div>
				)}
				{loadingAvatar && (
					<div className='absolute top-0 left-0 w-full h-full rounded-full bg-gray-500 opacity-80 flex items-center justify-center'>
						<img
							className='w-16 relative bottom-2'
							src={LoadingDots}
							alt='loading-gif'
						/>
					</div>
				)}
			</div>

			{!loadingAvatar && (
				<input
					ref={inputFileRef}
					onChange={handleChangeFile}
					type='file'
					accept='.jpg, .jpeg, .png'
					hidden
				/>
			)}
		</div>
	) : (
		<img
			className='z-5 w-40 h-40 rounded-full max-2xl:mb-4'
			src={userData.avatarUrl}
			alt='userAvatar'
		/>
	)
}

export default Avatar
