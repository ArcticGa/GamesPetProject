import { ChangeEvent, useRef, useState } from 'react'
import { fetchImage } from '../../../../api/fetchData'
import PenIcon from '../../../../assets/icons/penIcon.svg'
import { useAppDispatch } from '../../../../redux/store'
import { IUser } from '../../../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

type AvatarProps = {
	isOwn: boolean
	userData: IUser
}

const Avatar = ({ isOwn, userData }: AvatarProps) => {
	const dispatch = useAppDispatch()
	const inputFileRef = useRef(document.createElement('input'))

	const [showImgUpload, setShowImgUpload] = useState(false)

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files && files.length > 0) {
			fetchImage(files, dispatch)
		}
	}

	return isOwn ? (
		<div className='max-2xl:mb-4'>
			<div
				onClick={() => inputFileRef.current.click()}
				onMouseEnter={() => setShowImgUpload(true)}
				onMouseLeave={() => setShowImgUpload(false)}
				className='relative cursor-pointer'
			>
				<img
					className='z-10 w-40 h-40 rounded-full'
					src={`${BASE_BACKEND_URL}${userData.avatarUrl}`}
					alt='userAvatar'
				/>

				<div className='absolute bottom-0 right-0'>
					<img src={PenIcon} alt='pen-icon' />
				</div>

				{showImgUpload && (
					<div className='flex items-center justify-center absolute top-0 left-0 bg-gray-500 w-full h-full rounded-full z-10 opacity-70'>
						<div className='w-2/3 text-center'>Выбрать аватар</div>
					</div>
				)}
			</div>

			<input
				ref={inputFileRef}
				onChange={handleChangeFile}
				type='file'
				accept='.jpg, .jpeg, .png'
				hidden
			/>
		</div>
	) : (
		<img
			className='z-5 w-40 h-40 rounded-full max-2xl:mb-4'
			src={`${BASE_BACKEND_URL}${userData.avatarUrl}`}
			alt='userAvatar'
		/>
	)
}

export default Avatar
