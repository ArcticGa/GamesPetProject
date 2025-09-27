import { SetStateAction } from 'react'

interface IChangeFormBtnProps {
	form: string
	selectedForm: string
	setSelectedForm: React.Dispatch<SetStateAction<string>>
}

const ChangeFormBtn = ({
	form,
	selectedForm,
	setSelectedForm,
}: IChangeFormBtnProps) => {
	return (
		<div
			onClick={() => setSelectedForm(form)}
			className={` ${
				selectedForm === form
					? 'border-links-and-borders text-white font-bold'
					: 'border-[#D8D8D8] text-[#c6c6c6]'
			} cursor-pointer py-2 px-9 border-b-2  w-[50%] text-center text-base`}
		>
			{form === 'login' && 'Вход'}
			{form === 'register' && 'Регистрация'}
		</div>
	)
}

export default ChangeFormBtn
