import { SubmitHandler, useForm } from 'react-hook-form'
import { fetchPostDevMsg } from '../api/fetchData'
import { useAppSelector } from '../redux/store'

type FormInputs = {
	text: string
}

const ForDeveloper = () => {
	const { userData } = useAppSelector(state => state.authSlice)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>({
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<FormInputs> = values => {
		if (values.text.length < 1) {
			return
		}

		fetchPostDevMsg(values)
		reset()
	}

	return userData ? (
		<div className='w-full h-[920px] flex items-center justify-center'>
			<div className='max-w-[550px]'>
				<div className='bg-main-blocks p-2 mb-3 text-center font-bold rounded-2xl'>
					<div className='mb-4'>
						Привет, на связи разработчик. На этой странице вы можете написать
						что-нибудь мне, например пожелания, замечания, просьбы, баги и т.д.
					</div>
					<div className='border-2 border-youtube-link py-1 rounded-2xl text-gray-500'>
						Бессмысленные сообщения, спам и подобное не отправлять. Спасибо за
						понимание.
					</div>
				</div>

				{errors.text && (
					<div className='bg-youtube-link p-2 rounded-lg mb-3'>
						{errors.text.message}
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					<textarea
						{...register('text', {
							minLength: {
								value: 20,
								message: 'Минимальное количество символов: 20',
							},
							maxLength: {
								value: 1500,
								message: 'Максимальное количество символов: 1500',
							},
						})}
						placeholder='Сообщение...'
						className={`${
							errors.text ? 'border-youtube-link' : 'border-links-and-borders'
						} w-full h-[200px] border-1  rounded-lg p-4 resize-none outline-none scrollbar text-sm`}
					></textarea>
					<button className='text-center w-full mt-1 bg-links-and-borders py-2 rounded-lg cursor-pointer'>
						Отправить сообщение
					</button>
				</form>
			</div>
		</div>
	) : (
		<div>Сначала авторизуйтесь</div>
	)
}

export default ForDeveloper
