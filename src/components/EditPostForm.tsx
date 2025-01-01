import React, { ChangeEvent, FC } from 'react'
import { Product } from '../models/Product'

interface EditPostFormProps {
	Modal: boolean
	OnClickCloseModal: () => void
	data: Product
	ApdatePost: (NewPost: Product) => void
	HandleToogleEdit: () => void
}

const initialState = {
	title: '',
	description: '', // Заменим info на description
}

export const EditPostForm: FC<EditPostFormProps> = ({
	HandleToogleEdit,
	OnClickCloseModal,
	ApdatePost,
	Modal,
	data,
}) => {
	// Инициализация состояния из props
	const [editPost, setEditPost] = React.useState<Product>({
		...initialState,
		...data, // Заполнение начальных значений данными из props
	})

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()

		const { title, description } = editPost

		// Проверка, что оба поля заполнены
		if (title && description) {
			ApdatePost(editPost) // Обновление данных
			HandleToogleEdit() // Закрытие редактора
		}
	}

	const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setEditPost({
			...editPost,
			[name]: value, // Обновление поля в editPost
		})
	}

	return (
		<form
			style={{ display: `${Modal ? 'flex' : 'none'}` }}
			className='edit-form'
			onSubmit={handleSubmit}
		>
			<input
				value={editPost.title}
				onChange={HandleChange}
				placeholder='Заголовок'
				name='title'
			/>
			<input
				value={editPost.description} // Используем description вместо info
				onChange={HandleChange}
				placeholder='Описание'
				name='description' // Имя поля теперь description
			/>
			<button onClick={OnClickCloseModal}>x</button>
			<button>Подтвердить</button>
		</form>
	)
}
